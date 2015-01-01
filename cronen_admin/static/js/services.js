var underscore = angular.module('underscore', []);
underscore.factory('underscore', function() {
  return window._; // assumes underscore has already been loaded on the page
});