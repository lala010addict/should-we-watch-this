var morgan = require('morgan'),
    bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path');

module.exports = function(app, express) {

  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname + '/../public')));

};