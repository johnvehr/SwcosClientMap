'use strict';

/**
 * @ngdoc overview
 * @name swcosClientMapApp
 * @description
 * # swcosClientMapApp
 *
 * Main module of the application.
 */
angular
  .module('swcosClientMapApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
