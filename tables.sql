CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  version TEXT,
  public_id TEXT,
  UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS follow(
  id SERIAL PRIMARY KEY,
  userid INTEGER,
  followerid INTEGER
);

CREATE TABLE IF NOT EXISTS movie(
  id SERIAL PRIMARY KEY,
  movieid INTEGER,
  title TEXT,
  plot TEXT,
  poster TEXT
);

CREATE TABLE IF NOT EXISTS watchlist(
  id SERIAL PRIMARY KEY,
  movieid INTEGER,
  userid INTEGER,
  completed BOOLEAN DEFAULT false,
  favorite BOOLEAN DEFAULT false
);