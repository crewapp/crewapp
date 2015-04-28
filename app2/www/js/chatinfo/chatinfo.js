'use strict';
angular.module('crewapp.chatinfo', ['google.places'])
.controller('ChatInfoController', function($scope, $localStorage, $location, plansFactory, Sockets){
    $scope.test = 'hello';
    $scope.bothEntered = true;

    $scope.plans = plansFactory;


    $scope.makePlans = function(place) {
      if (!place) {
        alert('Please enter a place!');
      };

      var photo = function() {
        if (!!place.photos){
          return place.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150});
        } else {
          return 'http://www.mtwomeybutchers.ie/wp-content/uploads/placeholder.gif';
        }
      }
      if (!$scope.one) {
        $scope.one = {};
        $scope.one.photo = photo();
        $scope.one.name = place.name;
        $scope.one.address = place.formatted_address
        $scope.one.numVotes = 0;
      }
      else if (!$scope.secondPlace) {
        $scope.two = {};
        $scope.two.photo = photo();
        $scope.two.name = place.name;
        $scope.two.address = place.formatted_address
        $scope.two.numVotes = 0;
        $scope.bothEntered = false;
      }
    }

    $scope.submitPlans = function() {
      $scope.plans.one = $scope.one;
      $scope.plans.two = $scope.two;
      
      var temp = $localStorage.name || 'anon';
      $scope.name = temp.split(' ')[0] || 'anon';

      var poll = {
        'event1': $scope.plans.one,
        'event2': $scope.plans.two,
        'name': $scope.name,
        'picture': $localStorage.picture
      };
      Sockets.emit('poll', poll);
      $scope.one = undefined;
      $scope.two = undefined;
      $location.path('/chat');
    }


  });
