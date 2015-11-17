// instantiate an angular app
var app = angular.module('app', []);
  // declare one controller for the app
app.controller('appCtrl', function($scope, appFactory) {
  // * scope will have the query string as a variable
  // * show meta data as an object (reponse from AJAX call?)
  // * d3 object / data set (when data is changed page is update)
  // * search function
    // - make call to AJAX factory
  $scope.test = 'testing';
});

// helper function / factory for AJAX
app.factory('appFactory', function($http) {
  // needs $http for AJAX functionality

});
