'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
    $scope.hello = "hello";

    $scope.responses = [];

    $http.get('phones/phones.json').success(function(allUrls) {
      $scope.targets = allUrls;
      allUrls.map(function(url) {
        var fullUrl = "http://" + url.host + ":" + url.port + "/" + url.urlExtension;
        console.log("URL: " + fullUrl);
        $http.get(fullUrl).success(function (response) {
          $scope.responses.push(response);
        })
      })
    });
}]);