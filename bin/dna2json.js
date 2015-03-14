#!/usr/bin/env node

var dna = require('../');
var argv = require('optimist').argv;

var fs = require('fs');
var path = require('path');

var inFile = argv._[0];
var outFile = argv._[1];

if (!inFile || !outFile) {
  console.error('Missing argument');
  console.error('Usage: dna2json <input file> <output file>');
  process.exit();
}

var inPath = path.join(process.cwd(), inFile);
var outPath = path.join(process.cwd(), outFile);

console.log('Starting parser, please wait...');

var txt = fs.readFileSync(inPath, 'utf8');
dna.parse(txt, function(err, snps){
  if (err) {
    return console.error('Error parsing file:', err.message);
  }
  fs.writeFileSync(outPath, JSON.stringify(snps, null, 2));
  console.log('All done! Your file is at', outPath);
});