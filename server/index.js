require('dotenv').config();
var express = require('express');
const passport = require('passport');
var app = express();

require('./config/routes')(app, passport);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
