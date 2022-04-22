"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Add scalar to run
 *
 * @param  {number}  scalar
 * @param  {Object}  run
 * @return {Object} added run
 */
var add = function add(n, run) {
  return R.evolve({
    start: R.add(n),
    end: R.add(n)
  })(run);
};

var _default = R.curryN(2, add);

exports.default = _default;