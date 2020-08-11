import os

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'csv'}
app = Flask(__name__, static_folder='./build', static_url_path='/')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

DATABASE_URL = os.environ['DATABASE_URL'] if 'DATABASE_URL' in os.environ else 'sqlite:///app.db'
app.config['DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app, supports_credentials=True)

from app import routes, models
db.create_all()
