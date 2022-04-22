"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _copy = _interopRequireDefault(require("./copy"));

var _slice = _interopRequireDefault(require("./slice"));

var _concat = _interopRequireDefault(require("./concat"));

var _append = _interopRequireDefault(require("./append"));

var _getFont = _interopRequireDefault(require("./getFont"));

var _isNumber = _interopRequireDefault(require("../utils/isNumber"));

var _fromCodePoint = _interopRequireDefault(require("../glyph/fromCodePoint"));

/**
 * Insert glyph to run in the given index
 *
 * @param  {number}  string index
 * @param  {Object}  glyph
 * @param  {Object}  run
 * @return {Object}  run with glyph
 */
var insertGlyph = function insertGlyph(index, glyph, run) {
  if (!glyph) return (0, _copy.default)(run); // Split resolves ligature splitting in case new glyph breaks some

  var leadingRun = (0, _slice.default)(0, index, run);
  var trailingRun = (0, _slice.default)(index, Infinity, run);
  return (0, _concat.default)((0, _append.default)(glyph, leadingRun), trailingRun);
};
/**
 * Insert either glyph or code point to run in the given index
 *
 * @param  {number}  string index
 * @param  {Object | number}  glyph | codePoint
 * @param  {Object}  run
 * @return {Object}  run with glyph
 */


var insert = function insert(index, value, run) {
  var font = (0, _getFont.default)(run);
  var glyph = (0, _isNumber.default)(value) ? (0, _fromCodePoint.default)(value, font) : value;
  return insertGlyph(index, glyph, run);
};

var _default = R.curryN(3, insert);

exports.default = _default;