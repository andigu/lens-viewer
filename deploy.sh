rm -rf backend/build
cd frontend
npm run build
mv build ../backend/build
cd ../backend
source .venv/bin/activate
pip freeze > requirements.txt
cd ../
#git subtree push --prefix backend heroku master