'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'static/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', '_', function($scope, $http, _) {
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
          $scope.jobs[jobKey].jobName = "Pending";

          $http.get(statusUri).success(function (data) {
            $scope.responses.push(data);

            var jobKey = data.host.concat(data.port);

            _.map(data.jobs, function(jobData, jobName) {
              var thisJobKey = jobKey;
              if($scope.jobs[jobKey].jobName != "Pending") {
                thisJobKey = jobKey + Math.floor(Math.random() * Number.MAX_VALUE);
              }

              $scope.jobs[thisJobKey] = {};
              $scope.jobs[thisJobKey].host = data.host;
              $scope.jobs[thisJobKey].port = data.port;
              $scope.jobs[thisJobKey].jobName = jobName;
              $scope.jobs[thisJobKey].startTime = jobData.start_time;
              $scope.jobs[thisJobKey].endTime = jobData.end_time;
              $scope.jobs[thisJobKey].status = jobData.error;
            });
          })
        }
      })
    });
}]);