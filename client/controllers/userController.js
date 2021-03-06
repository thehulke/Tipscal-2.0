(function(angular) {
  angular.module('tipCal')
    .controller('userCtrl', userCtrl);

  userCtrl.$inject =  ['$scope', 'tipCalService', '$firebaseObject', '$firebaseAuth', '$rootScope', '$stateParams', '$state', '$timeout'];

  function userCtrl($scope, tipCalService, $firebaseObject, $firebaseAuth, $rootScope, $stateParams, $state, $timeout) {

    console.log('user controller');
    var ref = tipCalService.ref();
    var syncObject = $firebaseObject(ref);
    // syncObject.$bindTo($scope, 'data');
    var auth = $firebaseAuth(ref);
    // verify and check state
    tipCalService.auth(ref)
    var authData = ref.getAuth();



    this.logout = function() {
      tipCalService.logout(ref);
    }

    this.userName = authData.facebook.displayName;
    this.goToForm = function(){
      $state.go('tipForm', {
        userId : authData.uid
      })
    }
  }
}(angular));
