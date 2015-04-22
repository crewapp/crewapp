'use strict';
angular.module('crewapp.makeplans', ['google.places'])
.controller('MakePlansController', function($scope){


  $scope.makePlans = function(place) {
    if (!$scope.firstPlace) {
      $scope.firstPhoto = place.photos[0].getUrl({'maxWidth': 75, 'maxHeight': 75});
      console.log($scope.firstPhoto)
      $scope.firstPlace = place;
      console.log(place);
    }
    else if (!$scope.secondPlace) {
      $scope.secondPhoto = place.photos[0].getUrl({'maxWidth': 75, 'maxHeight': 75});
      $scope.secondPlace = place;
    }
    else if ($scope.firstPlace && $scope.secondPlace) {
      console.log('finished!')
    }
  }

})
