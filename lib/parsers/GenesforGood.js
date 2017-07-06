module.exports = {
  matches: function(lines) {
    return (lines[0].replace(/\s/g, '').indexOf('GenesforGood') !== -1 && lines[0].indexOf('unphased') !== -1);
  },
  parseLine: function(line) {
    var split = line.split('\t');
    var snp = {
      id: split[0],
      chromosome: split[1],
      genotype: split[3]
    };

    if (snp.chromosome !== 'X' &&
      snp.chromosome !== 'Y' &&
      snp.chromosome !== 'MT') {
      snp.chromosome = +snp.chromosome;
    }

    snp.genotype = snp.genotype.replace(new RegExp('-', 'g'), '?') // no-calls
    snp.genotype = snp.genotype.replace(new RegExp('D', 'g'), '-') // deletions
    return snp;
  }
};
