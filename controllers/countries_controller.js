angular.module('tn-travel').controller('CountriesController', function($scope, $resource) {
  $scope.newCountry = {title: null};
  $scope.showCountry = true;

  function parseResults(data, headersGetter){
    data = angular.fromJson(data);
    return data.results;
  };

  var Country = $resource(
    'https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'},
    {
      query: {isArray: true, transformResponse: parseResults},
      update: { method:'PUT' }
    }
  )
  $scope.countries = Country.query();

  $scope.newCountry = {};
  $scope.addCountry = function(){
    var countryToServer = new Country($scope.newCountry);
    countryToServer.$save().then(
      function(country){
        var countryFromServer = angular.extend(country, $scope.newCountry);
        $scope.countries.push(countryFromServer);
        $scope.newCountry = {}
      }
    );
  };

  $scope.saveCountry = function(country){
    Country.update({objectId: country.objectId}, country);
  };

  $scope.deleteCountry = function(index, country){
    Country.delete({objectId: country.objectId});
    $scope.countries.splice(index, 1);
  };



});
