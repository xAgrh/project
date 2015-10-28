angular.module('tn-travel', ['ngRoute', 'ngResource'])
.config(function($routeProvider, $locationProvider, $httpProvider){
  $routeProvider
  .when('/', {
    templateUrl: "templates/main.html",
    controller: 'ToursController'
  })
  .when('/tour/:id',{
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
  .when('/admin/places',{
    templateUrl: "templates/admin/places.html",
    controller: "PlacesController"
  })
  .otherwise({
    redirectTo: "/"
  });

  $locationProvider.html5Mode(true);

  $httpProvider.defaults.headers.common = {
    "X-Parse-Application-Id": "icndALFGcSkU0g00S7SpAt7fyuaKbWzSVvwDKOdi",
    "X-Parse-REST-API-Key": "urHxXITaypxIRDZI8bsae4R1cSoqSs4akdXqbnyg"
  };
})

var allCountries = angular.fromJson(localStorage.getItem('countries')) || [];
