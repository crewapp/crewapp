'use strict';
angular.module('crewapp.swipe', ['ionic.contrib.ui.tinderCards'])
.controller('SwipeController', function($scope, TDCardDelegate){

  $scope.test = 'hello';

  var cardTypes = [
      // This should contain images of Crews to join!
      // Additional prperties we could have are 'Room Name' so we can pass this on when someone swipes right
      { image: 'https://pbs.twimg.com/profile_images/546942133496995840/k7JAxvgq.jpeg' },
      { image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' },
      { image: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg' },
    ];
  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    // This is currently set to randomly add a card from the above list to the end of the list.
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    // Right now, swiping left will add a random card from the list to our list of available Crews. This could, in essence, duplicate rejected crews and add them to the end of the list.
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    // Function here to send user to the appropriate chat room based on the card swiped to.
  };
})
