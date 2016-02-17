angular.module('project', ['ngRoute', 'ngResource', 'smart-table'])
.config(function($routeProvider, $locationProvider, $httpProvider){
  $routeProvider
  .when('/', {
    templateUrl: "templates/main.html",
    controller: 'MainController'
  })
  .otherwise({
    redirectTo: "/"
  });

  $locationProvider.html5Mode(true);

  //uncommenting the following line makes GET requests fail as well
  //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
})
