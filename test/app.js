'use strict';

$(function() {

  var socket = io();
  var room;

  $.ajax({
    url:'http://localhost:5000/api/rooms',
    success: function(data) {
      console.log(data);
      $('#header').html(data);
      room = data;
    }
  }).then(function() {
    socket.on('connect', function() {
      socket.emit('join room', room);
    });
    socket.on('message', function(chat){
      console.log('Message: ' + chat);
      $('#messages').append('<li>anonymous: '+chat.message+'</li>');
    });

    $('form').submit(function(){
      var chat = $('#m').val();
      socket.emit('message', chat);
      $('#m').val('');
      return false;
   });
  });

 });
