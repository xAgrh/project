angular.module('project').controller('MainController', function($scope, $resource, $http) {
  var product =  {"prodid": "i3334"}
  // Get row by id
  var indexProducts = {
    method: "GET",
    url: 'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec',
    params: { "action": "index" }
  }

  var showProduct = {
    method: "GET",
    url: 'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec',
    params: { "action": "show", "prodid": "i3334"}
  }

  // Post new values to table
  var createProduct = {
    method: "POST",
    url: 'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec',
    headers: {
     'Content-Type': undefined
    },
    params: { "action": "create", "test": "test2", "ololo": "{olol2}", "same": "GOT IT1!!!!" },
    paramSerializer: '$httpParamSerializerJQLike'
  }

  var updateProduct = {
    method: "POST",
    url: 'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec',
    headers: {
     'Content-Type': undefined
    },
    params: { "action": "update", "prodid": "i3334", "test": "test2" },
    paramSerializer: '$httpParamSerializerJQLike'
  }

  $scope.showProducts = function(){
    $http(indexProducts).then(function(response) {
        $scope.showproducts = response;
        console.log("Product found by get response");
      }, function(response){
        console.log("Product not found by get response");
      });
  }
  $scope.showProducts();

  $scope.showProductById = function(){
    $http(showProduct).then(function(response) {
        $scope.showproduct = response;
        console.log("Product found by get response");
      }, function(response){
        console.log("Product not found by get response");
      });
  }
  $scope.showProductById();



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
