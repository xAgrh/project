angular.module('tn-travel').controller('AdminToursController', function($scope) {
  $scope.tours = allTours;
  $scope.showForm = false;
  $scope.showTour = true;
  $scope.newTour = {slug: null, title: null, country: null, text: null, price: null };

  $scope.addTour = function(){
    $scope.tours.push(angular.copy($scope.newTour));
    localStorage['tours'] = angular.toJson($scope.tours);
  };

  $scope.saveTour = function(){
    localStorage['tours'] = angular.toJson($scope.tours);
  };

  $scope.deleteTour = function(index){
    $scope.tours.splice(index, 1);
    localStorage['tours'] = angular.toJson($scope.tours);
  };

});
