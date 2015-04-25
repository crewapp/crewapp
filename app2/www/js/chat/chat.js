'use strict';
angular.module('crewapp.chat', [])
.controller('ChatController', function($scope, Sockets, $localStorage, $ionicScrollDelegate){
	$scope.form = {};
    Sockets.emit('join room', 'potatoes');
    $scope.name = $localStorage.name

    $scope.addItem = function() {
	  Sockets.emit('message', $scope.form.itemToAdd);
    }
    Sockets.on('message', function(message) {
	  $scope.messages.push(message);
	  $ionicScrollDelegate.scrollBottom();
    })
    
    $scope.messages = []
});
