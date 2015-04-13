'use strict';
//------ Require: General Server ----//
var express = require('express');

//------ Require: Chat Server -------//
var chatApp = express();
var http = require('http');
var chatServer = http.Server(chatApp);
var socket = require('socket.io');
var io = socket(chatServer);

//------- Require: Our Server -------//
var app = express();
var parser = require('body-parser');
var routes = require('./routes.js');

//----- Require: Database Config ----//
var db = require('./database');

//------ Chat Server ------//
chatApp.use(express.static(__dirname + '/../test'));

io.on('connection', function(socket){
  //Show 5 most recent chats to user upon login
  db.Message.findAll({
    limit: 5,
    order: 'createdAt DESC'
  }).success(function(data){
    for (var i=0; i<5; i++){
      var messages = data[i].dataValues;
      io.emit('chat message', {name: messages.name, chat: messages.message});
    }
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    // db.Message.create({
    //   message: msg.chat
    // });
  });
});

chatServer.listen(process.env.CHATPORT || 5000);

//------ Our App Server ------//
app.use(express.static(__dirname + '/../client'));

// Set up our body parser for query strings
app.use(parser.urlencoded({ extended: false }));

// Set up our body parser for json strings
app.use(parser.json());

// Set up our routes
app.use('/api', routes);

app.listen(process.env.PORT || 3000);
