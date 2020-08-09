import json
import os
import uuid
from datetime import datetime
from functools import wraps

import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, MetaData, select, and_, func
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'csv'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

conn = create_engine('sqlite:///candidates.db', echo=False)
meta = MetaData(bind=conn)
meta.reflect()
cands, users, batches = meta.tables['candidates'], meta.tables['users'], meta.tables['batches']
CORS(app, supports_credentials=True)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def batch_statistics(batch_id):
    counts = conn.execute(select([cands.c.grade, func.count(cands.c.grade)]).where(
        and_(cands.c.batch_id == batch_id, cands.c.grade.isnot(None))).group_by(
        cands.c.grade)).fetchall()
    return [x['count_1'] for x in counts]


def load_db(csv_path, now, u_id, batch_name):
    df = pd.read_csv(csv_path)
    additional = df.loc[:, (df.columns != 'ra') & (df.columns != 'dec')].to_json(orient='records')
    additional = [json.dumps(x) for x in json.loads(additional)]
    df['additional'] = additional
    df = df[['ra', 'dec', 'additional']].dropna(axis=0)

    if 'grade' not in df: df['grade'] = None
    if 'graded_time' not in df: df['graded_time'] = 0
    if 'comment' not in df: df['comment'] = ''
    if 'url' not in df: df['url'] = 'http://legacysurvey.org/viewer/jpeg-cutout?ra=' + df.ra.astype(
        str) + '&dec=' + df.dec.astype(str) + '&width=101&height=101&layer=dr8'
    batch_id = conn.execute(
        batches.insert().values(owner=u_id, name=batch_name, upload_time=now, n_cands=len(df))).lastrowid
    df['batch_id'] = batch_id
    df = df.reset_index(drop=True)
    df['order'] = df.index
    df.to_sql('candidates', con=conn, if_exists='append', index=False)


def login_required(function):
    @wraps(function)
    def wrapper():
        user_id = request.cookies['userId']
        user_obj = conn.execute(users.select(users.c.user_id == user_id)).fetchone()
        if user_obj:
            return function(user_obj)
        else:
            return jsonify({"error": "Must be logged in", "success": False})

    return wrapper


@app.route("/candidates", methods=['GET', 'POST'])
@login_required
def candidates(_):
    if request.method == 'GET':
        start, stop = request.args['start'], request.args['stop']
        batch_id = request.args['batch_id']
        data = conn.execute(cands.select(
            and_(cands.c.batch_id == batch_id, start <= cands.c.order, cands.c.order <= stop))).fetchall()
        data = [dict(x) for x in data]
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
        conn.execute(cands.update().where(cands.c.id == cand_id).values(values))
        cand = conn.execute(cands.select(cands.c.id == cand_id)).fetchone()
        return jsonify({"success": True, "counts": batch_statistics(cand.batch_id)})


@app.route("/cursor", methods=['GET'])
@login_required
def cursor(_):
    batch_id = request.args['batch_id']
    data = conn.execute(
        cands.select(and_(cands.c.batch_id == batch_id, cands.c.grade.is_(None))).order_by(cands.c.order)).fetchone()
    return jsonify({"success": True, "cursor": data.order})

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
    res = [dict(x) for x in conn.execute(batches.select(batches.c.owner == user.id)).fetchall()]
    return jsonify({'batches': res})


@app.route("/login", methods=['POST'])
def login():
    json = request.get_json()
    user_id = json['user_id']
    matching = conn.execute(users.select(users.c.user_id == user_id)).fetchone()
    if not matching: conn.execute(users.insert().values(user_id=user_id))
    return jsonify({"success": True})
