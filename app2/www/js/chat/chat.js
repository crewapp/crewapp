'use strict';
angular.module('crewapp.chat', [])
.controller('ChatController', function($scope, Auth, Sockets, $localStorage, $ionicScrollDelegate){

	var nonce = function(length) {
    var last = null;
    var repeat = 0;

    if (typeof length === 'undefined'){
      length = 15;
    }

    return function() {
      var now = Math.pow(10, 2) * +new Date();
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

  $scope.logout = function(){
    Auth.logout();
  }
  $scope.voteAtext = 'VOTE';
  $scope.voteBtext = 'VOTE';
  $scope.vote = function(arg) {
    if (arg === 0) {
      $scope.voteA = !$scope.voteA;
      $scope.voteB = false;
      $scope.voteAtext = 1;
      $scope.voteBtext = 0;
      console.log('2', $scope.voteA);
    }
    else {
      $scope.voteB = !$scope.voteB;
      $scope.voteA = false;
      $scope.voteAtext = 0;
      $scope.voteBtext = 1;
      console.log('0', $scope.voteB);
    }
  };

  $scope.form = {};
  var room = $localStorage.groupname || 'potatoes';
  $scope.picture = $localStorage.picture || 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/c59.0.200.200/p200x200/10354686_10150004552801856_220367501106153455_n.jpg?oh=22570f4a9d45560db6ba27910a22d532&oe=55CECC25&__gda__=1436448341_fa2aaf8a93f5542367e8d82392fd2ea7';
  Sockets.emit('join room', room);
  var temp = $localStorage.name || 'anon';
  $scope.name = temp.split(' ')[0] || 'anon';

  $scope.addItem = function() {
    var message = {
      name: $scope.name,
      message: $scope.form.itemToAdd,
      picture: $scope.picture
    };
    Sockets.emit('message', message);
  };

  Sockets.on('message', function(message) {
    var key = Date.now() + random();
    $scope.messages.push({key: key, message: message.message, name: message.name, picture: message.picture});
    $ionicScrollDelegate.scrollBottom();
    $scope.form.itemToAdd = '';
    console.log('GOT IN MESSAGES' + message);
  });

  Sockets.on('poll', function(poll) {
    console.log(poll + 'got in chat')
    $scope.messages.push(poll)
  })

  $scope.messages = [];

});
