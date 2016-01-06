'use strict';

var app = require('../..');
var request = require('supertest');

var newShow;

describe('Show API:', function() {

  describe('GET /api/shows', function() {
    var shows;

    beforeEach(function(done) {
      request(app)
        .get('/api/shows')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          shows = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(shows).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/shows', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/shows')
        .send({
          name: 'New Show',
          info: 'This is the brand new show!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newShow = res.body;
          done();
        });
    });

    it('should respond with the newly created show', function() {
      expect(newShow.name).to.equal('New Show');
      expect(newShow.info).to.equal('This is the brand new show!!!');
    });

  });

  describe('GET /api/shows/:id', function() {
    var show;

    beforeEach(function(done) {
      request(app)
        .get('/api/shows/' + newShow._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          show = res.body;
          done();
        });
    });

    afterEach(function() {
      show = {};
    });

    it('should respond with the requested show', function() {
      expect(show.name).to.equal('New Show');
      expect(show.info).to.equal('This is the brand new show!!!');
    });

  });

  describe('PUT /api/shows/:id', function() {
    var updatedShow

    beforeEach(function(done) {
      request(app)
        .put('/api/shows/' + newShow._id)
        .send({
          name: 'Updated Show',
          info: 'This is the updated show!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedShow = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedShow = {};
    });

    it('should respond with the updated show', function() {
      expect(updatedShow.name).to.equal('Updated Show');
      expect(updatedShow.info).to.equal('This is the updated show!!!');
    });

  });

  describe('DELETE /api/shows/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/shows/' + newShow._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when show does not exist', function(done) {
      request(app)
        .delete('/api/shows/' + newShow._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
