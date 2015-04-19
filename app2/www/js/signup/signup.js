'use strict';
angular.module('crewapp.signup', [])
.controller('SignUpController', function($scope){
  $scope.test = 'hello world';
  $scope.submit = function(e) {
    e.stopPropagation();
  };
});
