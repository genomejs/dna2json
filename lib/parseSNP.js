var createSNP = require('./createSNP');

module.exports = function(line, cb) {
  if (!this.provider) {
    if (line.indexOf('23andMe') !== -1) {
      this.provider = '23andme';
      return cb();
    }

    if (line.indexOf('#AncestryDNA') !== -1) {
      this.provider = 'ancestry';
      return cb();
    }

    if (line.indexOf('RSID,') !== -1) {
      this.provider = 'familytree';
      return cb();
    }
    return cb(); // dont parse anything until we identify the file
  }

  if (!line) return cb(); // what?
  if (line[0] === '#') return cb(); // ignore comments

  var split = line.split(/,|\s+/g);
  var snp = createSNP(split, this.provider);
  if (!snp) return cb(); // provider-specific ignore line

  cb(null, snp);
};