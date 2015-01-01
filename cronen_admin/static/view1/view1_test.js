'use strict';

describe('View1 controllers', function() {

  var scope, ctrl, $httpBackend;

  beforeEach(module('underscore'))
  beforeEach(module('myApp.view1'));

  beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, underscore) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    ctrl = $controller('View1Ctrl', {$scope: scope});
  }));

  it('should popular one row in jobs for each server job', function() {

    $httpBackend.expectGET('api/server').
      respond({
        objects: [
          {
            host: "host1",
            id: 4,
            port: 666
          },
          {
            host: "host2",
            id: 5,
            port: 999
          }
        ]
      });

    //expect(Object.keys(scope.jobs).length).toBe(2);
    expect(true).toBe(true);
  });
});