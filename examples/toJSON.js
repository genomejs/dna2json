var dna = require('../');
var fs = require('fs');
var es = require('event-stream');
var path = require('path');
var JSONStream = require('JSONStream');

var txtStream = fs.createReadStream(path.join(__dirname, 'dna.txt'));
var jsonStream = fs.createWriteStream(path.join(__dirname, "dna.json"));

txtStream
  .pipe(dna.createParser())
  .pipe(JSONStream.stringify())
  .pipe(jsonStream);