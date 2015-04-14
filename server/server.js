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

//------ Chat Server ------//
chatApp.use(express.static(__dirname + '/../test'));

var rooms = [{name: 'Blue-Penguin', count: 0},
             {name: 'Red-Crawfish', count: 0},
             {name: 'Yellow-tail', count: 0},
             {name: 'Orange-monkey', count: 0}
            ];

chatRouter.get('/rooms', function(req, res){
  res.end(rooms[Math.floor(Math.random() * rooms.length)].name);
});
 
chatApp.use('/api', chatRouter);

chatServer.listen(process.env.CHATPORT || 5000);

//------- Socket Server --------//
io.sockets.on('connection', function(socket) {
  socket.on('join room', function(room) {
    socket.room = room;
    socket.join(room);
  });

  socket.on('error', function(err) {
   console.log(err);
  });

  socket.on('message', function(chat) {
    io.sockets.in(socket.room).emit('message', chat);
  });
});

//------ Our App Server ------//
app.use(express.static(__dirname + '/../client'));

// 2 for dev, 0 for production
app.set('json spaces', 2);

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
