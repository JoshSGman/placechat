
app.controller('ChatController',['$scope', '$firebase', '$state','ChatRoom', function($scope, $firebase, $state, ChatRoom){

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
      }
      var chat = new Firebase('https://placechatarg.firebaseio.com/chat/'+ ChatRoom.currentRoom);

      $scope.messages = $firebase(chat);

      $scope.messenger = function(messenger){
        return messenger === $scope.username ? 'message-you' : 'message-other';
      };
    } else {
      // user is logged out
      $state.go('login');
    }
  });

  $scope.logout = function(){
    auth.logout();
    $state.go('login');
  };

  $scope.goToPlaces = function(){
    $state.go('places');
  };



  $scope.addMessage = function(e){

    $scope.messages.$add({
      from: $scope.username,
      body: $scope.msg
    });

    $scope.msg = '';
  };



}]);