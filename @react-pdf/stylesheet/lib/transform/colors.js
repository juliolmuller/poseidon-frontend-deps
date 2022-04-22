"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _hslToHex = _interopRequireDefault(require("hsl-to-hex"));

var _colorString = _interopRequireDefault(require("color-string"));

var isRgb = R.test(/rgb/g);
var isRgba = R.test(/rgba/g);
var isHsl = R.test(/hsl/g);
var isHsla = R.test(/hsla/g);
/**
 * Transform rgb color to hexa
 *
 * @param {String} styles value
 * @returns {Object} transformed value
 */

var parseRgb = R.compose(_colorString.default.to.hex, _colorString.default.get.rgb);
/**
 * Transform Hsl color to hexa
 *
 * @param {String} styles value
 * @returns {Object} transformed value
 */

var parseHsl = R.compose(R.toUpper, R.apply(_hslToHex.default), R.map(Math.round), _colorString.default.get.hsl);
/**
 * Transform given color to hexa
 *
 * @param {String} styles value
 * @returns {Object} transformed value
 */

var transformColor = function transformColor(value) {
  return R.cond([[isRgba, parseRgb], [isRgb, parseRgb], [isHsla, parseHsl], [isHsl, parseHsl], [R.T, R.always(value)]])(value);
};

var _default = transformColor;
exports.default = _default;