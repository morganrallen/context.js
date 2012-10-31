var assert = require("assert");

/*
process.on("uncaughtException", function(e) {
  console.log("FAILED!");
  console.log(e);
});
*/

var Context = require("../context").Context
var context = new Context;

var x = 1;
context.define("x", x);
assert.equal(x, context.lookup("x"));

function sub1() {
  context = context.push('sub1');

  var y = 2;
  context.define("y", y);
  assert.equal(y, context.lookup("y"));

  assert.equal(x, context.lookup("x", x));

  // localOnly is mostly just to verify push was done correctly
  // and by correctly I mean the way I don't like
  // I'd prefer just calling push rather that requiring the assignment...
  assert.equal(undefined, context.lookup("x", {
    localOnly: true
  }));

  context = context.pop();
}

function sub2() {
  context = context.push('sub2');

  var z = 3;
  context.define("z", z);
  assert.equal(z, context.lookup("z"));

  context = context.pop();
}

sub2();
assert.equal(undefined, context.lookup("y"));
sub1();
assert.equal(undefined, context.lookup("y"));
sub2();
console.log(context);

console.log("PASSED!");
