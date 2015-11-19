// instantiate an angular app
var app = angular.module('app', []);
  // declare one controller for the app
app.controller('appCtrl', function($scope, $http) {
  // * scope will have the query string as a variable
  $scope.query = '';
  // * show meta data as an object (reponse from AJAX call?)
  $scope.results = [];
  // * d3 object / data set (when data is changed page is update)

  // * search function
  $scope.submit = function() {
    // - make call to AJAX factory
    $scope.results = {};
    var season = 1;
    var seasonExists = true;
    var queryString = $scope.query;
    $scope.query = '';
    var getAllSeasons = function(seasonNumber) {
    	$http({
    		//need to handle url spaces
    		method: 'GET',
        params: {t: queryString, type: 'series', season: seasonNumber},
    		url: 'http://www.omdbapi.com/?',
    	}).then(function(res) {
        console.log(res);
        if (res.data.Response === "True") {
          $scope.results = res.data;
          getAllSeasons(seasonNumber + 1);
        }
    		//run d3 function with data
    	}, function(err) {

        console.log(err);
      });
    };

    getAllSeasons(season);
  };
});

