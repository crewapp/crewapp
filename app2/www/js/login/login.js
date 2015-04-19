'use strict';
angular.module('crewapp.login', [])
.controller('LoginController', function($scope, $window, $location, Auth){

  $scope.form = {};

  $scope.login = function (e) {
    var username = $scope.form.user;
    var password = $scope.form.pass;

    e.stopPropagation();
    console.log(username, password);
    Auth.login({
      username: username,
      password: password

    }).then(function (data) {

      if(data.response === 'success'){

        $window.localStorage.setItem('com.trycrewapp.username', username);
        $window.localStorage.setItem('com.trycrewapp.token', data.token);
        $window.localStorage.setItem('com.trycrewapp.group', data.group);

      }else if(data.response === 'failed'){
        switch(data.status) {
          case 'credentials not supplied':
            window.alert('Please provide a username and password');
            break;
          case 'user does not exist':
            window.alert('Invalid Credentials!');
            break;
          case 'invalid credentials':
            window.alert('Invalid Credentials!');
            break;
          default:
            window.alert('error occured!');
        }
      }
      $location.path('/chat');
    }).catch(function (error) {

      console.error(error);

    });
  };
});
