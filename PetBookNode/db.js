var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'petbook',
    password : 'petbook!Node.js',
    database : 'petbook'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
