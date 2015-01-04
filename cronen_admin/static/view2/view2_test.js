'use strict';

describe('myApp.view2 module', function() {

  var scope, ctrl, $httpBackend, _;

  beforeEach(module('myApp.view2'));

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    _ = underscore;
    ctrl = $controller('View2Ctrl', {$scope: scope});
  }));

  it('should popular one server entry for each server returned from the server-side', function() {

    $httpBackend.expectGET('api/server').
      respond({
        objects: [
          {
            host: "localhost",
            id: 4,
            port: 12347
          },
          {
            host: "otherhost",
            id: 5,
            port: 999
          }
        ]
      });

    $httpBackend.flush();

    expect(Object.keys(scope.servers).length).toBe(2);

    var expectedServers = [
      {
        "host": "localhost",
        "port": 12347,
        "id": 4
      },
      {
        "host": "otherhost",
        "port": 999,
        "id": 5
      }
      ];

    expect(scope.servers).toEqualData(expectedServers);
  });

  it('should send add a newly added server to the list of servers', function() {

    scope.addServer.hostname = "ahost";
    scope.addServer.port = 1234;

    $httpBackend.expectGET('api/server').respond({
      objects: []
    });

    scope.addServer.submit();

    var expectedPostbody = {
      host: "ahost",
      port: 1234
    };

    $httpBackend.expectPOST('api/server', expectedPostbody).respond(200, '');

    $httpBackend.expectGET('api/server').
      respond({
        objects: [
          {
            host: "ahost",
            id: 1,
            port: 1234
          }
        ]});

    $httpBackend.flush();

    var expectedServers = [
      {
        "host": "ahost",
        "port": 1234,
        "id": 1
      }
    ];

    expect(scope.servers).toEqualData(expectedServers);
  });
});
