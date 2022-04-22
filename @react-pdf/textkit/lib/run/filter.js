"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _runIndexAt = _interopRequireDefault(require("./runIndexAt"));

/**
 * Filter runs contained between start and end
 *
 * @param  {number}  start
 * @param  {number}  end
 * @param  {Array}  runs
 * @return {boolean} filtered runs
 */
var filter = function filter(start, end, runs) {
  var startIndex = (0, _runIndexAt.default)(start, runs);
  var endIndex = R.max((0, _runIndexAt.default)(end - 1, runs), startIndex);
  return R.slice(startIndex, endIndex + 1, runs);
};

var _default = R.curryN(3, filter);

exports.default = _default;