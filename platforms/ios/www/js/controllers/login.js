
app.controller('LoginController',[
  '$scope', 
  '$firebase',
  '$state', 
  function($scope, $firebase, $state){
    var auth;
    
    document.addEventListener('deviceready', function(){
      var loginRef = new Firebase('https://placechatarg.firebaseio.com');
      auth = new FirebaseSimpleLogin(loginRef, function(error, user) {
        if (error) {
          // an error occurred while attempting login
          console.log(error);
        } else if (user) {
          // user authenticated with Firebase
          $state.go('places');
        } else {
          // user is logged out
          $state.go('login');
        }
      });
    });
    
    $scope.login = function(){
      if (auth) {
        auth.login('facebook');
      }
    };

}]);