angular.module('project').controller('MainController', function($scope, $resource, $http) {

  $scope.levels = [[],[],[],[],[]];
  // Get table results
  //MITB IS605 spreadsheet loaded as default
  //$scope.spreadsheet = "1sw-dA6l-BQaQihjG-KK1yPMHZF4Nb0ApQry8RJdPiIo";
  $scope.get_summary = function(spreadsheet){
  $http({
      method: "GET",
      url: 'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec',
      headers: {
       'Content-Type': undefined
      },
      params: { "action": "get", "prodid": "i3333" },
      paramSerializer: '$httpParamSerializerJQLike'
    })
    .then(function(response) {
        // success
        $scope.summary = response;
        console.log("summary found");
      },
      function(response) { // optional
          // failed
        console.log("spreadsheet not found.");
      }
    );
  }
  $scope.get_summary();


  // Post new values to table

  var req = {
    method: 'POST',
    url: 'https://script.google.com/macros/s/AKfycbxJAdoUOARMbcwKSHkBbTdmDJuKDCZ8N2hvybF1uReLrZ7QDbkI/exec',
    headers: {
     'Content-Type': undefined
    },
    params: { "test": "test2", "ololo": "{olol2}", "same": "GOT IT1!!!!" },
    paramSerializer: '$httpParamSerializerJQLike'
  }
  $scope.post_summary = function(){
    $http(req).then(function(response){
      $scope.postResult = response;
    }, function(response){
      console.log("failed post");
    });
  }
  $scope.post_summary();
});
