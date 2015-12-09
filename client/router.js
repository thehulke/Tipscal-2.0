(function(angular) {
console.log('router');
  angular.module('tipCal')
    .config(['$stateProvider', '$urlRouterProvider', router]);

  function router($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'loginCtrl',
        controllerAs: 'login',
        templateUrl: 'client/views/tipCalTemplate.ng.html',
      })
      .state('user', {
        url: '/user/:userId',
        controller: 'userCtrl',
        controllerAs: 'user',
        templateUrl: 'client/views/userTemplate.ng.html',
      });

  }

}(angular));
