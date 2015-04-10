var socket = io();
$('form').submit(function(){
  var chat = $('#m').val()
  socket.emit('chat message', {name: 'anonymous', chat: chat});
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg.name + ": " + msg.chat));
});
