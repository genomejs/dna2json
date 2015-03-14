var requireDir = require('require-dir');
var path = require('path');
var providers = requireDir(path.join(__dirname, './lib/parsers'));

module.exports = {
  parse: require('./lib/parse'),
  providers: providers
};