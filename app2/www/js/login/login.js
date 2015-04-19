'use strict';
angular.module('crewapp.login', [])
.controller('LoginController', function($scope){
  $scope.test = 'hello world';
  $scope.submit = function(e) {
    e.stopPropagation();
  };
});
