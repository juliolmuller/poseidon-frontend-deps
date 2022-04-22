"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _insert = _interopRequireDefault(require("./insert"));

/**
 * Append code point on run
 *
 * @param  {number}  code point
 * @param  {Object}  run
 * @return {Object} run with glyph
 */
var appendCode = function appendCode(codePoint, run) {
  return (0, _insert.default)(run.end, codePoint, run);
};

var _default = R.curryN(2, appendCode);

exports.default = _default;