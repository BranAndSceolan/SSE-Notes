#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" << EOSQL
CREATE USER notes PASSWORD '$NOTES_PASSWORD';

CREATE table users(
    id bigserial PRIMARY KEY ,
    name varchar not null ,
    password varchar not null
);

CREATE table notes(
    id bigserial PRIMARY KEY,
    title varchar not null,
    content varchar not null,
    private boolean not null ,
    authorID integer not null references users(id) ON DELETE CASCADE
);

GRANT USAGE ON SEQUENCE users_id_seq TO notes;
GRANT USAGE ON SEQUENCE notes_id_seq TO notes;

GRANT INSERT ON users TO notes;
GRANT UPDATE ON users TO notes;
GRANT DELETE ON users TO notes;
GRANT SELECT ON users TO notes;

GRANT INSERT ON notes TO notes;
GRANT UPDATE ON notes TO notes;
GRANT DELETE ON notes TO notes;
GRANT SELECT ON notes TO notes;

EOSQL