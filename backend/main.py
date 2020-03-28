import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['GET', 'POST'])
def main():
    df = pd.read_csv("job1.csv")
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    df = df[df.prob > 0.9]
    if 'grade' not in df:
        df['grade'] = [np.nan for _ in range(len(df))]
    if 'graded_at' not in df:
        df['graded_at'] = [np.nan for _ in range(len(df))]

    res = None
    if request.method == 'GET':
        if 'back' in request.args:
            ra, dec = float(request.args['ra']), float(request.args['dec'])
            matching = np.isclose(df['ra'], ra) & np.isclose(df['dec'], dec)
            graded = df[matching].iloc[0]['graded_at']
            rows = df[df['graded_at'] < graded] if not isinstance(graded, float) else df[pd.notna(df['graded_at'])]
            rows = rows.sort_values(by='graded_at', ascending=False)
        else:
            rows = df[~pd.notna(df['grade'])]
        if len(rows) >= 1:
            n = min(int(request.args['n']), len(rows)) if 'n' in request.args else 10
            res = jsonify({'ras': list(rows.iloc[:n].ra), 'decs': list(rows.iloc[:n].dec), 'done': False})
        else:
            res = jsonify({'ras': [], 'decs': []})

    elif request.method == 'POST':
        json = request.get_json()
        ra, dec, grade = json['ra'], json['dec'], json['grade']
        df.loc[
            np.isclose(df['ra'], ra) & np.isclose(df['dec'], dec), ['grade', 'graded_at']] = grade, pd.Timestamp.now()
        res = jsonify({"success": True})

    if res is not None:
        df.to_csv("job1.csv", index=False)
        return res
