DROP DATABASE IF EXISTS "dogfriends";

CREATE DATABASE "dogfriends";

\c "dogfriends";

CREATE TABLE users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    photo_url TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    is_admin boolean DEFAULT false NOT NULL
);

CREATE TABLE posts (
  id TEXT PRIMARY KEY, 
  title TEXT NOT NULL, 
  description TEXT NOT NULL,
  body TEXT NOT NULL,
  username TEXT NOT NULL,
  photo_id TEXT DEFAULT null
);
                    
CREATE TABLE comments (
  id TEXT PRIMARY KEY, 
  text TEXT NOT NULL, 
  post_id TEXT NOT NULL REFERENCES posts ON DELETE CASCADE,
  photo_id TEXT DEFAULT null
);

CREATE TABLE comment_user (
  comment_id TEXT NOT NULL REFERENCES comments ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  PRIMARY KEY (comment_id, username)
);

CREATE TABLE votes (
  post_id TEXT NOT NULL REFERENCES posts ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  direction INT,
  PRIMARY KEY (post_id, username)
);

CREATE TABLE photos (
  id TEXT PRIMARY KEY, 
  url TEXT NOT NULL
);

CREATE TABLE  photo_user (
  photo_id TEXT NOT NULL REFERENCES photos ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE
);
