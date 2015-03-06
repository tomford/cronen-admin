'use strict';

// Declare app level module which depends on views, and components
angular.module('cronenAdmin', [
  'ngRoute',
  'cronenAdmin.jobView',
  'cronenAdmin.serverView',
  'cronenAdmin.version',
  'underscore'
])
  .config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .otherwise({redirectTo: '/jobView'});
}]);
