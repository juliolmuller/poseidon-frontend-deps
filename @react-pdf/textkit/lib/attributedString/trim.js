"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _slice = _interopRequireDefault(require("./slice"));

var testChar = R.test(/\S/g);
var findCharIndex = R.findIndex(testChar);
var findLastCharIndex = R.o(R.inc, R.findLastIndex(testChar));
/**
 * Removes (strips) whitespace from both ends of the attributted string.
 *
 * @param  {Object}  attributedString
 * @return {Object} attributedString
 */

var trim = R.chain(R.apply(_slice.default), R.compose(R.juxt([findCharIndex, findLastCharIndex]), R.prop('string')));
var _default = trim;
exports.default = _default;