"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _runIndexAt = _interopRequireDefault(require("../run/runIndexAt"));

/**
 * Get run index at char index
 *
 * @param  {number}  char index
 * @param  {Object}  attributedString
 * @return {number} run index
 */
var runIndexAt = function runIndexAt(n, string) {
  return R.compose((0, _runIndexAt.default)(n), R.prop('runs'))(string);
};

var _default = R.curryN(2, runIndexAt);

exports.default = _default;