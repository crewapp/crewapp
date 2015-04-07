var fs = require('fs');
var express = require('express');
var app = express();
var routes = require('./routes.js');
var parser = require('body-parser');

app.use(express.static(__dirname + '/../client'));

// Set up our body parser for query strings
app.use(parser.urlencoded({ extended: false }));

// Set up our body parser for json strings
app.use(parser.json());

// Set up our routes
app.use('/api', routes);

app.listen(process.env.PORT || 3000);
