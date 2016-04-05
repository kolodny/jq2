#!/usr/bin/env node

var fs = require('fs');
var _ = require('lodash');

if (process.argv.length < 3 || process.argv[2] === '-h' || process.argv[2] === '--help') {
  console.log(
    fs.readFileSync(__dirname + '/usage.txt').toString()
  )
  process.exit(process.argv.length < 3 ? 1 : 0);
}

var data = '';
var stream = process.argv.length > 3 ?
  fs.createReadStream(process.argv[3]) :
  process.stdin;

stream.on('data', function(buffer) { data += buffer; });
stream.on('end', function() {
  var program = process.argv[2];
  var obj = JSON.parse(data);
  console.log(
    Function('$, _', 'return ' + program)(obj, _)
  );
});
