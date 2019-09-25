var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors());

var PetbookController = require('./petbook/PetbookController');
app.use('/api', PetbookController);

module.exports = app;