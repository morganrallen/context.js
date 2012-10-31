(function(module) {
var guid = 0;

function Context() {
  this.guid = guid++;

  this.children = {};
  this.locals = {};
  this.parent = undefined;
  this.root = this;

  return this;
};

Context.prototype = {
  define: function(v, vl) {
    this.locals[v] = vl;

    return this;
  },

  delete: function(v) {
    return this.locals[v] ? delete this.locals[v] : false;
  },

  lookup: function(v, options) {
    return this.locals[v] !== undefined ? this.locals[v] :
      this.parent === undefined ? undefined :
        options.localOnly !== true ? this.parent.lookup(v) : undefined;
  },

  pop: function() {
    return this.parent;
  },

  push: function(name) {
    var newContext = new Context;
    newContext.parent = this;
    newContext.parent.children[name] = newContext;

    return newContext;
  }
};

exports.Context = Context;
})(module && module.exports?module.exports:window ? window : {});
