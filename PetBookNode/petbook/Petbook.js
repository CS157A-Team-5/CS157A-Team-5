var db = require('../db');

var Petbook = {
    getpets: function(callback) {
        return db.query('SELECT * from t_pets', callback);
    },
    createpet: function (Petbook, callback) {
        return db.query('Insert into t_pets(name, species) values(?, ?)',[Petbook.name, Petbook.species], callback);
    }
}

module.exports = Petbook;