# MySQL commands for reference
## Setting up your mysql database

CREATE DATABASE petbook;

USE petbook;

CREATE TABLE owners(
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(45) NOT NULL, 
	password CHAR(60) NOT NULL, 
	name VARCHAR(45) NOT NULL, 
	location VARCHAR(100), 
	PRIMARY KEY (id)
);

CREATE TABLE pets(
	id INT NOT NULL AUTO_INCREMENT,
    owner_id INT NOT NULL,
	name VARCHAR(45) NOT NULL, 
	weight INT, 
	age INT, 
	species VARCHAR(45), 
	PRIMARY KEY (id), 
	FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

CREATE TABLE clubs(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(45) NOT NULL, 
	size INT NOT NULL, 
	species VARCHAR(45), 
	PRIMARY KEY (id)
);

CREATE TABLE parks(
	id INT NOT NULL AUTO_INCREMENT, 
	name VARCHAR(45) NOT NULL, 
	location VARCHAR(100) NOT NULL, 
	hours VARCHAR(45), 
	PRIMARY KEY (id)
);

CREATE TABLE treats(
	id INT NOT NULL AUTO_INCREMENT,
	manufacturer VARCHAR(45) NOT NULL, 
	name VARCHAR(45) NOT NULL, 
	species VARCHAR(45), 
	PRIMARY KEY (id)
);

CREATE USER IF NOT EXISTS 'petbook'@'%' IDENTIFIED WITH mysql_native_password BY 'petbook!Node.js';
GRANT ALL PRIVILEGES ON petbook.* TO 'petbook'@'%';
FLUSH PRIVILEGES;
