'use strict';
//------ Require: General Server ----//
var express = require('express');

//------ Require: Chat Server -------//
var chatApp = express();
var http = require('http');
var chatServer = http.Server(chatApp);
var socket = require('socket.io');
var io = socket(chatServer);
var chatRouter = require('express').Router();

//------- Require: Our Server -------//
var app = express();
var parser = require('body-parser');
var routes = require('./routes.js');

//----- Require: Database Config ----//
var db = require('./database');

//------ Chat Server ------//
chatApp.use(express.static(__dirname + '/../test'));

var rooms = [{name: 'room Blue-Penguin', count: 0}];

chatRouter.get('/rooms', function(req, res){
  res.end(rooms[0].name);
});

chatApp.use('/api', chatRouter);

io.sockets.on('connection', function(socket) {

  socket.on('join room', function(room) {
    socket.room = room;
    socket.join(room);
  });

  socket.on('error', function(err) {
    console.log(err);
  });

  socket.on('message', function(data) {
    io.sockets.in(socket.room).emit('message', data);
  });
  
});

chatServer.listen(process.env.CHATPORT || 5000);

//------ Our App Server ------//

app.use(express.static(__dirname + '/../client'));

// Set up our body parser for query strings
app.use(parser.urlencoded({ extended: false }));

// Set up our body parser for json strings
app.use(parser.json());

routes.get('/rooms', function(req, res){

  res.end(rooms[0].name);

});

// Set up our routes
app.use('/api', routes);


app.listen(process.env.PORT || 3000);
