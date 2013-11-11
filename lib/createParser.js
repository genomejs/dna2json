var es = require('event-stream');
var parseSNP = require('./parseSNP');

module.exports = function(){
  return es.pipeline(es.split(), es.map(parseSNP));
};