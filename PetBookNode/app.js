var express = require('express');
var app = express();

var PetbookController = require('./petbook/PetbookController');
app.use('/pets', PetbookController);

module.exports = app;