'use strict';
angular.module('crewapp.question', [])
.controller('QuestionController', function($scope){
  $scope.question = [
    ['Tacos', 'Burgers'],
    ['Coffee', 'Tea'],
    ['Stanford', 'Cal'],
    ['Windows', 'Mac'],
    ['Five guys', 'In-n-out'],
    ['Coke', 'Pepsi']
  ];
  $scope.q1a = false;
  $scope.q1b = false;
  $scope.q2a = false;
  $scope.q2b = false;
  $scope.q3a = false;
  $scope.q3b = false;
  $scope.q4a = false;
  $scope.q4b = false;
  $scope.q5a = false;
  $scope.q5b = false;
  $scope.q6a = false;
  $scope.q6b = false;

  $scope.tq1a = function() {
    $scope.q1a = !$scope.q1a;
    $scope.q1b = false;
    check();
  };

  $scope.tq1b = function() {
    $scope.q1a = false;
    $scope.q1b = !$scope.q1b;
    check();
  };

  $scope.tq2a = function() {
    $scope.q2a = !$scope.q2a;
    $scope.q2b = false;
    check();
  };

  $scope.tq2b = function() {
    $scope.q2a = false;
    $scope.q2b = !$scope.q2b;
    check();
  };

  $scope.tq3a = function() {
    $scope.q3a = !$scope.q3a;
    $scope.q3b = false;
    check();
  };

  $scope.tq3b = function() {
    $scope.q3a = false;
    $scope.q3b = !$scope.q3b;
    check();
  };


  $scope.tq4a = function() {
    $scope.q4a = !$scope.q4a;
    $scope.q4b = false;
    check();
  };

  $scope.tq4b = function() {
    $scope.q4a = false;
    $scope.q4b = !$scope.q4b;
    check();
  };


  $scope.tq5a = function() {
    $scope.q5a = !$scope.q5a;
    $scope.q5b = false;
    check();
  };

  $scope.tq5b = function() {
    $scope.q5a = false;
    $scope.q5b = !$scope.q5b;
    check();
  };

  $scope.tq6a = function() {
    $scope.q6a = !$scope.q6a;
    $scope.q6b = false;
    check();
  };

  $scope.tq6b = function() {
    $scope.q6a = false;
    $scope.q6b = !$scope.q6b;
    check();
  };

  var check = function(){
    if(
        ($scope.q1a || $scope.q1b) &&
        ($scope.q2a || $scope.q2b) &&
        ($scope.q3a || $scope.q3b) &&
        ($scope.q4a || $scope.q4b) &&
        ($scope.q5a || $scope.q5b) &&
        ($scope.q6a || $scope.q6b)
      ){
      window.alert('done');
    }
  };
});
