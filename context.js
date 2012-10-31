(function(module) {
var guid = 0;

function Context() {
  this.guid = guid++;

  this.locals = {};
  this.parent = undefined;
  this.root = this;

  this.children = {};

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

  get: function(v) {
    return (this.lookup(v) || {locals:{}}).locals[v];
  },

  lookup: function(v, options) {
    options = options || {};
    return this.locals[v] !== undefined ? this :
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
