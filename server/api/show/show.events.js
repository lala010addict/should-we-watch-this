/**
 * Show model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Show = require('./show.model');
var ShowEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ShowEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Show.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ShowEvents.emit(event + ':' + doc._id, doc);
    ShowEvents.emit(event, doc);
  }
}

module.exports = ShowEvents;
