"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Return glyph index at string index, if glyph indices present.
 * Otherwise return string index
 *
 * @param  {number}  string index
 * @param  {Object}  run
 * @return {number}  glyph index
 */
var glyphIndexAt = function glyphIndexAt(index, run) {
  return R.pathOr(index, ['glyphIndices', index])(run);
};

var _default = R.curryN(2, glyphIndexAt);

exports.default = _default;