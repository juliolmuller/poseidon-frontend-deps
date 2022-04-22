"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Prepend glyph indices with given length
 *
 * Ex. prepend(3, [0, 1, 2, 2]) => [0, 0, 0, 1, 2, 3, 3]
 *
 * @param  {number}  length
 * @param  {Array}  glyph indices
 * @return {Array}  extended glyph indices
 */
var prepend = function prepend(length, indices) {
  if (length === 0) return indices;
  return R.converge(R.concat, [R.converge(R.repeat, [R.always(0), R.always(length)]), R.map(R.inc)])(indices);
};

var _default = R.curryN(2, prepend);

exports.default = _default;