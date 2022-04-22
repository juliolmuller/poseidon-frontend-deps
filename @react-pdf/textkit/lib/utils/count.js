"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Checks if number is between two values (upper non-inclusive)
 *
 * @param  {any}  value
 * @param  {Array}  list
 * @return {number} appearances of value in list
 */
var count = function count(value, list) {
  return R.compose(R.length, R.filter(R.equals(value)))(list);
};

var _default = R.curryN(2, count);

exports.default = _default;