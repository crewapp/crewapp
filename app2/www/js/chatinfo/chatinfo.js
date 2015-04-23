'use strict';
angular.module('crewapp.chatinfo', [])
.controller('ChatInfoController', function($scope, plansFactory){
  $scope.test = 'hello';
    $scope.bothEntered = true;

    $scope.plans = plansFactory;

    $scope.makePlans = function(place) {
      var photo = function() {
        if (!!place.photos){
          return place.photos[0].getUgrl({'maxWidth': 150, 'maxHeight': 150});
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
        console.log(place);
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
      console.log($scope.one);
      $scope.plans.two = $scope.two;
      console.log($scope.two);
    }
  });
