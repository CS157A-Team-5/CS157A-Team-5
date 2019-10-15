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


# controlpoint159safe!

INSERT INTO owners
    (email, password, name)
VALUES
    ('sherzodr@msn.com', '0CC175B9C0F1B6A831C399E269772661', 'Miguel'),
    ('liedra@msn.com', '92EB5FFEE6AE2FEC3AD71C777531578F', 'Katarina'),
    ('zavadsky@me.com', '4A8A08F09D37B73795649038408B5F33', 'Leo'),
    ('ismail@comcast.net', '8277E0910D750195B448797616E091AD', 'Josie'),
    ('jbarta@outlook.com', 'E1671797C52E15F763380B45E841EC32', 'Jack'),
    ('martink@comcast.net', '8FA14CDD754F91CC6554C9E71929CCE7', 'Steve'),
    ('crandall@gmail.com', 'B2F5FF47436671B6E533D8DC3614845D', 'Alisa'),
    ('gilmoure@verizon.net', '2510C39011C5BE704182423E3A695E91', 'Bryan'),
    ('martyloo@icloud.com', '865C0C0B4AB0E063E5CAA3387C1A8741', 'Nina'),
    ('philb@comcast.net', '363B122C528F54DF4A0446B6BAB05515', 'Anna'),
    ('rmcfarla@comcast.net', '8CE4B16B22B58894AA86C421E8759DF3', 'Paul'),
    ('dawnsong@yahoo.ca', '2DB95E8E1A9267B7A1188556B2013B33', 'Lili'),
    ('feamster@msn.com', '6F8F57715090DA2632453988D9A1501B', 'Eddy'),
    ('panolex@mac.com', '7B8B965AD4BCA0E41AB51DE7B31363A1', 'Julia'),
    ('danny@mac.com', 'D95679752134A2D9EB61DBD7B91C4BCC', 'Chloe');

INSERT INTO pets
  (name, weight, age, species, owner_id)
VALUES
    ('Annie', 80, 2, 'Dog', 1), 
    ('Cinders', 20, 7, 'Cat', 2), 
    ('Snickers', 15, 8, 'Cat', 3), 
    ('Bessie', 30, 3, 'Dog', 4), 
    ('Pookie', 5, 1, 'Cat', 5), 
    ('Booker', 2, 24, 'Bird', 6), 
    ('Rolo', 1, 6, 'Lizard', 7), 
    ('Grizzly', 115, 5, 'Dog', 8), 
    ('Shakespeare', 50, 4, 'Dog', 9), 
    ('Cyrus', 12, 15, 'Cat', 10), 
    ('Howler', 1, 3, 'Bird', 11), 
    ('Lex', 24, 10, 'Cat', 12), 
    ('Meeko', 35, 6, 'Dog', 13), 
    ('Chewie', 45, 7, 'Dog', 14), 
    ('Spock', 65, 1, 'Dog', 15);

INSERT INTO clubs 
    (name, size, species)
VALUES 
    ('Lizard Kings',2,'Lizards'),
    ('Ruff Rottweilers',3,'Dogs'),
    ('Cute Kitties',2,'Cats'),
    ('Lonely Cats',1,'Cats'),
    ('Hip Lizs',2,'Lizards'),
    ('Katz',1,'Cats'),
    ('Doodlers',1,'Dogs'),
    ('Little Barkers',2,'Dogs'),
    ('Littlest Doggos Ever',1,'Dogs'),
    ('Fat Cats',1,'Cats'),
    ('Tabby Cats',1,'Cats'),
    ('Spooky Doggos',1,'Dogs'),
    ('Neighborhood Watch Dogs',1,'Dogs'),
    ('Anti-Cats',1,'Dogs'),
    ('Munchkins',1,'Birds');

INSERT INTO parks
    (name, location, hours)
