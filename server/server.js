var fs = require('fs');
var express = require('express');
var app = express();
var routes = require('./routes.js');

app.use(express.static(__dirname + '/../client'));

app.listen(process.env.PORT || 3000);
