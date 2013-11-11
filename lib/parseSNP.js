var chromosomes = ["X","Y","MT"];

module.exports = function(line, cb) {
  if (line[0] === '#') return cb();
  var split = line.split(/\s+/g);
  
  var snp = {
    id: split[0],
    chromosome: split[1],
    position: parseInt(split[2]),
    genotype: split[3]
  };

  if (snp.genotype === '--') {
    snp.genotype = null;
  }

  if (chromosomes.indexOf(snp.chromosome) === -1) {
    snp.chromosome = parseInt(snp.chromosome);
  }
  cb(null, snp);
};