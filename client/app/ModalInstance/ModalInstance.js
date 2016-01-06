'use strict';

angular.module('tvshowAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ModalInstance', {
        url: '/ModalInstance',
        templateUrl: 'app/ModalInstance/ModalInstance.html',
        controller: 'ModalInstanceCtrl'
      });
  });
