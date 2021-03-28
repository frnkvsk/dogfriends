DROP DATABASE IF EXISTS "dogfriends";

CREATE DATABASE "dogfriends";

\c "dogfriends";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT,
    state TEXT,
    country TEXT,
    photo_id TEXT,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    admin boolean DEFAULT false NOT NULL
);

CREATE TABLE posts (
  id uuid DEFAULT uuid_generate_v4 (), 
  title TEXT, 
  body TEXT,
  replies INT DEFAULT 0,
  votes INT DEFAULT 0,  
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  photo_id TEXT,  
  PRIMARY KEY (id)
);

CREATE TABLE votes (
  photo_id TEXT REFERENCES posts ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  direction INT,
  PRIMARY KEY (photo_id, username)
);

CREATE TABLE replies (
  id uuid DEFAULT uuid_generate_v4 (),
  parent_id TEXT REFERENCES posts ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  body TEXT,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE photos (
  id TEXT NOT NULL, 
  url TEXT NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);                  
