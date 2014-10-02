#!/usr/bin/env node

var dna = require('../');
var argv = require('optimist').argv;

var fs = require('fs');
var es = require('event-stream');
var path = require('path');
var JSONStream = require('JSONStream');

var inFile = argv._[0];
var outFile = argv._[1];

if (!inFile || !outFile) {
  console.error('Missing argument');
  console.error('Usage: dna2json <input file> <output file>');
  process.exit();
}

console.log(inFile, outFile);

var txtStream = fs.createReadStream(path.join(process.cwd(), inFile));
var jsonStream = fs.createWriteStream(path.join(process.cwd(), outFile));

var snps = 0;
var counter = es.map(function(data, cb){
  console.log('Parsed', ++snps, 'SNPs');
  cb(null, data);
});

txtStream
  .pipe(dna.createParser())
  .pipe(counter)
  .pipe(JSONStream.stringify())
  .pipe(jsonStream);