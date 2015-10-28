angular.module('tn-travel').controller('ToursController', function($scope, $resource) {
  $scope.letterLimit = 100;
  $scope.selectFilter = {};

  function parseResults(data, headersGetter){
    data = angular.fromJson(data);
    return data.results;
  };

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults}}
  )
  $scope.tours = Tour.query();

  var Country = $resource(
    'https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults}}
  )
  $scope.countries = Country.query();

  var Place = $resource(
    'https://api.parse.com/1/classes/Place/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults}}
  )
  $scope.places = Place.query();

});
