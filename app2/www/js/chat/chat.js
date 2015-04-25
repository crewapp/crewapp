'use strict';
angular.module('crewapp.chat', [])
.controller('ChatController', function($scope, Auth, Sockets, $localStorage){

    Sockets.emit('join room', $localStorage.groupname);

});
