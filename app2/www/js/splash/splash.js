'use strict';
angular.module('crewapp.splash', [])
.controller('SplashController', function($scope, Auth){
    // will execute when device is ready, or immediately if the device is already ready.
  // });

  $scope.fbLogin = function(){
    Auth.fbLogin();
  };
});
