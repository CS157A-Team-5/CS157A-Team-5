var express = require('express');
var app = express();

var PetbookController = require('./petbook/PetbookController');
app.use('/api', PetbookController);

module.exports = app;