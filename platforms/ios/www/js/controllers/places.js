
app.controller('PlacesController',['$scope', '$firebase', '$state','$http','ChatRoom', function($scope, $firebase, $state, $http, ChatRoom){
  
  var loginRef = new Firebase('https://placechatarg.firebaseio.com');
  var auth = new FirebaseSimpleLogin(loginRef, function(error, user) {
    if (error) {
      // an error occurred while attempting login
      console.log(error);
    } else if (user) {
      // user authenticated with Firebase
    } else {
      // user is logged out
      $state.go('login');
    }
  });

  $scope.logout = function(){
    auth.logout();
    $state.go('login');
  };

  var updatePlaces = function(places){
    $scope.places = places;
    $scope.$apply();
  };

  $scope.places = false;

  $scope.placesBySearch = function(input){
    $scope.places = [];
    $scope.places = false;
    var lat = $scope.latitude;
    var lon = $scope.longitude;

    var loc = new google.maps.LatLng(lat,lon);

    var map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        zoom: 15
    });

    var request = {
      location: loc,
      radius: '500',
      keyword : input,
      types: ['restaurant', 'bar', 'food', 'cafe', 'night_club']
    };

    var service = new google.maps.places.PlacesService(map);
    
    service.nearbySearch(request, function(results, status){
      results.forEach(function(val, index, collection){
        val.distance = getDistanceFromLatLonInKm($scope.latitude, $scope.longitude, val.geometry.location.k, val.geometry.location.A);
      });
      results.sort(function(a,b){
        return a.distance - b.distance;
      });
      updatePlaces(results);
      $scope.places = true;
    });

  };

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
      
      var loc = new google.maps.LatLng($scope.latitude,$scope.longitude);

      var map = new google.maps.Map(document.getElementById('map'), {
          center: loc,
          zoom: 15
      });

      var request = {
        location: loc,
        radius: '500',
        types: ['restaurant', 'bar', 'food', 'cafe', 'night_club']
      };

      var service = new google.maps.places.PlacesService(map);
      
      service.nearbySearch(request, function(results, status){
        results.forEach(function(val, index, collection){
          val.distance = getDistanceFromLatLonInKm($scope.latitude, $scope.longitude, val.geometry.location.k, val.geometry.location.A);
        });
        results.sort(function(a,b){
          return a.distance - b.distance;
        });
        updatePlaces(results);
        $scope.places = true;
      });

    });
  } else {

  }

  var getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return round(d, 2);
  };

  var round = function(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
  };

  var deg2rad = function(deg) {
    return deg * (Math.PI/180)
  };

  $scope.goToChat = function(placeName){
    ChatRoom.currentRoom = placeName;
    $state.go('chat');
  };


}]);