"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Returns new array starting with zero, and keeping same relation between consecutive values
 *
 * @param  {Array[number]}  list
 * @return {boolean} normalized array
 */
var normalize = function normalize(array) {
  return R.map(R.subtract(R.__, R.head(array)))(array);
};

var _default = normalize;
exports.default = _default;