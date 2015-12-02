<<<<<<< HEAD:public/src/main.js
// instantiate an angular
var app = angular.module('app.main', []);
  // declare one controller for the app
app.controller('appCtrl', function($scope, $http, $routeProvider, $httpProvider) {
=======
// instantiate an angular app
var app = angular.module('app', []);
// declare one controller for the app
app.controller('appCtrl', function($scope, $http) {
>>>>>>> 1eb53e9c0d9a13b5a300a950c2076781aa329bd9:public/src/app.js
  // * scope will have the query string as a variable
  $scope.query = '';
  // * show meta data as an object (reponse from AJAX call?)
  $scope.results = [];
  // * d3 object / data set (when data is changed page is update)
  $scope.briansPie = [];
  // * search function
  $scope.submit = function() {
    // - make call to AJAX factory
    $scope.results = {};
    var season = 1;
    var seasonExists = true;
    var queryString = $scope.query;
    $scope.query = ''; 
    var getAllSeasons = function(seasonNumber) {
<<<<<<< HEAD:public/src/main.js
    	$http({
    		//need to handle url spaces
    		method: 'GET',
        params: {t: queryString, type: 'series', season: seasonNumber},
    		url: 'api/shows/show',
    	}).then(function(res) {
        console.log(res.data, 'this is the response');
        if (res.data.Response === 'True') {
=======
      $http({
        //need to handle url spaces
        method: 'GET',
        params: {
          t: queryString,
          type: 'series',
          season: seasonNumber
        },
        url: 'http://www.omdbapi.com/?',
      }).then(function(res) {
        console.log(res);

        if (res.data.Response === "False") {
          alert(res.data.Error)

        }else if
        (res.data.Response === "True") 
        {
>>>>>>> 1eb53e9c0d9a13b5a300a950c2076781aa329bd9:public/src/app.js
          $scope.results = res.data;
          $scope.briansPie.push(res.data);
          getAllSeasons(seasonNumber + 1);
        } else {
          console.log('this is brians pie', $scope.briansPie);
        }
<<<<<<< HEAD:public/src/main.js
    		//run d3 function with data
    	}, function(err) {
=======
        //run d3 function with data
      }, function(err) {

>>>>>>> 1eb53e9c0d9a13b5a300a950c2076781aa329bd9:public/src/app.js
        console.log(err);
      });
    };

    getAllSeasons(season);
  };
});
