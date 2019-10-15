var db = require('../db');

var Petbook = {
    getowner: function(owner, hash, callback) {
        return db.query('SELECT * FROM owners WHERE email=?', owner.email, callback);
    },
    createowner: function(owner, hash, callback) {
        return db.query('INSERT INTO owners(email, password, name, location) VALUES(?, ?, ?, ?)', 
            [owner.email, hash, owner.name, owner.location], callback);
    },
    getpetsbyowner: function(owner, callback) {
        return db.query('SELECT * FROM pets WHERE email=?', owner.email, callback);
    },

    getpet: function(pet, callback) {
        return db.query('SELECT * FROM pets WHERE email=? AND name=?', [pet.email, pet.name], callback);
    },
    getpetsbyname: function(name, callback) {
        return db.query('SELECT * FROM pets WHERE email=? AND name=?', name, callback);
    },
    createpet: function(pet, callback) {
        return db.query('INSERT INTO pets(email, name, weight, age, species) VALUES(?, ?, ?, ?)', 
            [pet.email, pet.name, pet.age, pet.species], callback);
    },
    updatepet: function(pet, callback) {
        return db.query('UPDATE pets SET weight=?, age=? WHERE email=? AND name=?)', 
            [pet.weight, pet.age, pet.email, pet.name], callback);
    },
    deletepet: function(pet, callback) {
        return db.query('DELETE FROM pets WHERE email=? AND name=?', [pet.email, pet.name], callback);
    },

    getclubs: function(callback) {
        return db.query('SELECT name FROM clubs', callback);
    },
    getclubbyname: function(name, callback) {
        return db.query('SELECT * FROM clubs WHERE name=?', name, callback);
    },
    createclub: function (club, callback) {
        return db.query('INSERT INTO clubs(name, size, species) VALUES(?, ?, ?)', 
            [club.name, club.size, club.species], callback);
    },
    updateclub: function (club, callback) {
    	return db.query('UPDATE clubs SET size=? WHERE name=?', 
            [club.size, club.name], callback);
    },
    deleteclub: function (club, callback) {
    	return db.query('DELETE FROM clubs WHERE name=?', club.name, callback);
    },
}

module.exports = Petbook;