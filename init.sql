CREATE TABLE agents (
  ID SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  bio TEXT,
  url VARCHAR(255),
  imgUrl VARCHAR(255),
  agentHeaderId VARCHAR(255),
  website VARCHAR(255)
);

CREATE TABLE services (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(255),
  category VARCHAR(255),
  phone VARCHAR(255)
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO agents (firstName, lastName, email, phone, bio, url, imgUrl, agentHeaderId, website)
VALUES ('Bob', 'Bobson', 'bob@bobson.com', '8015555555', 'Hello I am cool', '/bob_bobson', 'https://www.ohiorealtors.org/upl/img/realtor-rlogo_650.jpg', '1', 'http://google.com');
