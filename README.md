# Lens Viewer

## Setup

 > git clone https://github.com/andigu/lens-viewer.git
 > cd lens-viewer/frontend
 > npm install
 If prompted, > npm aduit fix
 > npm start
 > cd .. 
 > cd backend
 > conda install -c anaconda Flask-Cors==3.0.8
 > conda install -c conda-forge Flask-SQLAlchemy==2.4.4
 > env FLASK_APP=app.py flask run

 For any package issues reference requirements.txt for a list of package versions.

## Getting Started

First, in /frontend/public create a folder named "local" and place all images there, all filenames should correspond to entries in your csv (see below).

In terminal navigate to frontend and run `npm install` then `npm start`, that will lauch http://localhost:3000/. 

Then navigate to backend and run `env FLASK_APP=app.py flask run`. 

Enter any username, but remember it as your files will only be accessible by using the same username.

Simply upload a csv and make sure that it includes at least 'ra', 'dec', and 'filename' columns. 

Usage is fairly simple: 1, 2, 3, 4, and 5 for grades, n for next, and b for back.

