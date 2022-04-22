"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _copy = _interopRequireDefault(require("./copy"));

var _scale = _interopRequireDefault(require("./scale"));

var _getFont = _interopRequireDefault(require("./getFont"));

var _isNumber = _interopRequireDefault(require("../utils/isNumber"));

var _append = _interopRequireDefault(require("../indices/append"));

var _fromCodePoint = _interopRequireDefault(require("../glyph/fromCodePoint"));

/**
 * Append glyph to run
 *
 * @param  {Object}  glyph
 * @param  {Object}  run
 * @return {Object} run with glyph
 */
var appendGlyph = function appendGlyph(glyph, run) {
  var runScale = (0, _scale.default)(run);
  var glyphLength = R.length(glyph.codePoints);
  return R.evolve({
    end: R.add(glyphLength),
    glyphs: R.append(glyph),
    glyphIndices: (0, _append.default)(glyphLength),
    positions: R.append({
      xAdvance: glyph.advanceWidth * runScale
    })
  })(run);
};
/**
 * Append glyph or code point to run
 *
 * @param  {Object | number}  glyph | codePoint
 * @param  {Object}  run
 * @return {Object} run with glyph
 */


var append = function append(value, run) {
  if (!value) return (0, _copy.default)(run);
  var font = (0, _getFont.default)(run);
  var glyph = (0, _isNumber.default)(value) ? (0, _fromCodePoint.default)(value, font) : value;
  return appendGlyph(glyph, run);
};

var _default = R.curryN(2, append);

exports.default = _default;