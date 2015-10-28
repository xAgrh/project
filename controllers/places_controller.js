angular.module('tn-travel').controller('PlacesController', function($scope, $resource) {
  $scope.newPlace = {title: null};
  $scope.showPlace = true;

  function parseResults(data, headersGetter){
    data = angular.fromJson(data);
    return data.results;
  };

  var Place = $resource(
    'https://api.parse.com/1/classes/Place/:objectId',
    {objectId: '@objectId'},
    {
      query: {isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  )
  $scope.places = Place.query();

  $scope.addPlace = function(){
    var placeToServer = new Place($scope.newPlace);
    placeToServer.$save().then(
      function(place){
        var placeFromServer = angular.extend(place, $scope.newPlace);
        $scope.places.push(placeFromServer);
        $scope.newPlace = {}
      }
    );
  };

  $scope.savePlace = function(place){
    Place.update({objectId: place.objectId}, place);
  };

  $scope.deletePlace = function(index, place){
    Place.delete({objectId: place.objectId});
    $scope.places.splice(index, 1);
  };



});
