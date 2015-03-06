'use strict';

describe('serverView controller', function() {

  var scope, ctrl, $httpBackend, _;

  beforeEach(module('cronenAdmin.serverView'));

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
    ctrl = $controller('ServerViewCtrl', {$scope: scope});
  }));

  it('should populate one server entry for each server returned from the server-side', function() {

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

  it('should call POST when adding a new server and get the list of servers again', function() {

    scope.addServer.hostname = "aNewHost";
    scope.addServer.port = 1234;

    $httpBackend.expectGET('api/server').respond({
      objects: []
    });

    scope.addServer.submit();

    var expectedPostbody = {
      host: "aNewHost",
      port: 1234
    };

    $httpBackend.expectPOST('api/server', expectedPostbody).respond(200, '');

    $httpBackend.expectGET('api/server').
      respond({
        objects: []
      });

    $httpBackend.flush();
  });

  it('should call DELETE when a server is removed', function() {

    $httpBackend.expectGET('api/server').
      respond({
        objects: []
      });

    scope.removeServer.submit({ id: 4 });

    $httpBackend.expectDELETE('api/server/4').respond(204, '');

    $httpBackend.expectGET('api/server').
      respond({
        objects: [
          {
            host: "server2",
            id: 5,
            port: 999
          }
        ]});

    $httpBackend.flush();
  });
});
