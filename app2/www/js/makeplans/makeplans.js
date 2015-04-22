'use strict';
angular.module('crewapp.makeplans', ['google.places'])
.controller('MakePlansController', function($scope){

  $scope.oneClear = true;

  $scope.makePlans = function(place) {
    var photo = function() {
      if (place.photos){
        return place.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150});
      } else {
        return 'http://www.mtwomeybutchers.ie/wp-content/uploads/placeholder.gif';
      }
    }
    if (!$scope.firstPlace) {
      $scope.firstPhoto = photo();
      $scope.firstPlace = place;
    }
    else if (!$scope.secondPlace) {
      $scope.secondPhoto = photo();
      $scope.secondPlace = place;
      $scope.oneClear = false;
    }
    else if ($scope.firstPlace && $scope.secondPlace) {
      console.log('finished!')
    }
  }
})
