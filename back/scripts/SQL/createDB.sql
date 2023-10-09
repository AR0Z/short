CREATE TABLE link (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    url varchar,
    short varchar UNIQUE
);