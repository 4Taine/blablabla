angular.module('starter.services', [])
.factory('TrajetsProposes', function() {

  var TrajetsProposes = [{
    id:0,
    depart:'aa',
    arrive:'bb',
    date:new Date(2015, 6, 21, 12, 00, 0, 0),
    dateArrive:new Date(2015, 6, 21, 14, 00, 0, 0),
    heureDepart:43200,
    heureArrive:46800,
    prix:'10 €',
    nbPlace: 0,
    autoroute:true,
    allezRetour:false,
    passagers:[]
  },
  {
    id:1,
    depart:'Clermont Ferrand',
    arrive:'Marvejols',
    date:new Date(2015, 6, 21, 12, 00, 0, 0),
    dateArrive:new Date(2015, 6, 21, 14, 00, 0, 0),
    heureDepart:43200,
    heureArrive:46800,
    prix:'10 €',
    nbPlace:3,
    autoroute:true,
    allezRetour:false,
    passagers:[]
  }

  ];

  return {
    all: function () {
      return TrajetsProposes;
    },
    ajouterTrajet: function(depart,arrive,date,dateArrive,heureDepart,heureArrive,prix,place,enableAutoroute,enableAllezRetour){
      TrajetsProposes.push({
        id:(TrajetsProposes[TrajetsProposes.length-1].id)+1,
        depart:depart,
        arrive:arrive,
        heureDepart:heureDepart,
        heureArrive:heureArrive,
        date:date,
        dateArrive:dateArrive,
        prix:prix + " €",
        nbPlace:place,
        autoroute:enableAutoroute,
        allezRetour:enableAllezRetour,
        passagers:[]
      })
    },
    ajouterReservation: function(trajet, user){
              TrajetsProposes[TrajetsProposes.indexOf(trajet)].passagers.push(user.id);
              console.log('trajet ajouté');
              console.log(TrajetsProposes[TrajetsProposes.indexOf(trajet)].passagers);
            
        },
    getNbPlace:function(trajet){
        TrajetsProposes[TrajetsProposes.indexOf(trajet)].nbPlace;
    }
  };
})
.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}])
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
      imageSrc:"img/default_user.jpg",
      dateInscription:"2015-06-03T14:25:08.357Z",
      lastConnection:"2015-06-05T14:25:08.357Z",
      rankUser:"4",
      rankPower:"9",
      isMale: function(){
        if(this.gender == "M")
        {
          return true;
        }else{
          return false;
        }
      },
      isFemale: function(){
        if(this.gender == "F")
        {
          return true;
        }else{
          return false;
        }
      }
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
          return users[i];
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
        imageSrc:"img/default_user.jpg",
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
