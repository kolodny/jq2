#!/usr/bin/env node

var _ = require('lodash');

var data = '';
var stream = !process.stdin.isTTY ?
  process.stdin :
  require('fs').createReadStream(process.argv[3]);

stream.on('data', function(buffer) { data += buffer; });
stream.on('end', function() {
  var program = process.argv[2];
  var obj = JSON.parse(data);
  console.log(
    Function('$, _', 'return ' + program)(obj, _)
  );
});
