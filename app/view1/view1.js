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
    $scope.headers = [];

    $http.get('phones/phones.json').success(function(data) {
      $scope.targets = data;
      data.map(function(url) {
        var fullUrl = "http://" + url.host + ":" + url.port + "/" + url.urlExtension;
        console.log("URL: " + fullUrl);
        $http.get(fullUrl).success(function (data, status, headers, config) {
          $scope.responses.push(data);
          var url = config.url;
          var host = config.url.match(/\/\/(.*?):/)[1];
          var port = config.url.match(/\/\/.*?:(.*?)\//)[1];
          $scope.headers.push(host.concat(port));
        })
      })
    });
}]);