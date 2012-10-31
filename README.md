context.js
==========

[![Build Status](https://secure.travis-ci.org/morganrallen/context.js.png)](http://travis-ci.org/morganrallen/context.js)

Maintain a scope with pushable/popable context stack

Fairly basic functionality at the moment, part of another evolving project.

Use
===
var Context = require("context").Context;

var cx = new Context;

cx.define("someVar", {
  value: 42,
  location: 0xd34db33f
});

function derpBurgers() {
  cx = cx.push();
  cx.define("someVar", {
    value: 43,
    location: 0xd34db34a
  });

  cx = cx.pop();
}
...
...
derpBurgers();


Status
======
Works for now, at least what I'm trying to accomplish. Biggest short coming is having to reassign the context instead of just calling push/pop. This will be fixed soon.
