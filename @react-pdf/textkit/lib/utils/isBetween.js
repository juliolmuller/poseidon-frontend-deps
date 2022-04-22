"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Checks if number is between two values (upper non-inclusive)
 *
 * @param  {Function}  lower value
 * @param  {Function}  higher value
 * @param  {number}  predicate value
 * @return {Function} is between invoker
 */
var isBetween = function isBetween(a, b, c) {
  return R.both(R.o(R.gte(c), a), R.o(R.lt(c), b));
};

var _default = R.curryN(3, isBetween);

exports.default = _default;