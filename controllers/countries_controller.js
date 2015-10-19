angular.module('tn-travel').controller('CountriesController', function($scope) {
  $scope.countries = allCountries;
  $scope.newCountry = {title: null};
  $scope.showCountry = true;

  $scope.addCountry = function() {
    $scope.countries.push(angular.copy($scope.newCountry));
    localStorage['countries'] = angular.toJson($scope.countries);
  };

  $scope.saveCountry = function(){
    localStorage['countries'] = angular.toJson($scope.countries);
  };

  $scope.deleteCountry = function(index){
    $scope.countries.splice(index, 1);
    localStorage['countries'] = angular.toJson($scope.countries);
  };



});
