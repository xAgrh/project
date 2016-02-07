angular.module('project', ['ngRoute', 'ngResource'])
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

})
