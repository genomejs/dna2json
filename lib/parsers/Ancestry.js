var chromosomeReplacements = {
  '23': 'X',
  '24': 'Y',
  '25': 'PAR'
};

module.exports = {
  matches: function(lines) {
    return lines[0].indexOf('#AncestryDNA') === 0;
  },
  parseLine: function(line) {
    if (line.indexOf('rsid') === 0) {
      return;
    }
    var split = line.split('\t');
    var snp = {
      id: split[0],
      chromosome: split[1],
    };
    if (chromosomeReplacements[snp.chromosome]) {
      snp.chromosome = chromosomeReplacements[snp.chromosome];
    }
    if (snp.chromosome !== 'X' &&
      snp.chromosome !== 'Y' &&
      snp.chromosome !== 'MT') {
      snp.chromosome = +snp.chromosome;
    }
    snp.genotype = snp.genotype.replace('0', '?') // no-calls
    snp.genotype = snp.genotype.replace('D', '-') // deletions
    return snp;
  }
};
