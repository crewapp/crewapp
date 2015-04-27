'use strict';
angular.module('crewapp.chat', [])
.controller('ChatController', function($scope, Sockets, $localStorage, $ionicScrollDelegate){

	var nonce = function(length) {
      var last = null
      var repeat = 0

      if (typeof length == 'undefined') length = 15

      return function() {
        var now = Math.pow(10, 2) * +new Date()
        if (now == last) {
            repeat++
        } else {
            repeat = 0
            last = now
        }
        var s = (now + repeat).toString()
        return +s.substr(s.length - length)
      }
    }

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
