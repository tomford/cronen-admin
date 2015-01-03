'use strict';

describe('View1 controllers', function() {

  var scope, ctrl, $httpBackend;

  beforeEach(module('underscore'));
  beforeEach(module('myApp.view1'));

  beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, underscore) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    ctrl = $controller('View1Ctrl', {$scope: scope});
  }));

  it('should popular one row in jobs for a server with one job', function() {

    debugger;

    $httpBackend.expectGET('api/server').
      respond({
        objects: [
          {
            host: "host1",
            id: 4,
            port: 666
          }
        ]
      });

    $httpBackend.expectGET('api/status/4').
      respond({
        "host": "localhost",
        "port": 12347,
        "jobs": {
          "hello-job": {
            "start_time": "2014-01-01 12:30", "end_time": "2014-01-01 12:35", "error": "None"}
        }});

    console.log(scope.jobs);

    $httpBackend.flush();

    expect(Object.keys(scope.jobs).length).toBe(1);
    /*
    var expectedRow = {
      "host": "localhost",
      "port": 12347,
      "jobs": {
        "hello-job": {
          "start_time": "2014-01-01 12:30", "end_time": "2014-01-01 12:35", "error": "None"}
      }}

    expect(Object.keys(scope.jobs)[0]).toBe()*/
  });
});