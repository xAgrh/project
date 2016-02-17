angular.module('project').controller('MainController', function($scope, $resource, $http) {

  function parseResults(data, headersGetter){
      data = angular.fromJson(data);
      var lines = []
      for (var x in data.list) {
        lines.push(data.list[x])
      }
      return lines;
  };

  var Table = $resource(
    'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec?action=:action',
    { action: "@action" },
    { get: { isArray: true, transformResponse: parseResults },
      getHeaders: { method: 'GET', isArray: true }
    }
  )
  $scope.headers = Table.getHeaders({ action: 'headings' });
  $scope.data = Table.get({ action: 'index' });

  // Original data row+columns real numbs (isArray: false)
  //  {"list":{
  //      "2":{"1":"i3334","2":"test2","3":"GOT IT1!!!!","4":"{olol2}","5":"","6":"","7":"","8":"","9":"","10":"","11":"newvalue","12":""},
  //      "3":{"1":"i3335","2":"test2","3":"new","4":"newvalue","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"i3334"}}}
  // Transform data (isArray: true, transformResponse: parseResults)
  //  [
  //     {"1":"i3334","2":"test2","3":"GOT IT1!!!!","4":"{olol2}","5":"","6":"","7":"","8":"","9":"","10":"","11":"newvalue","12":""},
  //     {"1":"i3335","2":"test2","3":"new","4":"newvalue","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"i3334"}]
  //


  var Line = $resource(
    'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec?action=:action',
    { action: '@action' }, //parameters default
    {
      get: {
        method: "GET",
        params: { lineid: '@id' }
      },
      save: {
        method: 'POST',
        params: { action: "create" }
      }
    });

  $scope.line = Line.get({action: "show", lineid: "2"});

  $scope.newLine = {};
  $scope.addLine = function(){
    var lineToServer = new Line($scope.newLine);

    lineToServer.$save().then(
      function(line){
        console.log(line);
        var lineFromServer = angular.extend(line, $scope.newLine);
        console.log(lineFromServer);
        $scope.data.push(lineFromServer);
      //  $scope.newLine = {}
      }
    );
  }
  //$scope.createLineByParams = Line.post({action: "create", params: {"test": "test2", "ololo": "{olol2}", "same": "GOT IT1!!!!"}})

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


  //$scope.rowCollection = $scope.list;

});
