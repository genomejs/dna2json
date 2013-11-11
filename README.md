[![Build Status](https://travis-ci.org/genomejs/dna2json.png?branch=master)](https://travis-ci.org/genomejs/dna2json)

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

## Downloading your data

Go to [23andme Raw Data](https://www.23andme.com/you/download/) to get your dna.txt file. You can download data from all chromosomes or only specific ones - dna2json doesn't care.

## SNP

A SNP (single-nucleotide polymorphism - pronounced "snip") is a mutation in your genome. SNPs can tell you a lot about yourself (hair color, height, muscle type, allergies, response to disease, response to pharmaceuticals, heritage, etc.).

## Compatibility

This has only been tested with DNA files from 23andme. Other services may not use the same format.

## Speed

23andme genome files are one line per SNP and usually ~30MB (which is why this is streaming only)

There are a ton of SNPs (my DNA had 960614) so this will take a bit to run (especially if you are writing to disk).

## Usage

```javascript
var dna = require('dna2json');
var es = require('JSONStream');

// dna.createParser() returns a duplex stream
// input = text from your dna file
// output = SNPs as JSON
// to write to disk 
fs.createReadStream("dna.txt")
  .pipe(dna.createParser())
  .pipe(JSONStream.stringify())
  .pipe(fs.createWriteStream("dna.json"));
```

Output will look a little like this (these are my genes don't steal them):

```javascript
[
{"id":"rs10749813","chromosome":1,"position":73557945,"genotype":null},
{"id":"rs4128552","chromosome":1,"position":73560811,"genotype":"GT"},
{"id":"rs12033354","chromosome":1,"position":73573941,"genotype":"AG"},
{"id":"rs4603080","chromosome":1,"position":73579237,"genotype":"AG"},
{"id":"rs4582739","chromosome":1,"position":73602381,"genotype":"CT"},
{"id":"rs4452995","chromosome":1,"position":73613560,"genotype":"CT"}
]
```

## CLI

Install this module globally for this simple CLI.

`Usage: dna2json <input file> <output file>`

It will stream the SNPs to disk as JSON - pretty easy.

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
