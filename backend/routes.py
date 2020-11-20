import json
import os
import uuid
from datetime import datetime
from functools import wraps

import pandas as pd
from flask import request, jsonify, send_from_directory
from sqlalchemy import func
from werkzeug.utils import secure_filename

from app import app, db, ALLOWED_EXTENSIONS
from models import Candidate, Batch, User, object_as_dict


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def batch_statistics(batch_id):
    counts = Candidate.query.with_entities(Candidate.grade, func.count(Candidate.grade)).filter(
        Candidate.batch_id == batch_id, Candidate.grade.isnot(None)).group_by(Candidate.grade).all()
    ret = [0, 0, 0, 0, 0]
    for x in counts:
        try:
            ret[x[0] - 1] = x[1]
        except:
            pass
    return ret


def load_db(csv_path, now, u_id, batch_name):
    df = pd.read_csv(csv_path)
    additional = df.loc[:, (df.columns != 'ra') & (df.columns != 'dec')].to_json(orient='records')
    additional = [json.dumps(x) for x in json.loads(additional)]
    df['additional'] = additional
    columns = ['ra', 'dec', 'additional', 'filename']
    df['filename'] = [f"local/{name}.jpeg" for name in df["name"]]
    df = df[columns]
    if 'grade' not in df: df['grade'] = None
    if 'comment' not in df: df['comment'] = ''
    batch = Batch(owner_id=u_id, name=batch_name, upload_time=now, n_cands=len(df))
    db.session.add(batch)
    db.session.commit()
    df['batch_id'] = batch.id
    df = df.reset_index(drop=True)
    df['order'] = df.index
    df.to_sql('candidate', con=db.engine, if_exists='append', index=False)


def login_required(function):
    @wraps(function)
    def wrapper():
        user_id = request.cookies['userId']
        user_obj = User.query.filter(User.user_id == user_id).one_or_none()
        if user_obj:
            return function(user_obj)
        else:
            resp = jsonify({"error": "Must be logged in", "success": False})
            resp.delete_cookie('userId')
            return resp

    return wrapper


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route("/candidates", methods=['GET', 'POST'])
@login_required
def candidates(_):
    if request.method == 'GET':
        start, stop = request.args['start'], request.args['stop']
        batch_id = request.args['batch_id']
        data = Candidate.query.filter(Candidate.batch_id == batch_id, start <= Candidate.order,
                                      Candidate.order <= stop).all()
        data = [{**object_as_dict(x),
                 'filename': x.filename,
                 'skyviewer': f'https://www.legacysurvey.org/viewer/jpeg-cutout?ra={x.ra}&dec={x.dec}&width=101&height=101&layer=dr8',
                 } for x in data]
        return jsonify({"success": True, "candidates": data})
    else:
        data = request.get_json()
        cand_id = int(data['id'])
        values = {}
        if 'grade' in data:
            values['grade'] = int(data['grade'])
            values['graded_time'] = datetime.now()
        if 'comment' in data:
            values['comment'] = data['comment']
        Candidate.query.filter(Candidate.id == cand_id).update(values)
        db.session.commit()
        cand = Candidate.query.filter(Candidate.id == cand_id).one()
        return jsonify({"success": True, "counts": batch_statistics(cand.batch_id)})


@app.route("/cursor", methods=['GET'])
@login_required
def cursor(_):
    batch_id = request.args['batch_id']
    data = Candidate.query.filter(Candidate.batch_id == batch_id, Candidate.grade.is_(None)).order_by(
        Candidate.order).first()
    return jsonify({"success": True, "cursor": data.order if data else 0})


@app.route("/batch_stats", methods=['GET'])
@login_required
def batch_stats(_):
    return jsonify({'success': True, 'counts': batch_statistics(request.args['batch_id'])})


@app.route("/upload-batches", methods=['POST'])
@login_required
def upload(user):
    success = False
    now = datetime.now()
    for key, file in request.files.items():
        if allowed_file(file.filename):
            path = os.path.join(app.config['UPLOAD_FOLDER'], str(uuid.uuid4()) + '-' + secure_filename(file.filename))
            try:
                file.save(path)
                load_db(path, now, user.id, key.replace(".csv", ""))
                success = True
            finally:
                os.remove(path)
    return jsonify({"success": success})


@app.route("/batches", methods=['GET'])
@login_required
def get_batches(user):
    res = [object_as_dict(x) for x in Batch.query.filter(Batch.owner_id == user.id).all()]
    return jsonify({'batches': res})


@app.route("/mark", methods=['POST', 'DELETE'])
@login_required
def mark(_):
    json = request.get_json()
    cand_id = json['id']
    cand = Candidate.query.filter(Candidate.id == cand_id).one()
    if request.method == 'POST':
        tp, coord = json['type'], tuple(json['coordinate'])
        if tp == 'source':
            cand.source = [*cand.source, coord]
        else:
            cand.lens = coord
    else:
        cand.lens = []
        cand.source = tuple()
    db.session.commit()
    return jsonify({"success": True, "candidate": object_as_dict(cand)})


@app.route("/login", methods=['POST'])
def login():
    json = request.get_json()
    user_id = json['user_id']
    matching = User.query.filter(User.user_id == user_id).one_or_none()
    if not matching:
        user = User(user_id=user_id)
        db.session.add(user)
        db.session.commit()
    resp = jsonify({"success": True})
    resp.set_cookie('userId', user_id)
    return resp


@app.route("/logout", methods=['POST'])
def logout():
    resp = jsonify({"success": True})
    resp.delete_cookie('userId')
    return resp


@app.route("/export_batch")
@login_required
def get_file(_):
    batch_id = request.args['batch_id']
    fname = f'export-{batch_id}-{uuid.uuid4()}.csv'
    df = pd.read_sql_query(Candidate.query.filter(Candidate.batch_id == batch_id).statement, con=db.engine,
                           parse_dates=['graded_time'])
    df["lens"] = ""
    df["source"] = ""
    for i, row in df.iterrows():
        try: df.at[i, "lens"] = list(Candidate.convert_pixel_ra_dec(eval(row["_lens"]), row["ra"], row["dec"]))
        except: pass
        try: df.at[i, "source"] = [Candidate.convert_pixel_ra_dec(src, row["ra"], row["dec"]) for src in eval(row["_source"])]
        except: pass
    df = df.drop(columns=["_lens", "_source"])
    df.to_csv(os.path.join(app.config['UPLOAD_FOLDER'], fname))
    return send_from_directory(app.config["UPLOAD_FOLDER"], fname, as_attachment=True)
