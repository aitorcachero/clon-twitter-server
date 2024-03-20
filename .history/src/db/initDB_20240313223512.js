// DROP DATABASE IF EXISTS twitter_db;

// CREATE DATABASE twitter_db;

// USE twitter_db;

// CREATE TABLE users (
// 	id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(50) NOT NULL UNIQUE,
//     password VARCHAR(150) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE,
//     name VARCHAR(100) NOT NULL,
//     surname VARCHAR(150) NOT NULL,
//     createdAt TIMESTAMP NOT NULL DEFAULT (NOW())
// );

// CREATE TABLE tweets(
// 	tweet_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     tweet_text VARCHAR(280) NOT NULL,
//     likes INT DEFAULT 0,
//     retweets INT DEFAULT 0,
//     comments INT DEFAULT 0,
//     createdAt TIMESTAMP NOT NULL DEFAULT (NOW()),
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );

// CREATE TABLE followers (
// 	follower_id INT NOT NULL,
//     followed_id INT NOT NULL,
//     FOREIGN KEY(follower_id) REFERENCES users(id),
//     PRIMARY KEY(follower_id, followed_id)
// );
