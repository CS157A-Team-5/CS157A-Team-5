var db = require('../db');

var Petbook = {
    createowner: function(owner, hash, callback) {
        return db.query('INSERT INTO owners(email, password, name, location) VALUES(?, ?, ?, ?)', 
            [owner.email, hash, owner.name, owner.location] callback);
    },
    getowner: function(owner, hash, callback) {
        return db.query('SELECT * FROM owners WHERE email=?', owner.email, callback);
    },

    getgroups: function(callback) {
        return db.query('SELECT name FROM groups', callback);
    },
    getgroup: function(name, callback) {
        return db.query('SELECT * FROM groups WHERE name=?', name, callback);
    },
    creategroup: function (group, callback) {
        return db.query('INSERT INTO groups(name, size, species) VALUES(?, ?, ?)', 
            [group.name, group.size, group.species], callback);
    },
    updategroup: function (group, callback) {
    	return db.query('UPDATE groups SET size=? WHERE name=?', 
            [group.size, group.name], callback);
    },
    deletegroup: function (group, callback) {
    	return db.query('DELETE FROM groups WHERE name=?', group.name, callback);
    },
}

module.exports = Petbook;