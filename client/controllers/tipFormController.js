(function(angular) {
  angular.module('tipCal')
    .controller('tipForm', ['$scope', 'tipCalService', '$firebaseObject', '$firebaseAuth', '$rootScope', '$stateParams', '$state', '$timeout', tipForm]);

  function tipForm($scope, tipCalService, $firebaseObject, $firebaseAuth, $rootScope, $stateParams, $state, $timeout) {

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

  }
}(angular));
