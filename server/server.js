var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


// mongoDB config:
var db;

if (process.env.ENV === "dev") {
  mongoose.connect('mongodb://localhost/howzey_dev');
} else {
  mongoose.connect('mongodb://localhost/howzey_deploy');
}
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function(){
  console.log('MonogDB connection is alive and open!');
  startServer();
});

var app = express();
require('./middleware.js')(app, express);

function startServer() {
  var server = app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });  
}

// server --> middleware ---> routes --> controller
//           /// models---^