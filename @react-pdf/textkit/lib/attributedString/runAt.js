"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _runIndexAt = _interopRequireDefault(require("./runIndexAt"));

/**
 * Get run at char index
 *
 * @param  {number}  char index
 * @param  {Object}  attributedString
 * @return {Object} run
 */
var runAt = function runAt(n, attributedString) {
  var runIndex = (0, _runIndexAt.default)(n)(attributedString);
  return R.path(['runs', runIndex])(attributedString);
};

var _default = R.curryN(2, runAt);

exports.default = _default;