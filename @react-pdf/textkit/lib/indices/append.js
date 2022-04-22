"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Append glyph indices with given length
 *
 * Ex. appendIndices(3, [0, 1, 2, 2]) => [0, 1, 2, 2, 3, 3, 3]
 *
 * @param  {number}  length
 * @param  {Array}  glyph indices
 * @return {Array}  extended glyph indices
 */
var appendIndices = function appendIndices(length, indices) {
  return R.converge(R.concat, [R.identity, R.converge(R.repeat, [R.either(R.o(R.inc, R.last), // Value should be last plus 1
  R.always(0) // Or zero if inserting at beggining
  ), R.always(length)])])(indices);
};

var _default = R.curryN(2, appendIndices);

exports.default = _default;