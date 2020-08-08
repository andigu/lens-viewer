from datetime import datetime

import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, MetaData, select, and_

app = Flask(__name__)
conn = create_engine('sqlite:///candidates.db', echo=False)
meta = MetaData(bind=conn)
meta.reflect()
cand = meta.tables['candidates']
CORS(app)


@app.route("/", methods=['GET', 'POST'])
def main():
    if request.method == 'GET':
        if 'back' in request.args:
            idx, user = int(request.args['id']), request.args['user']
            query = select([cand]).where(
                and_(cand.c.id < idx, cand.c.graded_by == user)).order_by(cand.c.id.desc())
        else:
            user = request.args['user']
            query = select([cand]).where(and_(cand.c.grade is None, cand.c.graded_by == user))
        n = int(request.args['n']) if 'n' in request.args else 10
        ret = []
        for i, row in enumerate(conn.execute(query)):
            if i >= n:
                break
            else:
                ret.append(dict(row))
        return jsonify(ret)

    elif request.method == 'POST':
        json = request.get_json()
        idx, grade = int(json['id']), int(json['grade'])
        stmt = cand.update().where(cand.c.id == idx).values(grade=grade, graded_time=int(datetime.now().timestamp()))
        conn.execute(stmt)
        return jsonify({"success": True})


@app.route("/to_csv", methods=['GET'])
def to_csv():
    df = pd.read_sql(sql='SELECT * FROM candidates', con=conn)
    df['graded_time'] = pd.to_datetime(df['graded_time'].replace(0, None), unit='s')
    df.to_csv("export.csv")
    return jsonify({"success": True})


@app.route("/users", methods=['GET'])
def get_users():
    return jsonify([x['graded_by'] for x in conn.execute(select([cand.c.graded_by]).distinct())])


@app.route("/comment", methods=['POST'])
def comment():
    json = request.get_json()
    idx, comment = int(json['id']), json['comment']
    stmt = cand.update().where(cand.c.id == idx).values(comment=comment)
    conn.execute(stmt)
    return jsonify({"success": True})
