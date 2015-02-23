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
    //'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'ui.bootstrap',
    //'ui.router',
    'angular-chartist'
  ])

  
  .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);