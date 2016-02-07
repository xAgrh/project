angular.module('project').controller('MainController', function($scope, $resource, $http) {

  $scope.levels = [[],[],[],[],[]];
  // Get table results
  //MITB IS605 spreadsheet loaded as default
  $scope.spreadsheet = "1LnbUl_4i4iI6ajWIGJM01HrC5ZV-rkJPwhZRTuG7s1Q";
  $scope.get_summary = function(spreadsheet){
  $http({
      url: 'https://spreadsheets.google.com/feeds/list/'+spreadsheet+'/od6/public/values?alt=json',
      method: "GET"
    })
    .then(function(response) {
        // success
        $scope.summary = response;

        console.log("summary found");
        //load the unknown list with those returned.
        $scope.levels = [[],[],[],[],[]];

        for (i = 0; i < $scope.summary.data.feed.entry.length; i++) {
            $scope.levels[0].push($scope.summary.data.feed.entry[i]);
        }
      },
      function(response) { // optional
          // failed
        console.log("spreadsheet not found.");
      }
    );
  }
  $scope.get_summary($scope.spreadsheet);


  // Post new values to table

  var req = {
    method: 'POST',
    url: 'https://script.google.com/macros/s/AKfycby42KmqWfU8p3lkVUjkqK4Lj95SMlCt0LfMd9izi9H-RFotv_A/exec',
    headers: {
     'Content-Type': undefined
    },
    params: { "test": 'test', "ololo": '{ololo}', "same": "GOT IT!!!!" },
    paramSerializer: '$httpParamSerializerJQLike',
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
