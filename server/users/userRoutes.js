var express = require('express');

var routes = function(User) {
  var userRouter = express.Router();

  var userController = require('./userController')(User);
  userRouter.route('/signin')
    .post(userController.signin);

  userRouter.route('/signup')
    .post(userController.signup);

  userRouter.route('/signedin')
    .get(userController.checkAuth);

  return userRouter;
};


module.exports = routes;