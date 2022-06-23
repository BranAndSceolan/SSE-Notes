#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" << EOSQL
CREATE USER notes PASSWORD '$NOTES_PASSWORD';
CREATE table users(
    id integer PRIMARY KEY ,
    name varchar not null ,
    password varchar
);

CREATE table notes(
    id integer PRIMARY KEY,
    title varchar not null,
    content varchar not null,
    private boolean not null ,
    authorID integer not null references users(id)
);

GRANT INSERT ON users TO notes;
GRANT UPDATE ON users TO notes;
GRANT DELETE ON users TO notes;
GRANT SELECT ON users TO notes;

GRANT INSERT ON notes TO notes;
GRANT UPDATE ON notes TO notes;
GRANT DELETE ON notes TO notes;
GRANT SELECT ON notes TO notes;

EOSQL