var dna2json = require('../');
var should = require('should');
require('mocha');

var parseSNP = dna2json.parseSNP.bind({provider:'ancestry'});

describe('dna2json ancestry', function() {
  
  describe('parseSNP()', function() {

    it('should not parse a comment line', function(done) {
      var line = '# this is a comment';
      parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.not.exist(snp);
        done();
      });
    });

    it('should parse a full SNP', function(done) {
      var line = 'rs4477212 1 82154 A A';
      var expected = {
        id: 'rs4477212',
        c: 1,
        pos: 82154,
        g: 'AA'
      };
      parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.c);
        should.exist(snp.pos);
        should.exist(snp.g);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a full SNP with one allele1 observed', function(done) {
      var line = 'rs4477212 1 82154 A 0';
      var expected = {
        id: 'rs4477212',
        c: 1,
        pos: 82154,
        g: 'A'
      };
      parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.c);
        should.exist(snp.pos);
        should.exist(snp.g);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a full SNP with one allele2 observed', function(done) {
      var line = 'rs4477212 1 82154 0 A';
      var expected = {
        id: 'rs4477212',
        c: 1,
        pos: 82154,
        g: 'A'
      };
      parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.c);
        should.exist(snp.pos);
        should.exist(snp.g);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a full SNP with spaces not tabs', function(done) {
      var line = 'rs15842 1 948921  C C';
      var expected = {
        id: 'rs15842',
        c: 1,
        pos: 948921,
        g: 'CC'
      };
      parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.c);
        should.exist(snp.pos);
        should.exist(snp.g);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a partial SNP with missing g', function(done) {
      var line = 'rs9442398 1 1021695 0 0';
      var expected = {
        id: 'rs9442398',
        c: 1,
        pos: 1021695,
        g: null
      };
      parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.c);
        should.exist(snp.pos);
        should.not.exist(snp.g);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a partial SNP with missing g and text c PAR', function(done) {
      var line = 'rs9442398 25 1021695 0 0';
      var expected = {
        id: 'rs9442398',
        c: 'PAR',
        pos: 1021695,
        g: null
      };
      parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.c);
        should.exist(snp.pos);
        should.not.exist(snp.g);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a partial SNP with missing g and text c Y', function(done) {
      var line = 'rs9442398 24 1021695 0 0';
      var expected = {
        id: 'rs9442398',
        c: 'Y',
        pos: 1021695,
        g: null
      };
      parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.c);
        should.exist(snp.pos);
        should.not.exist(snp.g);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a partial SNP with missing g and text c X', function(done) {
      var line = 'rs9442398 23 1021695 0 0';
      var expected = {
        id: 'rs9442398',
        c: 'X',
        pos: 1021695,
        g: null
      };
      parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.c);
        should.exist(snp.pos);
        should.not.exist(snp.g);
        snp.should.eql(expected);
        done();
      });
    });
  });

});
