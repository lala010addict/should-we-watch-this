// instantiate an angular app
var app = angular.module('app', []);
  // declare one controller for the app
app.controller('appCtrl', function($scope, $http) {
  // * scope will have the query string as a variable
  $scope.query = '';
  // * show meta data as an object (reponse from AJAX call?)
  $scope.results = null;
  // * d3 object / data set (when data is changed page is update)

  // * search function
  $scope.submit = function(){
    // - make call to AJAX factory
  	$http({
  		//need to handle url spaces
  		method: 'GET',
  		url: 'http://www.omdbapi.com/?t=' + $scope.query,
  	}).then( function(data) { 
  		$scope.results = data;
  		//run d3 function with data
  	});
  };
});
