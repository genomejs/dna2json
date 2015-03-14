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

    if (split[3] !== '0') {
      snp.genotype = split[3];
    } else if (split[4] !== '0') {
      snp.genotype = split[4];
    }

    if (chromosomeReplacements[snp.chromosome]) {
      snp.chromosome = chromosomeReplacements[snp.chromosome];
    }
    if (snp.chromosome !== 'X' &&
      snp.chromosome !== 'Y' &&
      snp.chromosome !== 'MT') {
      snp.chromosome = +snp.chromosome;
    }
    return snp;
  }
};