var db = require('../db');

var Petbook = {
    getpets: function(callback) {
        return db.query('SELECT * FROM t_pets', callback);
    },
    createpet: function (Petbook, callback) {
        return db.query('INSERT INTO t_pets(name, species, age) VALUES(?, ?, ?)', [Petbook.name, Petbook.species, Petbook.age], callback);
    },
    updatepet: function (Petbook, callback) {
    	return db.query('UPDATE t_pets SET name=?, species=? WHERE ID=?', [Petbook.name, Petbook.species, Petbook.id], callback);
    },
    deletepet: function (Petbook, callback) {
    	return db.query('DELETE FROM t_pets WHERE ID=?', [Petbook.id], callback);
    }
}

module.exports = Petbook;