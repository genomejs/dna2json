var first = require('first-match');
var reduce = require('lodash.reduce');
var providers = require('./parsers');

module.exports = function(dna, cb){
  if (typeof dna !== 'string') {
    throw new Error('DNA must be a string');
  }
  var lines = dna.trim().split(/\r?\n/);

  var providerName = first(Object.keys(providers), isMatch);
  if (!providerName) {
    return cb(new Error('DNA file is not supported'));
  }

  var provider = providers[providerName];
  var snps = reduce(lines, transform, {});
  cb(null, snps);

  function isMatch(providerName){
    return providers[providerName].matches(lines);
  }

  function transform(memo, line, cb){
    // ignore comments
    if (line[0] === '#') {
      return memo;
    }
    var snp = provider.parseLine(line);
    if (!snp) {
      return memo;
    }
    memo[snp.id] = snp;
    delete snp.id
    return memo;
  }
};
