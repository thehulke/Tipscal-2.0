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
      var ref = new Firebase('https://tips-calculator.firebaseio.com/');
      return ref;
    }

    function auth(ref) {
      var authData = ref.getAuth();
      if (authData) {

        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        var userId = authData.uid;
        return 1;

      } else {
        console.log("User is logged out");
        $state.go('login');
      }
    }

    function login(ref, auth) {
      auth.$authWithOAuthPopup("facebook").then(function(authData) {
        console.dir(authData);
        console.log("Logged in as:", authData.uid);
        var userId = authData.uid;
// Checking if user exists func, and if not, set to the DB
        function fireBaseCheckUser(ref) {
          checkIfUserExists(userId);
        }
        var USERS_LOCATION = 'https://tips-calculator.firebaseIO.com/users';

        function userExistsCallback(userId, exists, usersRef) {
          if (exists) {
            alert('user ' + authData.facebook.displayName + ' exists!');
          } else {
            // var usersRef = ref.child("users");
            usersRef.child(authData.uid).set({
              provider: authData.provider,
              name: authData.facebook.displayName
            })
          }
        }

        // Tests to see if /users/<userId> has any data.
        function checkIfUserExists(userId, ref) {
          var usersRef = new Firebase(USERS_LOCATION);
          usersRef.child(userId).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            userExistsCallback(userId, exists, usersRef);
          });
        }
        fireBaseCheckUser(ref);

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
