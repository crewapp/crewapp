'use strict';
angular.module('crewapp.services', [])

.factory('Auth', function($http, $cordovaOauth, $localStorage, $location) {
  var login = function(user) {
    return $http({
      method: 'POST',
      url: 'http://trycrewapp.com/api/auth/signin',
      data: user
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var fbLogin = function() {
    ionic.Platform.ready(function(){
      $cordovaOauth
        .facebook('438594989641449', ['email'])
        .then(function(result) {
          $localStorage.accessToken = result.access_token;
          $localStorage.expiresIn = Math.floor(Date.now()/1000)+result.expires_in;
          profile();
        }, function(error) {
          alert('something went wrong: ' + error);
        });
    });
  };

  var sendProfile = function (user) {
    return $http({
      method: 'POST',
      url: 'http://trycrewapp.com/api/auth/update',
      data: user
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var profile = function() {
    if($localStorage.hasOwnProperty('accessToken') === true &&
        $localStorage.hasOwnProperty('expiresIn') === true &&
        $localStorage.expiresIn > Math.floor(Date.now()/1000)) {
      return $http.get('https://graph.facebook.com/v2.2/me', {
        params: {
          access_token: $localStorage.accessToken,
          fields: 'id,name,gender,location,picture.width(168).height(168)',
          format: 'json'
        }
      }).then(function(result) {
        $localStorage.name = result.data.name;
        $localStorage.gender = result.data.gender;
        $localStorage.id = result.data.id;
        $localStorage.picture = result.data.picture.data.url;


        sendProfile({
          id: result.data.id,
          name: result.data.name,
          gender: result.data.gender,
          picture: result.data.picture.data.url,
          token: $localStorage.accessToken
        });

        return result;
      }).catch(function(error){
        alert('Error: ' + error);
        $location.path('/');
      });
    }else {
      alert('Not signed in!');
      $location.path('/');
    }
  };

  var logout = function(user) {
    return $http({
      method: 'POST',
      url: 'http://trycrewapp.com/api/auth/',
      data: user
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var signup = function(signup) {
    $location.path('/location');
  };
  return {
    login: login,
    profile: profile,
    logout: logout,
    signup: signup,
    fbLogin: fbLogin
  };
})
.factory('Sockets', function(socketFactory, $http){
  var myIoSocket = io.connect('chat.trycrewapp.com');

  var mySocket = socketFactory({
      ioSocket: myIoSocket
    });

  var rooms = function() {
    return $http({
      method: 'GET',
      url: 'http://trycrewapp.com/api/rooms'
    })
    .then(function(resp){
      console.log(resp.data);
    });
  };

  return {
    rooms: rooms,
    mySocket: mySocket
  }

})
.factory('Groups', function($http){
  var get = function(user) {
    return $http({
      method: 'POST',
      url: 'http://trycrewapp.com/api/groups/',
      data: user
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var leave = function(user) {
    return $http({
      method: 'POST',
      url: 'http://trycrewapp.com/api/groups/leave',
      data: user
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var join = function(user) {
    return $http({
      method: 'POST',
      url: 'http://trycrewapp.com/api/groups/join',
      data: user
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var messages = function(user) {
    return $http({
      method: 'POST',
      url: 'http://trycrewapp.com/api/groups/messages',
      data: user
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var list = function() {
    return 'supposed to return list of others in room';
  };

  return {
    get: get,
    leave: leave,
    join: join,
    messages: messages,
    list: list
  };
});
