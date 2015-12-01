var mongoose = require('mongoose');

var ShowModel = new mongoose.Schema({
  title: {type: String},
  season: {type: String},
  episode: {type: String},
  plot: {type: String},
  rating: {type: String},
  votes: {type: String},
  other: {type: String}
});

module.exports = mongoose.model('Show', ShowModel);