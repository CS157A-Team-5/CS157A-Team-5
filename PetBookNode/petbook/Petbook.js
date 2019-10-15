var db = require('../db');

var Petbook = {
    getowner: function(owner, hash, callback) {
        return db.query('SELECT * FROM owners WHERE id=?', owner.id, callback);
    },
    createowner: function(owner, hash, callback) {
        return db.query('INSERT INTO owners(email, password, name, location) VALUES(?, ?, ?, ?)', 
            [owner.email, hash, owner.name, owner.location], callback);
    },
    getpetsbyowner: function(owner, callback) {
        return db.query('SELECT * FROM pets WHERE owner_id=?', owner.id, callback);
    },

    getpet: function(pet, callback) {
        return db.query('SELECT * FROM pets WHERE id=?', [pet.email, pet.name], callback);
    },
    getpetsbyname: function(name, callback) {
        return db.query('SELECT * FROM pets WHERE name LIKE ?', (name + '%'), callback);
    },
    createpet: function(pet, callback) {
        return db.query('INSERT INTO pets(owner_id, name, weight, age, species) VALUES(?, ?, ?, ?)', 
            [pet.owner_id, pet.name, pet.age, pet.species], callback);
    },
    updatepet: function(pet, callback) {
        return db.query('UPDATE pets SET weight=?, age=? WHERE id=?)', 
            [pet.weight, pet.age, pet.id], callback);
    },
    deletepet: function(pet, callback) {
        return db.query('DELETE FROM pets WHERE id=?', pet.id, callback);
    },

    getclubs: function(callback) {
        return db.query('SELECT * FROM clubs', callback);
    },
    getclub: function(club, callback) {
        return db.query('SELECT * FROM clubs WHERE id=?', club.id, callback);
    },
    getclubbyname: function(name, callback) {
        return db.query('SELECT * FROM clubs WHERE name LIKE ?', (name + '%'), callback);
    },
    createclub: function (club, callback) {
        return db.query('INSERT INTO clubs(name, size, species) VALUES(?, ?, ?)', 
            [club.name, club.size, club.species], callback);
    },
    updateclub: function (club, callback) {
    	return db.query('UPDATE clubs SET name=?, size=? WHERE id=?', 
            [club.name, club.size, club.id], callback);
    },
    deleteclub: function (club, callback) {
    	return db.query('DELETE FROM clubs WHERE id=?', club.id, callback);
    },
}

module.exports = Petbook;