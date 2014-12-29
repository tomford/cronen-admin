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

    $scope.jobs = {};

    function jobKey(host, port) {
      return host.concat(port);
    };

    $http.get('phones/phones.json').success(function(data) {

      $scope.targets = data;

      data.map(function(url) {
        var fullUrl = "http://" + url.host + ":" + url.port + "/" + url.urlExtension;
        console.log("URL: " + fullUrl);

        var jobKey = url.host.concat(url.port);

        $scope.jobs[jobKey] = {};
        $scope.jobs[jobKey].host = url.host;
        $scope.jobs[jobKey].port = url.port;

        $scope.jobs[jobKey].jobs = {};

        $http.get(fullUrl).success(function (data, status, headers, config) {
          $scope.responses.push(data);

          var url = config.url;
          var host = config.url.match(/\/\/(.*?):/)[1];
          var port = config.url.match(/\/\/.*?:(.*?)\//)[1];
          $scope.headers.push(host.concat(port));

          var jobKey = host.concat(port);
          $scope.jobs[jobKey].jobs = data;
        })
      })
    });
}]);