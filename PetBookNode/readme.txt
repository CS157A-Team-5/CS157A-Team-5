PetBook

On clone, run the following commands:

	npm install
	node server.js

To prepare MySQL, run the following in MySQL workbench, assuming established schema named 'petbook':

	CREATE USER 'petbook'@'%' IDENTIFIED WITH mysql_native_password BY 'petbook!Node.js';
	
	CREATE TABLE 'petbook'.'t_pets' (
		'id' INT NOT NULL AUTO_INCREMENT,
		'name' VARCHAR(45) NULL,
		'species' VARCHAR(45) NULL,
		PRIMARY KEY ('id')
	);

	GRANT ALL PRIVILEGES ON petbook.* TO 'petbook'@'%';
	FLUSH PRIVILEGES;

