var chromosomes = ['X','Y','MT'];

var stripQuotes = function(str){
  return str.replace(/"/g, '');
};

module.exports = function(split, provider) {
  var snp;

  if (provider === '23andme') {
    snp = {
      id: split[0],
      c: split[1],
      pos: parseInt(split[2], 10),
      g: split[3]
    };

    if (snp.g === '--') {
      snp.g = null;
    }

    if (chromosomes.indexOf(snp.c) === -1) {
      snp.c = parseInt(snp.c, 10);
    }
    return snp;
  }

  if (provider === 'ancestry') {
    if (split[0] === 'rsid') return; // ignore csv head

    snp = {
      id: split[0],
      c: split[1],
      pos: parseInt(split[2], 10),
      g: ''
    };

    if (split[3] !== '0') snp.g += split[3];
    if (split[4] !== '0') snp.g += split[4];

    if (snp.g === '') {
      snp.g = null;
    }

    if (chromosomes.indexOf(snp.c) === -1) {
      snp.c = parseInt(snp.c, 10);
    }

    if (snp.c === 23) snp.c = 'X';
    if (snp.c === 24) snp.c = 'Y';
    if (snp.c === 25) snp.c = 'PAR';
    return snp;
  }

  if (provider === 'familytree') {
    snp = {
      id: stripQuotes(split[0]),
      c: stripQuotes(split[1]),
      pos: parseInt(stripQuotes(split[2]), 10),
      g: stripQuotes(split[3])
    };

    if (snp.g === '--') {
      snp.g = null;
    }

    if (chromosomes.indexOf(snp.c) === -1) {
      snp.c = parseInt(snp.c, 10);
    }
    return snp;
  }

};