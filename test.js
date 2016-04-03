var assert = require('assert');
var exec = require('child_process').exec;
var fs = require('fs');

describe('jq2', function() {

  it('can use stdin', function(done) {
    var json = JSON.stringify({a: {b: [11]}});
    exec("echo '" + json + "' | node index '$.a.b[0]'", function(err, stdout) {
      try {
        assert.equal(stdout.trim(), '11');
        done();
      } catch (e) { done(e); }
    })
  });

  describe('can use files', function(done) {
    var json = JSON.stringify({a: {b: [22]}});
    var file = './file.json';
    before(function() {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
      fs.writeFileSync(file, json);
    });
    after(function() {
      fs.unlinkSync(file);
    });
    it('and will work like stdin', function() {
      exec("node index '$.a.b[0]' " + file, function(err, stdout) {
        try {
          assert.equal(stdout.trim(), '22');
          done();
        } catch (e) { done(e); }
      });
    });
  });

  it('includes lodash', function(done) {
    var json = JSON.stringify({a: {b: ['foo']}});
    exec("echo '" + json + "' | node index '_.toUpper($.a.b[0])'", function(err, stdout) {
      try {
        assert.equal(stdout.trim(), 'FOO');
        done();
      } catch (e) { done(e); }
    })
  });

});
