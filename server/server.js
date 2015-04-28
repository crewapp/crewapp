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

chatApp.all('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

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
    console.log(room);
  });

  socket.on('error', function(err) {
   console.log(err);
  });

  socket.on('poll', function(poll) {
    io.sockets.in(socket.room).emit('poll', poll);
  });

  socket.on('message', function(chat) {
    io.sockets.in(socket.room).emit('message', chat);

    /* auto respond for presentation */
    if(chat.message === 'Hey!'){
      io.sockets.in(socket.room).emit('message', {
        message: 'Hey Pavan! Where should we go today?',
        name: 'Arian',
        picture: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/v/t1.0-1/c0.0.200.200/p200x200/1424303_10152024237802556_1898622173_n.jpg?oh=846d963201736ee369c22c25df00fda4&oe=55DD40DD&__gda__=1440400870_adc0fd39bcedf6fa029508f9c13eb6cd'
      });
    }

  });
});

//------ Our App Server ------//
app.use(express.static(__dirname + '/../client'));

app.use('/', function(req, res, next) {
  console.log('hello');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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
