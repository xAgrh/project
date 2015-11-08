angular.module('tn-travel').controller('AdminToursController', function($scope, $resource) {
  $scope.showForm = false;
  $scope.showTour = true;
  $scope.newTour = { slug: null, title: null, country: null, text: null, price: null, place: null, duration: null };

  function parseResults(data, headersGetter){
    data = angular.fromJson(data);
    return data.results;
  };

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {
      query: {isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  )
  $scope.tours = Tour.query();

  var Country = $resource(
    'https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'},
    {
      query: {isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  )
  $scope.countries = Country.query();

  var Place = $resource(
    'https://api.parse.com/1/classes/Place/:objectId',
    {objectId: '@objectId'},
    {
      query: {isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  )
  $scope.places = Place.query();

  $scope.addTour = function(){
    var tourToServer = new Tour($scope.newTour);
    tourToServer.$save().then(
      function(tour){
        var tourFromServer = angular.extend(tour, $scope.newTour);
        $scope.tours.push(tourFromServer);
        $scope.newTour = {}
      }
    );
  };

  $scope.saveTour = function(tour){
    Tour.update({objectId: tour.objectId}, tour);
  };

  $scope.deleteTour = function(index, tour){
    Tour.delete({objectId: tour.objectId});
    $scope.tours.splice(index, 1);
  };

});
