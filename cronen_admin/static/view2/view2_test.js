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

  it('should popular one servers for each server returned from the server-side', function() {

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
});
