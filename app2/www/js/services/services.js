'use strict';
angular.module('crewapp.services', [])

.factory('Auth', function($http) {
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

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: 'http://trycrewapp.com/api/auth/signup',
      data: user
    })
    .then(function(resp){
      return resp.data;
    });
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

  return {
    login: login,
    signup: signup,
    logout: logout
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

  return {
    get: get,
    leave: leave,
    join: join,
    messages: messages
  };
});
