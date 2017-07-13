var chromosomeReplacements = {
  '23': 'X',
  '24': 'Y',
  '25': 'PAR',
  '26': 'MT',
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
      genotype: split[3] + split[4],
    };
    if (chromosomeReplacements[snp.chromosome]) {
      snp.chromosome = chromosomeReplacements[snp.chromosome];
    } else {
      snp.chromosome = +snp.chromosome;
    }
    snp.genotype = snp.genotype.replace(new RegExp('0', 'g'), '?') // no-calls
    snp.genotype = snp.genotype.replace(new RegExp('D', 'g'), '-') // deletions
    return snp;
  }
};
