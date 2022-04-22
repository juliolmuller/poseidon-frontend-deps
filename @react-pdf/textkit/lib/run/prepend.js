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

var _prepend = _interopRequireDefault(require("../indices/prepend"));

var _fromCodePoint = _interopRequireDefault(require("../glyph/fromCodePoint"));

/**
 * Prepend glyph to run
 *
 * @param  {Object}  glyph
 * @param  {Object}  run
 * @return {Object} run with glyph
 */
var prependGlyph = function prependGlyph(glyph, run) {
  var runScale = (0, _scale.default)(run);
  var glyphLength = R.length(glyph.codePoints);
  return R.evolve({
    end: R.add(glyphLength),
    glyphIndices: (0, _prepend.default)(glyphLength),
    glyphs: R.prepend(glyph),
    positions: R.prepend({
      xAdvance: glyph.advanceWidth * runScale
    })
  })(run);
};
/**
 * Prepend glyph or code point on run
 *
 * @param  {Object | number}  glyph | codePoint
 * @param  {Object}  run
 * @return {Object} run with glyph
 */


var prepend = function prepend(value, run) {
  if (!value) return (0, _copy.default)(run);
  var font = (0, _getFont.default)(run);
  var glyph = (0, _isNumber.default)(value) ? (0, _fromCodePoint.default)(value, font) : value;
  return prependGlyph(glyph, run);
};

var _default = R.curryN(2, prepend);

exports.default = _default;