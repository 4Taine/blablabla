angular.module('starter.services', [])

.factory('Users', function() {

  var users =[
    {
      id:0,
      firstname: "Lucas",
      lastname:"Pouchot",
      email:"lucas.pouchot@gmail.com",
      password:"bigpassword",
      birthDate:"1993-06-18T00:00:00.000Z",
      gender:"M",
      imageSrc:"none.jpg",
      dateInscription:"2015-06-03T14:25:08.357Z",
      lastConnection:"2015-06-05T14:25:08.357Z",
      rankUser:"4",
      rankPower:"9"
    }
  ]

  var connected = false;
  var connectedID = -1;

  return {
    tryLogin: function(email,password){
      for (var i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
          connected = true;
          connectedID=users[i].id;
          users[i].lastConnection = new Date().toJSON();
          return users[i].id;
        }
      }
      return -1;
    },
    addNewUser: function(firstname,lastname,email,password,birthDate,gender){
      users.push({
        id:(users[users.length-1].id)+1,
        firstname: firstname,
        lastname:lastname,
        email:email,
        password:password,
        birthDate:birthDate,
        gender:gender,
        imageSrc:"none.jpg",
        dateInscription:new Date().toJSON(),
        lastConnection:new Date().toJSON(),
        rankUser:"0",
        rankPower:"1"
      })
    },
    setImageToUser: function(id,imageSrc){
      var user = get(id);
      if (user != null){
        user.imageSrc = imageSrc;
      }
    },
    all: function() {
      return users;
    },
    isConnected:function(){
      return connected;
    },
    logOut: function(){
      if (connected == true){
        users[connectedID].lastConnection = new Date().toJSON();
      }
      connected = false;
    },
    get: function() {
      if (connected == true){        
        for (var i = 0; i < users.length; i++) {
          if (users[i].id == parseInt(connectedID)) {
            return users[i];
          }
        }
      }
      return null;
    }
  };
});
