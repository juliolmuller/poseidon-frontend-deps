"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Map list by index
 * Accepts up to 3 functions:
 *   - Will apply first function to first value
 *   - Will apply last function to last value
 *   - Will apply the other function to the rest of values
 *
 * @param  {Array}  list
 * @param  {Array}  functions
 * @return {Array} mapped array
 */
var mapIndexed = function mapIndexed(fns, list) {
  if (fns === void 0) {
    fns = [];
  }

  if (list === void 0) {
    list = [];
  }

  var length = list.length - 1;
  return R.addIndex(R.map)(function (value, idx) {
    if (idx === 0) return R.head(fns)(value, idx);
    if (idx === length) return R.last(fns)(value, idx);
    return (fns[1] || fns[0])(value, idx);
  })(list);
};

var _default = R.curryN(2, mapIndexed);

exports.default = _default;