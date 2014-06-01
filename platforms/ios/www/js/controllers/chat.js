
app.controller('ChatController',[
  '$scope', 
  '$firebase', 
  '$state',
  '$ionicScrollDelegate', 
  'ChatRoom', 
  function($scope, $firebase, $state, $ionicScrollDelegate, ChatRoom){

    // Initial authentication before going into page:
    var loginRef = new Firebase('https://placechatarg.firebaseio.com');
    var auth = new FirebaseSimpleLogin(loginRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase
        $scope.username = user.displayName;
        if (ChatRoom.currentRoom === '') {
          $state.go('places');
        } else {
          $scope.messages = ChatRoom.messages;
          $scope.messages.$on('loaded', function(){
            $ionicScrollDelegate.scrollBottom();
          });
        }

        $scope.messenger = function(messenger){
          return messenger === $scope.username ? 'message-you' : 'message-other';
        };

        setTimeout(function(){
          $ionicScrollDelegate.scrollBottom();
        }, 100);

      } else {
        // user is logged out
        $state.go('login');
      }
    });

    $scope.logout = function(){
      auth.logout();
      ChatRoom.removeUser();
      $state.go('login');
    };

    $scope.goToPlaces = function(){
      ChatRoom.removeUser();
      $state.go('places');
    };

    $scope.addMessage = function(e){
      $scope.messages.$add({
        from: $scope.username,
        body: $scope.msg
      });
      $ionicScrollDelegate.scrollBottom(true);
      $scope.msg = '';
    };

}]);