'use strict';

angular.module('tvshowAppApp')
  .controller('ModalInstanceCtrl',['$scope', '$modalInstance', 'show', function ($scope, $modalInstance, show) {
    $scope.show = show;
  }]);