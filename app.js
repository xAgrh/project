angular.module('tn-travel', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: "templates/main.html",
    controller: 'ToursController'
  })
  .when('/tour/:slug',{
    templateUrl: "templates/item.html",
    controller: 'TourController'
  })
  .when('/admin', {
    templateUrl: "templates/admin/list.html",
    controller: 'AdminToursController'
  })
  .when('/admin/countries', {
    templateUrl: "templates/admin/countries.html",
    controller: 'CountriesController'
  })
  .otherwise({
    redirectTo: "/"
  });

  $locationProvider.html5Mode(true);

})

var allTours = angular.fromJson(localStorage.getItem('tours')) || [];
var allCountries = angular.fromJson(localStorage.getItem('countries')) || [];
