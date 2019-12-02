var db = require('../db');

var Petbook = {
    getowner: function(email, callback) {
        return db.query('SELECT * FROM owners WHERE email=?', email, callback);
    },
    createowner: function(owner, hash, callback) {
        return db.query('INSERT INTO owners(email, password, name, location) VALUES(?, ?, ?, ?)',
            [owner.email, hash, owner.name, owner.location], callback);
    },
    getpetsbyowner: function(owner_id, callback) {
        return db.query('SELECT * FROM pets WHERE owner_id=?', owner_id, callback);
    },

    getpet: function(pet_id, callback) {
        return db.query('SELECT * FROM pets WHERE id=?', pet_id, callback);
    },
    getpetsbyname: function(name, callback) {
        return db.query('SELECT * FROM pets WHERE name LIKE ?', (name + '%'), callback);
    },
    getpetsbylocation: function (location, callback) {
        return db.query('SELECT p.* FROM pets AS p, owners WHERE location=?', location, callback);
    },
    getpetsbyclub: function (club_id, callback) {
        return db.query('SELECT p.* FROM pets AS p, ' +
            '(SELECT owner_id AS o_id FROM owner_club WHERE club_id=?)' +
            'WHERE owner_id = o_id',
            club_id, callback);
    },
    getpetsbypark: function (park_id, callback) {
        return db.query('SELECT p.* FROM pets AS p, ' +
            '(SELECT owner_id AS o_id FROM owner_park WHERE park_id=?)' +
            'WHERE owner_id = o_id',
            park_id, callback);
    },
    createpet: function(pet, callback) {
        return db.query('INSERT INTO pets(owner_id, name, weight, age, species) VALUES(?, ?, ?, ?)',
            [pet.owner_id, pet.name, pet.age, pet.species], callback);
    },
    updatepet: function(pet, callback) {
        return db.query('UPDATE pets SET weight=?, age=? WHERE id=?)',
            [pet.weight, pet.age, pet.id], callback);
    },
    deletepet: function(pet_id, callback) {
        return db.query('DELETE FROM pets WHERE id=?', pet_id, callback);
    },

    getclub: function(club_id, callback) {
        return db.query('SELECT * FROM clubs WHERE id=?', club_id, callback);
    },
    getclubbyname: function(name, callback) {
        return db.query('SELECT * FROM clubs WHERE name LIKE ?', (name + '%'), callback);
    },
    getclubbyowner: function(owner_id, callback) {
        //return db.query('SELECT club_id FROM owner_club WHERE owner_id=?', owner_id, callback);
		return db.query('SELECT name, species, size FROM clubs JOIN owner_club USING(id) WHERE owner_id=?', owner_id, callback);
    },
    joinclub: function (data, callback) {
        return db.query('INSERT INTO owner_club(owner_id, club_id) VALUES(?, ?)',
            [data.owner_id, data.club_id], callback);
    },
    leaveclub: function (data, callback) {
        return db.query('DELETE FROM owner_club WHERE owner_id=? AND club_id=?',
            [data.owner_id, data.club_id], callback);
    },
    createclub: function(club, callback) {
        return db.query('INSERT INTO clubs(name, size, species) VALUES(?, ?, ?)',
            [club.name, club.size, club.species], callback);
    },
    updateclub: function(club, callback) {
    	return db.query('UPDATE clubs SET name=?, species=?, size=? WHERE id=?',
            [club.name, club.species, club.size, club.id], callback);
    },
    deleteclub: function(club_id, callback) {
    	return db.query('DELETE FROM clubs WHERE id=?', club_id, callback);
    },

    getfriendsbypet: function(pet_id, callback) {
        return db.query('SELECT * FROM pets INNER JOIN pet_pet AS pp ON pets.id=pp.pet2_id WHERE pp.pet1_id=?',
            pet_id, callback);
    },
    getfriendship: function(data, callback) {
        return db.query('SELECT id FROM pet_pet AS pp WHERE pp.pet1_id=? AND pp.pet2_id=?',
            [data.pet1_id, data.pet2_id], callback);
    },
    addfriendship: function(data, callback) {
        return db.query('INSERT INTO pet_pet(pet1_id, pet2_id) VALUES(?, ?)',
            [data.pet1_id, data.pet2_id], callback);
    },
    deletefriendship: function(friendship_id, callback) {
        return db.query('DELETE FROM pet_pet AS pp WHERE pp.id=?',
            friendship_id, callback);
    }
}

module.exports = Petbook;
