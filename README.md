[![NPM version](https://badge.fury.io/js/dna2json.png)](http://badge.fury.io/js/dna2json)

## Information

<table>
<tr>
<td>Package</td><td>dna2json</td>
</tr>
<tr>
<td>Description</td>
<td>Formats your DNA file as JSON</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

## Terminology

### SNP

A SNP (single-nucleotide polymorphism - pronounced "snip") is a mutation in your genome. SNPs can tell you a lot about yourself (hair color, height, muscle type, allergies, response to disease, response to pharmaceuticals, heritage, etc.).

Your DNA file from any vendor will be a big list of these SNPs. Think of it like a diff against a reference human genome. Most vendors will compare your genome against [GRCh Build 37](http://www.ncbi.nlm.nih.gov/assembly/2758/)

![autosome](http://www.isogg.org/w/images/e/ed/Autosomes_diagram.jpg)

## Vendors

| Name | Supported | Price | Sample | Autosomal SNPs | Y SNPs | X SNPs | MT SNPs | Raw Data |
|------|-----------|-------|--------|----------------|--------|--------|---------|----------|
| 23andMe | Yes | 99 USD | Saliva | 967,000 | 3,089 | 26,087 | 2,737 | [Yes](https://www.23andme.com/you/download/) |
| ancestryDNA | Yes | 99 USD | Saliva | 682,549 | 885 | 17,604 | 0 | [Yes](http://ldna.ancestry.com/atFAQ.aspx#raw-3) |
| FamilyTree | Yes | 99 USD | Cheek Swab | 708,092 | 0 | 18,091 | 0 | [Yes](http://www.familytreedna.com/faq/answers.aspx?id=17#606) |

tl;dr use 23andMe they provide more data and are the cheapest

## CLI Usage

Use this if you just want to convert your data to the correct format so you can start querying your genome.

```
$ npm install dna2json -g
$ dna2json
Usage: dna2json <input file> <output file>
$ dna2json dna.txt dna.json
This will take a while...
```

## Module Usage

```javascript
var dna = require('dna2json');
var fs = require('fs');

// dna.createParser() returns a duplex stream
// input = text from your dna file
// output = SNPs as JSON
// to write to disk just pipe it to JSONStream then to fs

var txt = fs.readFileSync('dna.txt');
dna.parse(txt, function(err, snps){
  // snps = the object with your mutations
});
```

## SNP-JSON

Every vendor has their own format for your DNA. I decided to make a standard format called SNP-JSON. This library will convert custom formats to this standard.

SNP-JSON looks like this

```json
{
  "rs4477212": {
    "chromosome": 1,
    "genotype": "AA"
  },
  "rs3094315": {
    "chromosome": 1,
    "genotype": "AA"
  },
  "rs3131972": {
    "chromosome": 1,
    "genotype": "GG"
  },
  "rs12124819": {
    "chromosome": 1,
    "genotype": "AA"
  },
  "rs11240777": {
    "chromosome": 1,
    "genotype": "GG"
  },
  "rs6681049": {
    "chromosome": 1,
    "genotype": "CC"
  },
  ...
}
```

Explanation:

- The key is the RSID or vendor ID.
- Chromosome is which chromosome the data came from (1-22, X, Y, or MT).
- Genotype is the value for the RSID.

## Using your SNP-JSON

### Just Write Code™

In this example we will determine if you are immune to norovirus:

```js
var dna = require('./dna.json');

if (dna.rs601338.genotype == 'AA') {
  // congrats you are immune!
}
```

### Genosets

Once you have your data in the right format you can use the library of genosets by genomejs.

You can view a list of these [by searching npm for genoset](https://npmjs.org/search?q=genoset)

You can also publish your own tools that analyze your DNA! Here is a tool that we recommend to get you started [GQL](https://github.com/genomejs/gql)

## LICENSE

(MIT License)

Copyright (c) 2013 Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
