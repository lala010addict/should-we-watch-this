/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/shows              ->  index
 * POST    /api/shows              ->  create
 * GET     /api/shows/:id          ->  show
 * PUT     /api/shows/:id          ->  update
 * DELETE  /api/shows/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Show = require('./show.model');

var request = require('superagent');


exports.getData = function(req, res) {
  var url = 'http://www.omdbapi.com/?';
  var query = req.query || '';

  var getShow = function(callback) {
    var num = 1;
    return request
      .get(url)
      // .query({season: num})
      .query(query)
      //query {t: queryString, type: 'series', season: seasonNumber}
      .end(function(err, results) {
        if (err) console.log(err);
        console.log(results.body);
        callback(results.body);
      });
  };

  getShow(function(data) {
  //  console.log("data: " , data);
    // if True, or more seasons 
    // get(show())
    res.json(data);
  });
};



function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Shows
exports.index = function(req, res) {
  if (req.baseUrl === '/api/users/me/shows') {
    Show.find({
        user_id: req.user_id
      })
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  } else {
    Show.findAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));

  }
};

// Gets a single Show from the DB
exports.show = function(req, res) {
  Show.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Show in the DB
exports.create = function(req, res) {
  Show.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Show in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Show.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Show from the DB
exports.destroy = function(req, res) {
  Show.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
