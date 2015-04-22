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
        $localStorage.hasOwnProperty('expires_in') === true &&
        $localStorage.expiresIn < Math.floor(Date.now()/1000)) {
      return $http.get('https://graph.facebook.com/v2.2/me', {
        params: {
          access_token: $localStorage.accessToken,
          fields: 'id,name,gender,location,picture',
          format: 'json'
        }
      }).then(function(result) {
        $localStorage.name = result.name;
        $localStorage.gender = result.gender;
        $localStorage.id = result.id;
        $localStorage.picture = result.picture.url;


        sendProfile({
          id: result.id,
          name: result.name,
          gender: result.gender,
          picture: result.picture.url
        });

        return result;
      }).catch(function(error){
        alert('Error: ' + error);
        $location.path('/');
      });
    }else {
      alert('Not signed in');
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
.factory('Sockets', function($http){

  var connect = function(){
    return 'Socket:connect needs to be defined';
  };

  var disconnect = function() {
    return 'Sockets:disconnect needs to be defined';
  };

  return {
    connect: connect,
    disconnect: disconnect
  };

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
