'use strict';

describe('Controller: ShowsCtrl', function () {

  // load the controller's module
  beforeEach(module('tvshowAppApp'));

  var ShowsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowsCtrl = $controller('ShowsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
