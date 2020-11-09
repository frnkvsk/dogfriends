DROP DATABASE IF EXISTS "dogfriends";

CREATE DATABASE "dogfriends";

\c "dogfriends";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    created_on DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_on DATE NOT NULL DEFAULT CURRENT_DATE,
    admin boolean DEFAULT false NOT NULL
);

CREATE TABLE posts (
  id uuid DEFAULT uuid_generate_v4 (), 
  title TEXT NOT NULL, 
  body TEXT NOT NULL,  
  created_on DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_on DATE NOT NULL DEFAULT CURRENT_DATE,  
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  parent_id uuid DEFAULT null,
  photo_id uuid DEFAULT null,
  PRIMARY KEY (id)
);

CREATE TABLE votes (
  post_id uuid DEFAULT uuid_generate_v4 () REFERENCES posts ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  direction INT,
  PRIMARY KEY (post_id, username)
);

CREATE TABLE photos (
  id uuid DEFAULT uuid_generate_v4 (), 
  url TEXT NOT NULL,
  created_on DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_on DATE NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY (id)
);

CREATE TABLE  user_photo (
  photo_id uuid DEFAULT uuid_generate_v4 () REFERENCES photos ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  PRIMARY KEY (photo_id, username)
);
                    
