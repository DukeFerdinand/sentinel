-- Your SQL goes here
ALTER TABLE users ADD UNIQUE (email);
ALTER TABLE users ADD UNIQUE (username);