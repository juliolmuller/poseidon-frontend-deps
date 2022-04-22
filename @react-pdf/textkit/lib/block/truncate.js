"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _append = _interopRequireDefault(require("../attributedString/append"));

var _trim = _interopRequireDefault(require("../attributedString/trim"));

var ELLIPSIS_UNICODE = 8230;
var ELLIPSIS_STRING = String.fromCharCode(ELLIPSIS_UNICODE);
/**
 * Get ellipsis codepoint. This may be different in standard and embedded fonts
 *
 * @param  {number}  font
 * @return {Object} ellipsis codepoint
 */

var getEllipsisCodePoint = function getEllipsisCodePoint(font) {
  if (!font.encode) return ELLIPSIS_UNICODE;

  var _font$encode = font.encode(ELLIPSIS_STRING),
      codePoints = _font$encode[0];

  return parseInt(codePoints[0], 16);
};
/**
 * Trucante block with ellipsis
 *
 * @param  {number}  lines quantity
 * @param  {Object}  paragraph block
 * @return {Object} sliced paragraph block
 */


var truncate = function truncate(block) {
  var runs = R.propOr([], 'runs', R.last(block));
  var font = R.path(['attributes', 'font'], R.last(runs));

  if (font) {
    var codePoint = getEllipsisCodePoint(font);
    var glyph = font.glyphForCodePoint(codePoint);
    return R.adjust(-1, R.compose((0, _append.default)(glyph), _trim.default))(block);
  }

  return block;
};

var _default = truncate;
exports.default = _default;