(function(angular) {
  console.log('Services ready');

  angular.module('tipCal')
    .service('tipCalService', ['$firebaseAuth', '$stateParams', '$state', '$timeout', tipCalService]);

  function tipCalService($firebaseAuth, $stateParams, $state, $timeout) {
    service = {
      ref: ref,
      login: login,
      logout: logout,
      auth: auth
    };
    return service;

    function ref() {
      var ref = new Firebase('https://tips-calculator.firebaseio.com/data');
      return ref;
    }

    function auth(ref) {
      var authData = ref.getAuth();
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        var userId = authData.uid;
        $state.go('user', {
          userId: userId
        });
      } else {
        console.log("User is logged out");
        $state.go('login');
      }
    }

    function login(ref, auth) {
      auth.$authWithOAuthPopup("facebook").then(function(authData) {
        console.log("Logged in as:", authData.uid);
        var userId = authData.uid;
        $state.go('user', {
          userId: userId
        });
      }).catch(function(error) {
        console.log("Authentication failed:", error);
        $state.go('login');
      });
    }

    function logout(ref) {
      ref.unauth();
      $state.go('login');
    }
  } // End of tipCalService
}(angular));
