var assert = require('assert');
var fs = require('fs');
var bddDox = require('./lib');

describe('Basic functionality', function() {
  it('can provide basic results', function() {
    var contents = fs.readFileSync('./test/data/sample.js').toString();

    var ret = bddDox.parse(contents);

    assert.equal(1, ret.length);
    assert.equal('describe', ret[0].type);
    assert.equal(1, ret[0].comments.length);
    assert.ok(ret[0].comments[0].indexOf('`Model`') != -1);
    assert.equal(1, ret[0].blocks.length);
    assert.equal('it', ret[0].blocks[0].type);
    assert.equal(1, ret[0].blocks[0].comments.length);
    assert.ok(ret[0].blocks[0].code);
  });
});

describe('ES6', function() {
  it('can parse ES6 yield keywords', function() {
    var contents = fs.readFileSync('./test/data/es6_sample.js').toString();

    var ret = bddDox(contents);

    assert.equal(1, ret.length);
    assert.equal('describe', ret[0].type);
    assert.equal(0, ret[0].comments.length);
    assert.equal(1, ret[0].blocks.length);
    assert.equal('it', ret[0].blocks[0].type);
    assert.equal(1, ret[0].blocks[0].comments.length);
    assert.ok(ret[0].blocks[0].code);

    console.log(bddDox.generate(ret));
  });
});