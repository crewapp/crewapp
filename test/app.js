'use strict';

$(document).ready(function() {

  var socket = io();
  var room;

  $.ajax({
    url:"http://localhost:5000/api/rooms",
    success: function(data) {
      console.log(data);
      $('#header').html(data);
      room = data;
    }
  }).then(function() {
    socket.on('connect', function() {
      socket.emit('join room', room);
    });

    socket.on('message', function(msg){
      console.log('Message: ' + msg);
      $('#messages').append('<li>anonymous: '+msg+'</li>');
    });

    $('form').submit(function(){
      var chat = $('#m').val();
      socket.emit('message', chat);
      $('#m').val('');
      return false;
    });
  });

});

