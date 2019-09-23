PetBook

On clone, run the following commands:

	npm install
	node server.js

To prepare MySQL with proper schema, run the following in MySQL workbench:

	CREATE USER 'petbook'@'%' IDENTIFIED WITH mysql_native_password BY 'petbook!Node.js';
	
	CREATE TABLE `petbook`.`t_pets` (
		`id` INT NOT NULL AUTO_INCREMENT,
		`name` VARCHAR(45) NULL,
		`species` VARCHAR(45) NULL,
		PRIMARY KEY (`id`)
	);

	GRANT ALL PRIVILEGES ON petbook.* TO 'petbook'@'%';
	FLUSH PRIVILEGES;

To test functionality, visit http://localhost:3000/pets to list values in the table.
Alternatively, use CURL or Postman to test POST and GET
