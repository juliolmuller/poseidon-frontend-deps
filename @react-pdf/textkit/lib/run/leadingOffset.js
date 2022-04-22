"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _isWhiteSpace = _interopRequireDefault(require("../glyph/isWhiteSpace"));

/**
 * Get white space leading positions
 *
 * @param  {Object}  run
 * @return {Array} white space leading positions
 */
var leadingPositions = R.converge(R.slice(0), [R.compose(R.length, R.takeWhile(_isWhiteSpace.default), R.propOr([], 'glyphs')), R.propOr([], 'positions')]);
/**
 * Get run leading white space offset
 *
 * @param  {Object}  run
 * @return {number} leading white space offset
 */

var leadingOffset = R.compose(R.ifElse(R.isEmpty, R.always(0), R.compose(R.sum, R.map(R.propOr(0, 'xAdvance')))), leadingPositions);
var _default = leadingOffset;
exports.default = _default;