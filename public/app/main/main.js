// instantiate an angular
var app = angular.module('app.main', []);
// declare one controller for the app
app.controller('appCtrl', function($scope, $http) {
  // * scope will have the query string as a variable
  $scope.query = '';
  $scope.queryId = [];

  $scope.watchlist = [];

  $scope.click = function(x) {
    //  console.log($scope.query);
    $scope.watchlist.push($scope.results.Title)
      // console.log($scope.watchlist);
  }




    // $scope.getPoster = function(title) {
    //   $http({
    //     //need to handle url spaces
    //     method: 'GET',
    //     params: {
    //       t: queryString
    //     },
    //     url: 'api/shows/show',
    //   }).then(function(res) {
    //     console.log(res.data, 'this is the response');
    //     if (res.data.Response === 'True') {
    //       $scope.results = res.data;
    //       $scope.briansPie.push(res.data);
    //       getAllSeasons(seasonNumber + 1);
    //     } else {
    //       console.log('this is brians pie', $scope.briansPie);
    //     }
    //     //run d3 function with data
    //   }, function(err) {
    //     console.log(err);
    //   });
    // }


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
      $http({
        //need to handle url spaces
        method: 'GET',
        params: {
          t: queryString,
          type: 'series',
          season: seasonNumber
        },
        url: 'api/shows/show',
      }).then(function(res) {
        console.log(res.data, 'this is the response');
        if (res.data.Response === 'True') {
          $scope.results = res.data;
          $scope.briansPie.push(res.data);
          getAllSeasons(seasonNumber + 1);
        } else {
          console.log('this is brians pie', $scope.briansPie);
        }
        //run d3 function with data
      }, function(err) {
        console.log(err);
      });
    };

    getAllSeasons(season);
  };
});
