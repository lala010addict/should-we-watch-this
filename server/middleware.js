var morgan = require('morgan'),
    bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path');

module.exports = function(app, express) {

  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname + '/../public')));

  var User = require('./users/userModel');
  userRouter = require('./users/userRoutes')(User);
  app.use('/api/users', userRouter);

  var Show = require('./shows/showModel');
  showRouter = require('./shows/showRoutes')(Show);
  app.use('/api/shows', showRouter);

};

