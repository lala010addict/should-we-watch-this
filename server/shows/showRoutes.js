var express = require('express');

var routes = function (Show) {
  var showRouter = express.Router();

  var showController = require('./showController')(Show);

  showRouter.route('/show')
    .get(showController.getData);

  return showRouter;
};


module.exports = routes;