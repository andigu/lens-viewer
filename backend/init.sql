create table users
(
    id      INTEGER PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE
);

drop table batches;
create table batches
(
    id          INTEGER PRIMARY KEY,
    name        TEXT    NOT NULL,
    upload_time TEXT,
    owner       INTEGER NOT NULL,
    n_cands     INTEGER NOT NULL,
    FOREIGN KEY (owner) REFERENCES users (id)
);

drop table candidates;
create table candidates
(
    id          INTEGER PRIMARY KEY,
    ra          REAL    NOT NULL,
    dec         REAL    NOT NULL,
    additional  TEXT,
    batch_id    INTEGER NOT NULL,
    "order"       INTEGER NOT NULL,
    upload_time TEXT,
    grade       INTEGER,
    graded_time TEXT,
    comment     TEXT,
    url         TEXT    NOT NULL,
    FOREIGN KEY (batch_id) REFERENCES batches (id)
)