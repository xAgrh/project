angular.module('tn-travel').controller('ToursController', function($scope) {
  $scope.tours = allTours;
  $scope.countries = allCountries;
  $scope.letterLimit = 100;
  $scope.selectfilter = {};
});
