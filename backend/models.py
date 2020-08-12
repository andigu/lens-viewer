from sqlalchemy import inspect

from app import db

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs}

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Text, unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.user_id


class Batch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    upload_time = db.Column(db.DateTime, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    owner = db.relationship('User', backref=db.backref('batches', lazy=True))
    n_cands = db.Column(db.Integer, nullable=False)


class Candidate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ra = db.Column(db.Float, nullable=False)
    dec = db.Column(db.Float, nullable=False)
    additional = db.Column(db.Text, nullable=True)
    batch_id = db.Column(db.Integer, db.ForeignKey('batch.id'), nullable=False)
    batch = db.relationship('Batch', backref=db.backref('candidates', lazy=True))
    order = db.Column(db.Integer, nullable=False)
    grade = db.Column(db.Integer, nullable=True)
    graded_time = db.Column(db.DateTime, nullable=True)
    comment = db.Column(db.Text, nullable=True)
