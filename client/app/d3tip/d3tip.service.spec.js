'use strict';

describe('Service: d3tip', function () {

  // load the service's module
  beforeEach(module('tvshowAppApp'));

  // instantiate service
  var d3tip;
  beforeEach(inject(function (_d3tip_) {
    d3tip = _d3tip_;
  }));

  it('should do something', function () {
    expect(!!d3tip).to.be.true;
  });

});
