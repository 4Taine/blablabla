angular.module('starter.services', [])

.factory('Users', function() {

  var users =[
    {
      id:0,
      firstname: "Lucas",
      lastname:"Pouchot",
      email:"lucas.pouchot@gmail.com",
      password:"0acfe33c3581db13bfae2d18a0e104d4",
      birthDate:"1993-06-18T00:00:00.000Z",
      gender:"M",
      imageSrc:"none.jpg",
      dateInscription:"2015-06-03T14:25:08.357Z",
      lastConnection:"2015-06-05T14:25:08.357Z",
      rankUser:"4",
      rankPower:"9"
    }
  ]

  return {
    tryLogin: function(email,password){
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
          return users[i].id;
        }
      }
      return null;
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
    get: function(userId) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(userId)) {
          return users[i];
        }
      }
      return null;
    }
  };
});
