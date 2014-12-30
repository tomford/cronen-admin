'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'static/view1/view1.html',
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

    $http.get("api/server").success(function(data) {

      $scope.targets = data.objects;

      data.objects.map(function(url) {
        if(url.host && url.port) {

          var statusUri = "api/status/" + url.id;
          var jobKey = url.host.concat(url.port);

          $scope.jobs[jobKey] = {};
          $scope.jobs[jobKey].host = url.host;
          $scope.jobs[jobKey].port = url.port;

          $scope.jobs[jobKey].jobs = {};

          $http.get(statusUri).success(function (data) {
            $scope.responses.push(data);

            var jobKey = data.host.concat(data.port);
            $scope.jobs[jobKey].jobs = data.jobs;
          })
        }
      })
    });
}]);