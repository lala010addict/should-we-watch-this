var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


// mongoDB config:
var db;

//mongodb://<dbuser>:<dbpassword>@ds051960.mongolab.com:51960/heroku_nq58mlzb

if (process.env.MONGOLAB_URI) {
  mongoose.connect(process.env.MONGOLAB_URI);
} else {
  mongoose.connect('mongodb://localhost/shows');
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
//           
//  Todo:
//  fb signin
//           