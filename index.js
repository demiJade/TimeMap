var express = require('express');
var app = express();

var PORT = process.env.PORT || 5000;

app.use(express.static('views'));

var server = app.listen(PORT);
console.log("Listening to port: " + PORT);