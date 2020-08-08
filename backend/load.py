import pandas as pd
from sqlalchemy import create_engine

response = input("Are you sure? This will wipe your current progress (Y/N): ")
if response == "Y":
    engine = create_engine('sqlite:///candidates.db', echo=False)
    df = pd.read_csv("model28_training_sample_lenses.csv").drop(columns=['level_0', 'index'], errors='ignore').reset_index(drop=True)
    df2 = pd.read_csv("H20b_Candidates_ABC_final.csv").drop(columns=['level_0', 'index'], errors='ignore').reset_index(drop=True)
    df = pd.concat([df, df2]).reset_index(drop=True)
    if 'grade' not in df: df['grade'] = None
    if 'graded_time' not in df: df['graded_time'] = 0
    if 'comment' not in df: df['comment'] = ''
    if 'url' not in df: df['url'] = 'http://legacysurvey.org/viewer/jpeg-cutout?ra=' + df.ra.astype(str) + '&dec=' + df.dec.astype(str) + '&width=101&height=101&layer=dr8'
    df.to_sql('candidates', con=engine, if_exists='replace', index=True, index_label='id')
    engine.execute('create unique index candidates_id_uindex on candidates (id)')
    print("Your database was created successfully.")
else:
    print("Your database was not created.")
