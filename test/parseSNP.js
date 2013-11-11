var dna2json = require('../');
var should = require('should');
require('mocha');

describe('dna2json', function() {
  
  describe('parseSNP()', function() {

    it('should not parse a comment line', function(done) {
      var line = "# this is a comment";
      dna2json.parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.not.exist(snp);
        done();
      });
    });

    it('should parse a full SNP', function(done) {
      var line = "rs4477212 1 82154 AA";
      var expected = {
        id: "rs4477212",
        chromosome: 1,
        position: 82154,
        genotype: "AA"
      };
      dna2json.parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.chromosome);
        should.exist(snp.position);
        should.exist(snp.genotype);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a full SNP with spaces not tabs', function(done) {
      var line = "rs15842 1 948921  CC";
      var expected = {
        id: "rs15842",
        chromosome: 1,
        position: 948921,
        genotype: "CC"
      };
      dna2json.parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.chromosome);
        should.exist(snp.position);
        should.exist(snp.genotype);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a partial SNP with missing genotype', function(done) {
      var line = "rs9442398 1 1021695 --";
      var expected = {
        id: "rs9442398",
        chromosome: 1,
        position: 1021695,
        genotype: null
      };
      dna2json.parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.chromosome);
        should.exist(snp.position);
        should.not.exist(snp.genotype);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a partial SNP with missing genotype and text chromosome MT', function(done) {
      var line = "rs9442398 MT 1021695 --";
      var expected = {
        id: "rs9442398",
        chromosome: 'MT',
        position: 1021695,
        genotype: null
      };
      dna2json.parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.chromosome);
        should.exist(snp.position);
        should.not.exist(snp.genotype);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a partial SNP with missing genotype and text chromosome Y', function(done) {
      var line = "rs9442398 Y 1021695 --";
      var expected = {
        id: "rs9442398",
        chromosome: 'Y',
        position: 1021695,
        genotype: null
      };
      dna2json.parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.chromosome);
        should.exist(snp.position);
        should.not.exist(snp.genotype);
        snp.should.eql(expected);
        done();
      });
    });

    it('should parse a partial SNP with missing genotype and text chromosome X', function(done) {
      var line = "rs9442398 X 1021695 --";
      var expected = {
        id: "rs9442398",
        chromosome: 'X',
        position: 1021695,
        genotype: null
      };
      dna2json.parseSNP(line, function(err, snp){
        should.not.exist(err);
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.chromosome);
        should.exist(snp.position);
        should.not.exist(snp.genotype);
        snp.should.eql(expected);
        done();
      });
    });
  });

});
