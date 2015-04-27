'use strict';
angular.module('crewapp.chat', [])
.controller('ChatController', function($scope, Sockets, $localStorage, $ionicScrollDelegate){

	var nonce = function(length) {
    var last = null;
    var repeat = 0;

    if (typeof length === 'undefined'){
      length = 15;
    }

    return function() {
      var now = Math.pow(10, 2) * +new Date()
      if (now === last) {
          repeat++;
      } else {
          repeat = 0;
          last = now;
      }
      var s = (now + repeat).toString();
      return +s.substr(s.length - length);
    };
  };

  var random = nonce(10);

	$scope.form = {};
    Sockets.emit('join room', 'potatoes');
    $scope.name = $localStorage.name

    $scope.addItem = function() {
      var message = {name: $localStorage.name, message: $scope.form.itemToAdd, picture: $localStorage.picture}
	    Sockets.emit('message', message);
    };

    Sockets.on('message', function(message) {
      var key = Date.now() + random();
	    $scope.messages.push({key: key, message: message.message, name: message.name, picture: message.picture});
	    $ionicScrollDelegate.scrollBottom();
    });

    $scope.messages = [];

});
