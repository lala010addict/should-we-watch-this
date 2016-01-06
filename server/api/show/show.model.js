'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ShowSchema = new Schema({
  Title: String,
  Year: String,
  Rated: String,
  Released: String,
  Runtime: String,
  Actors: String,
  Awards: String,
  Country: String,
  Director: String,
  Genre: String,
  Language: String,
  Metascore: String,
  Plot: String,
  Poster: String,
  Rated: String,
  Released: String,
  Response: String,
  Runtime: String,
  Type: String,
  Writer: String,
  Year: String,
  imdbID: String,
  imdbRating: String,
  imdbVotes: String,
  active: Boolean,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Show', ShowSchema);
