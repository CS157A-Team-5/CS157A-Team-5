# MySQL commands for reference
## Setting up your mysql database

DROP DATABASE IF EXISTS petbook;

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
	species VARCHAR(45),
	size INT NOT NULL,
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

CREATE TABLE pet_pet(
	id INT NOT NULL AUTO_INCREMENT,
	pet1_id INT NOT NULL,
    pet2_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (pet1_id) REFERENCES pets(id),
    FOREIGN KEY (pet2_id) REFERENCES pets(id)
);

CREATE TABLE owner_club(
	id INT NOT NULL AUTO_INCREMENT,
	owner_id INT NOT NULL,
    club_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES owners(id),
    FOREIGN KEY (club_id) REFERENCES clubs(id)
);

CREATE TABLE owner_park(
	id INT NOT NULL AUTO_INCREMENT,
	owner_id INT NOT NULL,
    park_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES owners(id),
    FOREIGN KEY (park_id) REFERENCES parks(id)
);

CREATE TABLE club_park(
	id INT NOT NULL AUTO_INCREMENT,
	club_id INT NOT NULL,
    park_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (club_id) REFERENCES clubs(id),
    FOREIGN KEY (park_id) REFERENCES parks(id)
);

CREATE TABLE park_treat(
	id INT NOT NULL AUTO_INCREMENT,
    park_id INT NOT NULL,
	treat_id INT NOT NULL,
	cost DECIMAL(5,2),
	PRIMARY KEY (id),
    FOREIGN KEY (park_id) REFERENCES parks(id),
    FOREIGN KEY (treat_id) REFERENCES treats(id)
);

CREATE TABLE pet_treat(
	id INT NOT NULL AUTO_INCREMENT,
    pet_id INT NOT NULL,
	treat_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (treat_id) REFERENCES treats(id)
);

CREATE USER IF NOT EXISTS 'petbook'@'%' IDENTIFIED WITH mysql_native_password BY 'petbook!Node.js';
GRANT ALL PRIVILEGES ON petbook.* TO 'petbook'@'%';
FLUSH PRIVILEGES;
