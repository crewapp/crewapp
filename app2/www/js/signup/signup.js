'use strict';
angular.module('crewapp.signup', [])
.controller('SignUpController', function($scope, $window, $location, Auth){

  $scope.form = {};

  $scope.signup = function (e) {
    var username = $scope.form.user;
    var password = $scope.form.pass;

    e.stopPropagation();

    Auth.signup({
      username: username,
      password: password

    }).then(function (data) {

      if(data.response === 'success'){

        $window.localStorage.setItem('com.trycrewapp.username', username);
        $window.localStorage.setItem('com.trycrewapp.token', data.token);
        $window.localStorage.setItem('com.trycrewapp.group', data.group);

        $location.path('/question');
      }else if(data.response === 'failed'){
        switch(data.status) {
            case 'credentials not supplied':
                window.alert('Please provide a username and password');
                break;
            case 'user exists':
                window.alert('Username is taken!');
                break;
            default:
                window.alert('error occured!');
        }
      }

    }).catch(function (error) {

      console.error(error);

    });
  };
});
