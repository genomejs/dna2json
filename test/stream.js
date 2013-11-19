var dna2json = require('../');
var should = require('should');
var fs = require('fs');
var path = require('path');
require('mocha');

var fakedna = '';
fakedna += '# 23andMe\n';
fakedna += 'rs4477212 1 82154 AA\n';

var expected = {
  id: 'rs4477212',
  c: 1,
  pos: 82154,
  g: 'AA'
};

describe('dna2json', function() {

  describe('createParser()', function() {
    it('should return a stream', function(done) {
      var parser = dna2json.createParser();
      should.exist(parser);
      done();
    });

    it('should return a stream that parses SNP objects', function(done) {
      var parser = dna2json.createParser();

      parser.on('data', function(snp){
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.c);
        should.exist(snp.pos);
        should.exist(snp.g);
        snp.should.eql(expected);
        done();
      });
      parser.once('error', done);

      parser.write(fakedna);
    });
  });

});
