'use strict';

describe('Directive: graph', function () {

  // load the directive's module and view
  beforeEach(module('tvshowAppApp'));
  beforeEach(module('app/graph/graph.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<graph></graph>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the graph directive');
  }));
});
