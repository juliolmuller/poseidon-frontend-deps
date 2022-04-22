"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Get ligature offset by index
 *
 * Ex. ffi ligature
 *
 *   glyphs:         l  o  f  f  i  m
 *   glyphIndices:   0  1  2  2  2  3
 *   offset:         0  0  0  1  2  0
 *
 * @param  {number}  index
 * @param  {Object}  run
 * @return {number} ligature offset
 */
var offset = function offset(index, run) {
  var value = R.pathOr(null, ['glyphIndices', index], run);
  return R.compose(R.length, R.dropWhile(R.gt(value)), R.slice(0, index), R.propOr([], 'glyphIndices'))(run);
};

var _default = R.curryN(2, offset);

exports.default = _default;