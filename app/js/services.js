var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/phones.json', {}, {
      query: {method:'GET'}
    });
  }]);