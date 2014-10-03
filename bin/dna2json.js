#!/usr/bin/env node

var dna = require('../');
var argv = require('optimist').argv;
var levelup = require('levelup');

var fs = require('fs');
var es = require('event-stream');
var path = require('path');

var inFile = argv._[0];
var outFile = argv._[1];

if (!inFile || !outFile) {
  console.error('Missing argument');
  console.error('Usage: dna2json <input file> <output file>');
  process.exit();
}

var db = levelup(outFile);
var txtStream = fs.createReadStream(path.join(process.cwd(), inFile));
var dbStream = db.createWriteStream({
  type: 'put',
  valueEncoding: 'json'
});

var snps = 0;
var counter = es.map(function(data, cb){
  process.stderr.clearLine();
  process.stderr.cursorTo(0);
  process.stderr.write('Parsed ' + (++snps) + ' SNPs');
  cb(null, data);
});

var convertToLevel = es.map(function(data, cb){
  var nu = {
    key: data.id,
    value: data
  };
  delete nu.value.id;
  cb(null, nu);
});

txtStream
  .pipe(dna.createParser())
  .pipe(convertToLevel)
  .pipe(counter)
  .pipe(dbStream);