"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Extends a run by given value
 *
 * @param  {number}  value
 * @param  {Object}  run
 * @return {boolean} extended run
 */
var extend = function extend(n) {
  return R.evolve({
    start: R.min(n),
    end: R.max(n)
  });
};

var _default = extend;
exports.default = _default;