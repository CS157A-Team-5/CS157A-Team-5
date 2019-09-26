var db = require('../db');

var Petbook = {
    getpets: function(callback) {
        return db.query('SELECT * FROM t_pets', callback);
    },
    createpet: function (pet, callback) {
        return db.query('INSERT INTO t_pets(name, species, age) VALUES(?, ?, ?)', [pet.name, pet.species, pet.age], callback);
    },
    updatepet: function (pet, callback) {
    	return db.query('UPDATE t_pets SET name=?, species=?, age=? WHERE ID=?', [pet.name, pet.species, pet.age, pet.id], callback);
    },
    deletepet: function (pet, callback) {
    	return db.query('DELETE FROM t_pets WHERE ID=34', [pet.id], callback);
    }
}

module.exports = Petbook;