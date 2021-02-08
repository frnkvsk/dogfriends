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
    photo_id uuid DEFAULT null,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    admin boolean DEFAULT false NOT NULL
);

CREATE TABLE posts (
  id uuid DEFAULT uuid_generate_v4 (), 
  title TEXT, 
  body TEXT,
  replies INT,
  votes INT,  
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  photo_id uuid DEFAULT null,  
  PRIMARY KEY (id)
);

CREATE TABLE votes (
  post_id uuid DEFAULT uuid_generate_v4 () REFERENCES posts ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  direction INT,
  PRIMARY KEY (post_id, username)
);

CREATE TABLE replies (
  id uuid DEFAULT uuid_generate_v4 (),
  parent_id uuid DEFAULT uuid_generate_v4 () REFERENCES posts ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  body TEXT,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE photos (
  id uuid DEFAULT uuid_generate_v4 (), 
  url TEXT NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);                  
