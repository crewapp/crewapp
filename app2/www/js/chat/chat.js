'use strict';
angular.module('crewapp.chat', [])
.controller('ChatController', function($scope, Auth, Sockets){
  $scope.test = 'Chats';
  Sockets.rooms();

});
