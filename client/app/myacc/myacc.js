'use strict';

angular.module('tvshowAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myacc', {
        url: '/myacc',
        templateUrl: 'app/myacc/myacc.html',
        controller: 'MyaccCtrl'
      });
  });
