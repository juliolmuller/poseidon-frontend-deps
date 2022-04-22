"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var WHITE_SPACES_CODES = [32];
/**
 * Check if glyph is white space
 *
 * @param  {Object}  glyph
 * @return {Boolean}  is white space
 * */

var isWhiteSpace = R.compose(R.not, R.isEmpty, R.intersection(WHITE_SPACES_CODES), R.propOr([], 'codePoints'));
var _default = isWhiteSpace;
exports.default = _default;