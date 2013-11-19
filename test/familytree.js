var dna2json = require('../');
var should = require('should');
require('mocha');

var parseSNP = dna2json.parseSNP.bind({provider:'familytree'});

describe('dna2json familytree', function() {
  
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
      var line = '"rs4477212","1","82154","AA"';
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


    it('should parse a partial SNP with missing g', function(done) {
      var line = '"rs9442398","1","1021695","--"';
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

  });

});
