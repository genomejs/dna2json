var chromosomes = ["X","Y","MT"];

module.exports = function(line, cb) {
  if (line[0] === '#') return cb();
  var split = line.split(/\s+/g);
  
  var snp = {
    id: split[0],
    c: split[1],
    pos: parseInt(split[2]),
    g: split[3]
  };

  if (snp.g === '--') {
    snp.g = null;
  }

  if (chromosomes.indexOf(snp.c) === -1) {
    snp.c = parseInt(snp.c);
  }
  cb(null, snp);
};