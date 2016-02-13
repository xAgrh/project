angular.module('project').controller('MainController', function($scope, $resource, $http) {

  function parseResults(data, headersGetter){
      //data = angular.fromJson(data);
      //return data.lines;
  };

  var Table = $resource(
    'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec?action=:action',
    { action: "@index" }
  )
  $scope.data = Table.get({action: "index"});

  var Line = $resource(
    'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec?action=:action',
    { action: "@index" },
    { params: {lineid: "@id"}},
    { post: {}}
  )
  $scope.line = Line.get({action: "show", lineid: "1"});

  $scope.createProductByParams = Line.post({action: "create", params: {"test": "test2", "ololo": "{olol2}", "same": "GOT IT1!!!!"}})

  // Post new values to table
  var createProduct = {
    method: "POST",
    url: 'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec',
    params: { "action": "create", "test": "test2", "ololo": "{olol2}", "same": "GOT IT1!!!!" },
  }

  var updateProduct = {
    method: "POST",
    url: 'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec',
    headers: {
     'Content-Type': undefined
    },
    params: { "action": "update", "lineid": "i3334", "columnid": "same", "value": "new" },
    paramSerializer: '$httpParamSerializerJQLike'
  }

  $scope.createProductByParams = function(){
    $http(createProduct).then(function(response) {
        $scope.postresult = response;
        console.log("posted!");
      }, function(response){
        console.log("failed post");
      });
  }
  //$scope.createProductByParams();

  $scope.updateProductById = function(){
    $http(updateProduct).then(function(response) {
        $scope.updateproduct = response;
        console.log("posted cell!");
      }, function(response){
        console.log("failed post");
      });
  }
  //$scope.updateProductById();


});
