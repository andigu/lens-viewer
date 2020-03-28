# Lens Viewer

## Setup (dev)

Dependencies:
* npm
* Python3 + Flask
* pip packages: numpy, pandas, flask_cors

Run `npm install` and `npm start` in the frontend/ directory. In a separate shell run `env FLASK_APP=main.py flask run` in the backend/ directory.

## Getting Started
The backend looks for a file called `job1.csv` (this is configurable, WIP). This needs to be in the backend/ folder.

Usage is fairly simple: 1, 2, 3, 4 for a grade, and b for back. Every 250 images or so, there seems to be some sort of caching problem, refreshing the page should resolve the issue.
