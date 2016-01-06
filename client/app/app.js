'use strict';

angular.module('tvshowAppApp', [
  'tvshowAppApp.auth',
  'tvshowAppApp.admin',
  'tvshowAppApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
