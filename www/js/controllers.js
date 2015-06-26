angular.module('starter.controllers', [])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('SearchCtrl', function($scope, TrajetsProposes, Users, $ionicPopup) {
  $scope.dep;
  $scope.arr;
  $scope.trajets = TrajetsProposes.all();
  $scope.showTrajets = true;



  $scope.rechercheTrajets = function () {
      console.log("cdfdv");
        var liste = document.getElementById("listeTraj");
        liste.style.display = "block";
  };
  $scope.reserver = function(trajet){
        
        if (Users.isConnected() == true) {
          console.log("connecté");

            if (TrajetsProposes.getNbPlace(trajet) == 0)
            {
              var alertPopup = $ionicPopup.alert({
                title: 'Reservation impossible',
                template: 'Il ne reste plus de place'
                });
            }else
            {
            TrajetsProposes.ajouterReservation(trajet,Users.get());
              var alertPopup = $ionicPopup.alert({
                title: 'Trajet réservé',
                template: 'Votre trajet a été reservé'
                });}
        }else
        {
              var alertPopup = $ionicPopup.alert({
                title: 'Reservation impossible',
                template: 'Vous devez vous connecter ou créer un compte pour pouvoir réserver'
                });
        }      
    };

    $scope.datePickerCallback = function (val) {
      if(typeof(val)==='undefined'){    
          console.log('Date not selected');
      }else{
          console.log('Current date is : ', new Date());
          console.log('Selected date is : ', val);
      }
    };

})

.controller('MyPathCtrl', function($scope) {

})

.controller('PublishCtrl', function($scope, TrajetsProposes, Users) {
  $scope.settings = {
    enableAutoroute: true,
    enableAllezRetour: false
  };

  $scope.inputDepartPublish;
  $scope.inputArrivePublish;
  $scope.inputDateDepartPublish;
  $scope.inputDateArrivePublish;
  $scope.inputTimeDepart = new Date().getHours()*3600+3600;
  $scope.inputTimeArrive = new Date().getHours()*3600+7200;

  $scope.inputPlaceDispo = 1;
  $scope.inputPrix = 10;


  $scope.Math=Math;

  $scope.prixPlus = function(){
    $scope.inputPrix = $scope.inputPrix +1;
    console.log("nouveau prix : " + $scope.inputPrix);
  }

  $scope.prixMoins = function(){
    if ($scope.inputPrix > 0){
      $scope.inputPrix = $scope.inputPrix -1;
    }    
    console.log("nouveau prix : " + $scope.inputPrix);
  }

  $scope.placePlus = function(){
    $scope.inputPlaceDispo = $scope.inputPlaceDispo +1;    
    console.log("nouveau nombre de places : " + $scope.inputPlaceDispo);
  }

  $scope.placeMoins = function(){    
    if ($scope.inputPlaceDispo > 0){
      $scope.inputPlaceDispo = $scope.inputPlaceDispo -1;
    }
    console.log("nouveau nombre de places : " + $scope.inputPlaceDispo);
  }

  $scope.publierTrajet = function(){    
    TrajetsProposes.ajouterTrajet($scope.inputDepartPublish,
                                  $scope.inputArrivePublish,
                                  $scope.inputDateDepartPublish,
                                  $scope.inputDateArrivePublish,
                                  $scope.inputTimeDepart,
                                  $scope.inputTimeArrive,
                                  $scope.inputPrix,
                                  $scope.inputPlaceDispo,
                                  $scope.settings.enableAutoroute,
                                  $scope.settings.enableAllezRetour);
    $scope.inputDepartPublish = "";
    $scope.inputArrivePublish = "";
    $scope.inputDateDepartPublish = new Date();
    $scope.inputDateArrivePublish = new Date();
    $scope.inputTimeDepart = 43200;
    $scope.inputTimeArrive = 46800;
    $scope.inputPrix = 10;
    $scope.inputPlaceDispo = 1;
    $scope.settings.enableAutoroute = true;
    $scope.settings.enableAllezRetour = false;
  }

  $scope.datePickerCallback = function (val) {
    if(typeof(val)==='undefined'){    
        console.log('Date not selected');
    }else{
        console.log('Current date is : ', new Date());
        console.log('Selected date is : ', val);
    }
  };

  $scope.slots = {format: 24, step: 15};

  $scope.timePickerCallback = function (val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      console.log('Selected time is : ', val);
    }
  };


})

.controller("AccountFormCtrl", function($scope,Users,Camera){
  $scope.showLogIn = true;
  $scope.showSignIn = false;

  $scope.inputMail;
  $scope.inputPwd;

  $scope.inputBirthDate = new Date(2000,0,1);  
  $scope.inputConfirmPwd;
  $scope.inputFirstName;
  $scope.inputLastName;
  $scope.inputGender = "M";

  $scope.connected = false;
  $scope.user = null;

  $scope.datePickerCallback = function (val) {
    if(typeof(val)==='undefined'){    
        console.log('Date not selected');
    }else{
        console.log('Current date is : ', new Date());
        console.log('Selected date is : ', val);
    }
  };

  $scope.hideForm = function() {
      $scope.showLogIn = ($scope.showLogIn == false)?true:false;
      $scope.showSignIn = ($scope.showSignIn == false)?true:false;
  };
  $scope.logIn = function(){
    $scope.user = Users.tryLogin($scope.inputMail,$scope.inputPwd);
    if(Users.isConnected() == true){
      console.log("connection reussie");
      $scope.connected = true;
      $scope.closeModal();
    } else {
      $scope.inputPwd = "";
    }
  }

  $scope.signIn = function(){
    if( $scope.inputPwd == $scope.inputConfirmPwd)
    {
      console.log("insertion");
      Users.addNewUser($scope.inputFirstName,$scope.inputLastName,$scope.inputMail,$scope.inputPwd,$scope.inputBirthDate,$scope.inputGender)
    }
    $scope.logIn();
  }

  $scope.logOut = function(){
    Users.logOut();
    $scope.connected = false;
    $scope.user = null;
  }

  /********* Cordova camera *************/
    $scope.getPhoto = function() {
      console.log('Getting camera');
      Camera.getPicture({
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
      }).then(function(imageURI) {
        console.log(imageURI);
        user.imageSrc = imageURI;
      }, function(err) {
        console.err(err);
      });
      /*
      navigator.camera.getPicture(function(imageURI) {
        console.log(imageURI);
      }, function(err) {
      }, { 
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
      });
      */
    }
  /***********************/
})

.controller('AccountCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/account.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});