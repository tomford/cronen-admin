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

    $http.get("api/server").success(function(data) {

      $scope.targets = data.objects;
      var urlKeyMapping = {};

      data.objects.map(function(url) {
        if(url.host && url.port) {

          var statusUri = "api/status/" + url.id;
          var jobKey = url.host.concat(url.port);
          urlKeyMapping[statusUri] = jobKey;

          $scope.jobs[jobKey] = {};
          $scope.jobs[jobKey].host = url.host;
          $scope.jobs[jobKey].port = url.port;
          $scope.jobs[jobKey].jobName = "Pending";

          $http.get(statusUri).success(function (data, status, headers, config) {
            $scope.responses.push(data);

            var jobKey = urlKeyMapping[config.url];

            _.map(data.jobs, function(jobData, jobName) {
              var thisJobKey = jobKey;
              if($scope.jobs[jobKey].jobName != "Pending") {
                thisJobKey = jobKey + Math.floor(Math.random() * 9007199254740991);
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
            .error(function(data, status, headers, config) {
              var jobKey = urlKeyMapping[config.url];
              $scope.jobs[jobKey].jobName = "FAILED: Status: " + status;
          });
        }
      });
    })
      .error(function(data, status) {
        $scope.jobs["only"] = {};
        $scope.jobs["only"].jobName = "ERROR: Failed to connect to API";
    });
}]);