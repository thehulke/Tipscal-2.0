(function(angular) {
  angular.module('tipCal')
    .controller('loginCtrl', ['$scope', 'tipCalService', '$firebaseObject', '$firebaseAuth', '$rootScope', '$stateParams', '$state', '$timeout', loginCtrl]);

  function loginCtrl($scope, tipCalService, $firebaseObject, $firebaseAuth, $rootScope, $stateParams, $state, $timeout) {
    console.log('loginCtrl');
    var ref = tipCalService.ref();
    var syncObject = $firebaseObject(ref);
    // syncObject.$bindTo($scope, 'data');
    var auth = $firebaseAuth(ref);

    // verify and check state
    tipCalService.auth(ref)

    this.login = function() {
      tipCalService.login(ref, auth)
    };
    this.logout = function() {
      tipCalService.logout(ref);
    }

  } // End of controller

}(angular));
// TODO: 1. refactor all log params to services.  2.
