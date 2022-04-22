"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _glyphIndexAt = _interopRequireDefault(require("./glyphIndexAt"));

/**
 * Advance width between two string indices
 *
 * @param  {number}  start glyph index
 * @param  {number}  end glyph index
 * @param  {Object}  run
 * @return {Object} advanced width run
 */
var advanceWidthBetween = function advanceWidthBetween(start, end, run) {
  var runStart = R.propOr(0, 'start', run);
  var glyphStartIndex = Math.max(0, (0, _glyphIndexAt.default)(start - runStart, run));
  var glyphEndIndex = Math.max(0, (0, _glyphIndexAt.default)(end - runStart, run));
  return R.compose(R.reduce(R.useWith(R.add, [R.identity, R.propOr(0, 'xAdvance')]), 0), R.slice(glyphStartIndex, glyphEndIndex), R.propOr([], 'positions'))(run);
};

var _default = R.curryN(3, advanceWidthBetween);

exports.default = _default;