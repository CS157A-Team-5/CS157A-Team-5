# MySQL commands for reference
## Setting up your mysql database

CREATE DATABASE petbook;

CREATE TABLE IF NOT EXISTS owners(
	email VARCHAR(45) NOT NULL, 
	password CHAR(60) NOT NULL, 
	name VARCHAR(45) NOT NULL, 
	location VARCHAR(100), 
	PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS pets(
	name VARCHAR(45) NOT NULL, 
	weight INT, 
	age INT, 
	species VARCHAR(45), 
	PRIMARY KEY (name, email), 
	FOREIGN KEY (email) REFERENCES owners
);

CREATE TABLE IF NOT EXISTS groups(
	name VARCHAR(45) NOT NULL, 
	size INT NOT NULL, 
	species VARCHAR(45), 
	PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS parks(
	id INT NOT NULL AUTO_INCREMENT, 
	name VARCHAR(45) NOT NULL, 
	location VARCHAR(100) NOT NULL, 
	hours VARCHAR(45), 
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS treats(
	mfr VARCHAR(45) NOT NULL, 
	name VARCHAR(45) NOT NULL, 
	species VARCHAR(45), 
	PRIMARY KEY (mfr, name)
);

CREATE USER 'petbook'@'%' IDENTIFIED WITH mysql_native_password BY 'petbook!Node.js';
GRANT ALL PRIVILEGES ON petbook.* TO 'petbook'@'%';
FLUSH PRIVILEGES;
