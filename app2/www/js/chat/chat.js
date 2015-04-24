'use strict';
angular.module('crewapp.chat', [])
.controller('ChatController', function($scope, Auth, Sockets){

  ionic.Platform.ready(function(){
    Sockets.emit('join room', 'pavan');
  });

});
