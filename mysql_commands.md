# MySQL commands for reference
## Setting up your mysql database

CREATE DATABASE petbook;

CREATE TABLE IF NOT EXISTS `groups`(`name` VARCHAR(45) NOT NULL, `size` INT, `specie` VARCHAR(45), PRIMARY KEY(`name`));

CREATE TABLE IF NOT EXISTS `parks`(`id` INT NOT NULL AUTO_INCREMENT, `location` VARCHAR(100) NOT NULL, `hours` VARCHAR(45), PRIMARY KEY(`id`));

CREATE TABLE IF NOT EXISTS `owners`(`email` VARCHAR(45) NOT NULL, `password` VARCHAR(45) NOT NULL, `name` VARCHAR(45) NOT NULL, `location` VARCHAR(100), PRIMARY KEY(`email`));

CREATE TABLE IF NOT EXISTS `pets`(`name` VARCHAR(45) NOT NULL, `weight` INT, `age` INT, `specie` VARCHAR(45), PRIMARY KEY(`name`));

CREATE TABLE IF NOT EXISTS `treats`(`name` VARCHAR(45) NOT NULL, `manufacturer` VARCHAR(45), PRIMARY KEY(`email`));

