'use strict';

$(document).ready(function() {

  var socket = io();
  var room;

  // $.ajax({
  //   url:"http://localhost:5000/api/rooms",
  //   success: function(data) {
  //     console.log(data);
  //     $('#header').html(data);
  //     room = data;
  //   }
  // }).done(function() {
    // socket.on(room, function(msg){
    //   $('#messages').append($('<li>').text(msg.name + ': ' + msg.chat));
    // });
    // $('form').submit(function(){
    //   var chat = $('#m').val();
    //   socket.emit(room, {name: 'anonymous', chat: chat});
    //   $('#m').val('');
    //   return false;
    // });
    // console.log(room);
  // });

  socket.on('connect', function() {
    socket.emit('join room', 'room1');
  });

  socket.on('new fan', function(data) {
    console.log('new fan');
  });

  socket.on('message', function(msg){
    console.log('Message: ' + msg);
    console.log(socket.room);
  });

  $('form').submit(function(){
    var chat = $('#m').val();
    socket.emit('message', chat);
    $('#m').val('');
    return false;
  });

});

