'use strict';

angular.module('tvshowAppApp')
  .controller('MyaccCtrl', ['$scope', 'Auth', '$http', '$state', '$timeout', '$modal', '$log', function($scope, Auth, $http, $state, $timeout, $modal, $log) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.name = $scope.getCurrentUser().name;
    $scope.userID = $scope.getCurrentUser()._id;
    $scope.shows = '';


    $scope.refresh = function() {
      $http.get('/api/users/me/shows')
        .success(function(data) {
          $scope.shows = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.refresh();

$scope.any = function  () {
if($scope.shows.length === 0){
  return true
}
}

    $scope.open = function(_show) {

      var modalInstance = $modal.open({
        controller: "ModalInstanceCtrl",
        templateUrl: 'ModalInstance.html',
        resolve: {
          show: function() {
            return _show;
          }
        }
      });

    };

    //********************** delete shows ******************

    $scope.deleteshow = function(id) {

      var r = confirm("Are you sure to delete??");
      if (r == true) {
        $http.delete('/api/shows/' + id)
          .success(function(data) {
            $scope.refresh();
            console.log('deleted')

          })
          .error(function(data) {

            console.log('Error: ' + data);
          });
      } else {
        console.log('')
      }
    }




  }]);