'use strict';

angular.module('tvshowAppApp.auth', [
  'tvshowAppApp.constants',
  'tvshowAppApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
