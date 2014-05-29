
app.service('ChatRoom',['$firebase', function($firebase){
  this.currentRoom = '';
  this.messages = [];

  var initializeRoom = function(){
    this.chat = new Firebase('https://placechatarg.firebaseio.com/chat/'+ this.currentRoom);
  };

  var initializeUsers = function(){
    if (this.currentRoom === '') {return;}
    this.users = $firebase(new Firebase('https://placechatarg.firebaseio.com/users/'+ this.currentRoom));
    this.users.$on('loaded', function(){
      if (this.users.count === undefined) {
        this.users.count = 0;
        this.users.$save('count');
      }
      this.addUser();
    }.bind(this));
  };

  this.getMessages = function(){
    initializeRoom.call(this);
    initializeUsers.call(this);
    this.messages = $firebase(this.chat);
  };

  this.addUser = function(){
    ++this.users.count;
    this.users.$save('count');
  };

  this.removeUser = function(){
    --this.users.count;
    this.users.$save('count');
  };

}]);