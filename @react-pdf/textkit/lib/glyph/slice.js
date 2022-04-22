"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Slice glyph between codePoints range
 * Util for breaking ligatures
 *
 * @param  {number}  start code point index
 * @param  {number}  end code point index
 * @param  {Object}  font to generate new glyph
 * @param  {Object} glyph to be sliced
 * @return {Array} sliced glyph parts
 */
var slice = function slice(start, end, font, glyph) {
  if (!glyph) return [];
  if (start === end) return [];
  if (start === 0 && end === glyph.codePoints.length) return [glyph];
  var codePoints = R.slice(start, end, glyph.codePoints);
  var string = String.fromCodePoint.apply(String, codePoints);
  return font ? font.layout(string).glyphs : [glyph];
};

var _default = R.curryN(4, slice);

exports.default = _default;