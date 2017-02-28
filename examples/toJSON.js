var dna = require('../');
var fs = require('fs');
var path = require('path');

var txt = fs.readFileSync(path.join(__dirname, 'dna.txt'), 'utf-8');

dna.parse(txt, function(err, snps){
  fs.writeFileSync(path.join(__dirname, 'dna.json'), JSON.stringify(snps));
});