/**
 * @author <a href="mailto:morganrallen@gmail.com">Morgan 'ARR!' Allen</a>
 * @decsripton Maintain a scope with pushable/popable context stack
 * @function
 */
var guid = 0;

/**
 * Create a new Context
 * @class New Context or Subcontext
 */
function Context() {
  this.guid = guid++;

  this.locals = {};
  this.parent = undefined;
  this.root = this;

  this.children = {};

  return this;
};

Context.prototype = {
  /**
   * Define a new variable in current Scope
   * @param {String} v Name of variable
   * @param vl Value of variable. Can be anything.
   * @returns {Context} Current Context
   */
  define: function(v, vl) {
    this.locals[v] = vl;

    return this;
  },

  /**
   * Do NOT Use. Not to be trusted.
   * @param {String} v Variable to be deleted
   * @returns {True|False} Based on success of deletion
   */
  delete: function(v) {
    return this.locals[v] ? delete this.locals[v] : false;
  },

  /**
   * Get variable VALUE from nearest Context up the stack
   * @param {String} v Name of variable to get value of.
   * @param {Object} options Optional params for current get
   * @param options.localOnly Do not climb the stack if the value isn't found in current Context
   * @returns Value found in Context or {Undefined}
   */
  get: function(v, options) {
    return (this.lookup(v, options) || {locals:{}}).locals[v];
  },

  /**
   * Returns {Context} containing variable name OR global
   * @param {String} v Name of variable to get {Context} of.
   * @param {Object} options Optional params for current lookup
   * @param options.localOnly Do not climb the stack if the value isn't found in current Context
   * @returns {Context} Will always return a {Context}. Either one containing the variable or global if the variable doesn't exist.
   */
  lookup: function(v, options) {
    options = options || {};
    return this.locals[v] !== undefined ? this :
      this.parent === undefined || options.localOnly === true ? this : this.parent.lookup(v); // undefined should never be returned
  },

  /**
   * Returns parent {Context}
   * @returns Parent {Context}
   */
  pop: function() {
    return this.parent;
  },

  /**
   * Create new sub-{Context} in current.
   * @param {String} name Name of new {Context}
   * @returns {Context} Newly created {Context}
   */
  push: function(name) {
    var newContext = new Context;
    newContext.parent = this;
    newContext.parent.children[name] = newContext;

    return newContext;
  }
};

exports.Context = Context;
