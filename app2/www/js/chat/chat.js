'use strict';
angular.module('crewapp.chat', [])
.controller('ChatController', function($scope, Auth, Sockets, $localStorage){
  $scope.test = 'Chats';
  Sockets.rooms();
  Sockets.mySocket.emit('join room', $localStorage.groupname);

});
