var mysql      = require('mysql');
var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'petbook',
    password : 'petbook!Node.js',
    database : 'petbook'
});
module.exports=connection;