VALUES 
    ('Butcher Dog Park','1782 Lancaster Dr, San Jose, CA 95124','8am-10pm everyday'),
    ('Cahill Park','W. San Fernando Street & Wilson Avenue, San Jose, CA 95126','7am-7pm everyday'),
    ('Cipriani Park & Dog Park','2525 Buena Vista Ave, Belmont, CA 94002','24/7'),
    ('Cuesta Park','615 Cuesta Dr, Mountain View, CA 94040','24/7'),
    ('Discovery Dog Park','410 Park Ave, San Jose, CA 95110','24/7'),
    ('Hart\'s Dog Park','194 W Santa Clara St, San Jose, CA 95113','24/7'),
    ('Kelley Park','1300 Senter Rd, San Jose, CA 95112','24/7'),
    ('Las Palmas Park','850 Russet Dr, Sunnyvale, CA 94087','8am-8pm Thur-Tue, 2pm-8pm Wed'),
    ('Laurie Meadows Dog Park','4017 Pasadena Dr, San Mateo, CA 94403','7am-6:30pm everyday'),
    ('Live Oak Park','641 Moreland Way, Santa Clara, CA 95054','6:30am-8:30pm'),
    ('Los Gatos Creek County Park','1250 Dell Ave, Campbell, CA 95008','24/7'),
    ('Rengstorff Park- Fenced Dog Park','2000 California St, Mountain View, CA 94040','24/7'),
    ('Saratoga Creek Dog Park','5399 Graves Ave, San Jose, CA 95129','7am-8pm everyday'),
    ('Village Green Dog Park','555 San Antonio Rd, Mountain View, CA 94040','24/7'),
    ('Watson Park','N 22nd St & Jackson St, San Jose, CA 95112','7am-7pm everyday');

INSERT INTO treats
    (manufacturer,name, species)
VALUES 
    ('KAYTEE','Fiesta Yogurt-Dipped Treats','bird'),
    ('Lickable Treats','Squeeze Up','cat'), 
    ('Simply Nourish','Mousse Treat','cat'),
    ('GREENIES','SmartBites','cat'), 
    ('SHEBA','Meaty Tender Sticks','cat'),
    ('Purina','DENTASTIX','dog'),
    ('Dentley''s','Gourmet Wrapped Rawhide Sticks','dog'),
    ('Pet Botanics','Training Rewards','dog'),
    ('SmartBones','Chicken Wrapped Sticks','dog'),
    ('Purina','Beggin'' Strips','dog'),
    ('Simply Nourish','Soft Chews Sticks','dog'),
    ('Dentley''s','Gourmet Rawhide Curls','dog'),
    ('GREENIES','Pill Pockets','dog'),
    ('True Chews','Premium Jerky Cuts','dog'),
    ('GREENIES','Dental Dog Treat','dog');

INSERT INTO pet_pet
  (pet1_id, pet2_id)
VALUES
    (3, 14),
    (15, 4),
    (5, 6),
    (4, 2),
    (6, 3),
    (12, 15),
    (9, 10),
    (8, 11),
    (1, 9),
    (14, 8),
    (10, 13),
    (13, 12),
    (2, 7),
    (11, 5),
    (7, 1);

INSERT INTO owner_club
    (owner_id, club_id)
VALUES 
    (1, 2),
    (6, 3),
    (11, 2),
    (9, 10),
    (4, 4),
    (12, 2),
    (7, 3),
    (4, 3),
    (15, 3),
    (14, 5),
    (9, 10),
    (6,9),
    (2, 11),
    (10, 10),
    (13, 12);

INSERT INTO owner_park
    (owner_id, park_id)
VALUES
    (1, 8),
    (5, 4), 
    (10, 8),     
    (3, 10), 
    (2, 5), 
    (11, 1), 
    (7, 12), 
    (4, 15), 
    (10, 3), 
    (15, 4), 
    (12, 1), 
    (5, 15), 
    (6, 11), 
    (3, 13), 
    (13, 2);

INSERT INTO club_park
    (club_id, park_id)
VALUES 
    (1,1),
    (1,2),
    (2,2),
    (3,4),
    (6,3),
    (4,8),
    (5,10),
    (6,15),
    (7,1),
    (8,8),
    (9,11),
    (10,11),
    (11,13),
    (12,5),
    (13,7),
    (14,7),
    (15,7);

INSERT INTO pet_treat
    (pet_id, treat_id)
VALUES
    (4, 8),
    (1, 6), 
    (1, 8),     
    (13, 10), 
    (12, 5), 
    (11, 1), 
    (9, 12), 
    (8, 15), 
    (10, 3), 
    (5, 14), 
    (12, 10), 
    (5, 5), 
    (6, 1), 
    (3, 3), 
    (3, 2);

INSERT INTO park_treat
    (park_id, treat_id, cost)
VALUES
    (4, 7, 4.99),
    (1, 6, 11.99), 
    (1, 8, 7.99),     
    (13, 10, 3.59), 
    (13, 13, 7.99), 
    (11, 7, 4.99), 
    (11, 1, 16.99), 
    (10, 4, 2.49), 
    (10, 3, 2.99), 
    (5, 14, 9.99), 
    (5, 12, 20.99), 
    (6, 6, 11.99), 
    (6, 10, 3.59), 
    (3, 11, 5.99), 
    (3, 9, 16.99);
