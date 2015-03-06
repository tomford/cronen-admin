'use strict';

angular.module('cronenAdmin.serverView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/serverView', {
    templateUrl: 'static/serverView/serverView.html',
    controller: 'ServerViewCtrl'
  });
}])

.controller('ServerViewCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.servers = {};
    var refreshServerList = function() {

      $http.get("api/server").success(function (data) {
        $scope.servers = data.objects;
      });
    };

    $scope.addServer = {};
    $scope.addServer.hostname = '(hostname)';
    $scope.addServer.port = '(port)';
    $scope.addServer.submit = function() {

      var addServerUri = 'api/server';
      var payload = {
        host: $scope.addServer.hostname,
        port: $scope.addServer.port
      };

      console.log("POST " + addServerUri + JSON.stringify(payload));

      $http.post(addServerUri, payload).success(function (data) {
        refreshServerList();
      })};

    $scope.removeServer = {};
    $scope.removeServer.submit = function(item) {

      var removeServerUri = 'api/server/' + item.id;
      console.log("DELETE " + removeServerUri);

      $http.delete(removeServerUri).success(function (data) {
        refreshServerList();
      });
    };

    refreshServerList();
  }]);