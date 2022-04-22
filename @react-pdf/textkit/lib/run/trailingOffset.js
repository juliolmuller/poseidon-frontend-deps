"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _isWhiteSpace = _interopRequireDefault(require("../glyph/isWhiteSpace"));

/**
 * Get white space trailing positions
 *
 * @param  {Object}  run
 * @return {Array} white space trailing positions
 */
var trailingPositions = R.converge(R.slice(0), [R.compose(R.length, R.takeWhile(_isWhiteSpace.default), R.reverse, R.propOr([], 'glyphs')), R.compose(R.reverse, R.propOr([], 'positions'))]);
/**
 * Get run trailing white space offset
 *
 * @param  {Object}  run
 * @return {number} trailing white space offset
 */

var trailingOffset = R.compose(R.ifElse(R.isEmpty, R.always(0), R.compose(R.sum, R.map(R.propOr(0, 'xAdvance')))), trailingPositions);
var _default = trailingOffset;
exports.default = _default;