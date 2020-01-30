CREATE TABLE IF NOT EXISTS users(
  UserId SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT
);

CREATE TABLE IF NOT EXISTS follow(
  FollowId SERIAL PRIMARY KEY,
  UserId INTEGER,
  FollowerId INTEGER
);

CREATE TABLE IF NOT EXISTS movie(
  MovieId SERIAL PRIMARY KEY,
  title TEXT,
  plot TEXT,
  watched BOOLEAN,
  Recommend BOOLEAN
);