angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope) {})

.controller('MyPathCtrl', function($scope) {

})

.controller('PublishCtrl', function($scope) {
  $scope.settings = {
    enableAutoroute: true,
    enableAllezRetour: false
  };

  $scope.inputDepart;
  $scope.inputArrive;
  $scope.inputDateDepart;
  $scope.inputDateArrive;
  $scope.inputTimeDepart = new Date().getHours()*3600+3600;
  $scope.inputTimeArrive = new Date().getHours()*3600+7200;

  $scope.Math=Math;

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

.controller("AccountFormCtrl", function($scope,Users){
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
    Users.tryLogin($scope.inputMail,$scope.inputPwd);
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
  }

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