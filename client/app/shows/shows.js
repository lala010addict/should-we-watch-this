'use strict';

angular.module('tvshowAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shows', {
        url: '/shows',
        templateUrl: 'app/shows/shows.html',
        controller: 'ShowsCtrl'
      });
  });
