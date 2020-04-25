import pandas as pd
from sqlalchemy import create_engine

response = input("Are you sure? This will wipe your current progress (Y/N): ")
if response == "Y":
    engine = create_engine('sqlite:///candidates.db', echo=False)
    df = pd.read_csv("candidates.csv")
    df['graded_time'] = 0
    df['comment'] = ''
    df.to_sql('candidates', con=engine, if_exists='replace', index=True, index_label='id')
    engine.execute('create unique index candidates_id_uindex on candidates (id)')