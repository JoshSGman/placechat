// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('placechat', ['ionic', 'firebase']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider
    .state('login',{
      url: '/login',
      controller: 'LoginController',
      templateUrl: 'views/login.html'
    })
    .state('places', {
      url:'/places',
      controller: 'PlacesController',
      templateUrl: 'views/places.html'
    })
    .state('chat',{
      url: '/chat',
      controller: 'ChatController',
      templateUrl: 'views/chat.html'
    });

    $urlRouterProvider.otherwise('/chat');

});
