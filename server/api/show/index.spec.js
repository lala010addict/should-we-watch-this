'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var showCtrlStub = {
  index: 'showCtrl.index',
  show: 'showCtrl.show',
  create: 'showCtrl.create',
  update: 'showCtrl.update',
  destroy: 'showCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var showIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './show.controller': showCtrlStub
});

describe('Show API Router:', function() {

  it('should return an express router instance', function() {
    expect(showIndex).to.equal(routerStub);
  });

  describe('GET /api/shows', function() {

    it('should route to show.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'showCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/shows/:id', function() {

    it('should route to show.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'showCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/shows', function() {

    it('should route to show.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'showCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/shows/:id', function() {

    it('should route to show.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'showCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/shows/:id', function() {

    it('should route to show.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'showCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/shows/:id', function() {

    it('should route to show.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'showCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
