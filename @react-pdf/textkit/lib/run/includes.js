"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Checks if run includes code point
 *
 * @param  {number}  code point
 * @param  {Object}  run
 * @return {Object} empty run
 */
var includes = function includes(codePoint, run) {
  return R.compose(R.any(R.compose(R.includes(codePoint), R.propOr([], 'codePoints'))), R.propOr([], 'glyphs'))(run);
};

var _default = R.curryN(2, includes);

exports.default = _default;