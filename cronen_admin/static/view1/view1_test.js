'use strict';

describe('View1 controllers', function() {

  var scope, ctrl, $httpBackend, _;

  beforeEach(module('underscore'));
  beforeEach(module('myApp.view1'));

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, underscore) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    _ = underscore;
    ctrl = $controller('View1Ctrl', {$scope: scope});
  }));

  it('should populate one row in jobs for a server with one job', function() {

    $httpBackend.expectGET('api/server').
      respond({
        objects: [
          {
            host: "localhost",
            id: 4,
            port: 12347
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

    $httpBackend.flush();

    expect(Object.keys(scope.jobs).length).toBe(1);

    var expectedRow = {
      "host": "localhost",
      "port": 12347,
      "jobName": "hello-job",
      "startTime": "2014-01-01 12:30",
      "endTime": "2014-01-01 12:35",
      "status": "None"};

    expect(findJobs("hello-job")[0]).toEqualData(expectedRow);
  });

  function findJobs(jobName) {
    return _.filter(scope.jobs, function (job) { return job.jobName == jobName });
  }

  it('should populate two rows in jobs for a server with two jobs', function() {

    $httpBackend.expectGET('api/server').
      respond({
        objects: [
          {
            host: "localhost",
            id: 4,
            port: 12348
          }
        ]
      });

    $httpBackend.expectGET('api/status/4').
      respond({
        "host": "localhost",
        "port": 12348,
        "jobs": {
          "hello-job": {
            "start_time": "2014-01-01 12:30", "end_time": "2014-01-01 12:35", "error": "None"},
          "goodbye-job": {
            "start_time": "2014-02-02 07:30", "end_time": "2014-02-02 09:35", "error": "Broken"}
        }});

    $httpBackend.flush();

    expect(Object.keys(scope.jobs).length).toBe(2);

    var expectedHelloRow = {
      "host": "localhost",
      "port": 12348,
      "jobName": "hello-job",
      "startTime": "2014-01-01 12:30",
      "endTime": "2014-01-01 12:35",
      "status": "None"};

    var expectedGoodbyeRow = {
      "host": "localhost",
      "port": 12348,
      "jobName": "goodbye-job",
      "startTime": "2014-02-02 07:30",
      "endTime": "2014-02-02 09:35",
      "status": "Broken"};

    var helloJob = findJobs("hello-job")[0];
    var goodbyeJob = findJobs("goodbye-job")[0];

    console.log(goodbyeJob);

    expect(helloJob).toEqualData(expectedHelloRow);
    expect(goodbyeJob).toEqualData(expectedGoodbyeRow);
  });

  it('should populate two rows in jobs for two servers each with one job', function() {

    $httpBackend.expectGET('api/server').
      respond({
        objects: [
          {
            host: "localhost",
            id: 4,
            port: 12348
          },
          {
            host: "otherhost",
            id: 5,
            port: 667
          }
        ]
      });

    $httpBackend.expectGET('api/status/4').
      respond({
        "host": "localhost",
        "port": 12348,
        "jobs": {
          "hello-job": {
            "start_time": "2014-01-01 12:30", "end_time": "2014-01-01 12:35", "error": "None"}
        }});

    $httpBackend.expectGET('api/status/5').
      respond({
        "host": "otherhost",
        "port": 667,
        "jobs": {
          "goodbye-job": {
            "start_time": "2016-06-06 16:30", "end_time": "2016-06-08 17:35", "error": "Broken"}
        }});

    $httpBackend.flush();

    expect(Object.keys(scope.jobs).length).toBe(2);

    var expectedHelloRow = {
      "host": "localhost",
      "port": 12348,
      "jobName": "hello-job",
      "startTime": "2014-01-01 12:30",
      "endTime": "2014-01-01 12:35",
      "status": "None"};

    var expectedGoodbyeRow = {
      "host": "otherhost",
      "port": 667,
      "jobName": "goodbye-job",
      "startTime": "2016-06-06 16:30",
      "endTime": "2016-06-08 17:35",
      "status": "Broken"};

    var helloJob = findJobs("hello-job")[0];
    var goodbyeJob = findJobs("goodbye-job")[0];
    
    expect(helloJob).toEqualData(expectedHelloRow);
    expect(goodbyeJob).toEqualData(expectedGoodbyeRow);
  });
});