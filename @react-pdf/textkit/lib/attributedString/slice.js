"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _slice = _interopRequireDefault(require("../run/slice"));

var _filter = _interopRequireDefault(require("../run/filter"));

var _subtract = _interopRequireDefault(require("../run/subtract"));

var _mapIndexed = _interopRequireDefault(require("../utils/mapIndexed"));

/**
 * Slice array of runs
 *
 * @param  {number}  start offset
 * @param  {number}  end offset
 * @param  {Array}  runs
 * @return {Array} sliced runs
 */
var sliceRuns = function sliceRuns(start, end) {
  return function (runs) {
    var firstRun = function firstRun(a) {
      return (0, _slice.default)(start - a.start, end - a.start, a);
    };

    var lastRun = function lastRun(a) {
      return (0, _slice.default)(0, end - a.start, a);
    };

    var intermediateRun = R.identity;
    var res = (0, _mapIndexed.default)([R.o((0, _subtract.default)(start), firstRun), // Slice first run
    R.o((0, _subtract.default)(start), intermediateRun), // Slice intermediate runs
    R.o((0, _subtract.default)(start), lastRun) // Slice last run
    ])(runs);
    return res;
  };
};
/**
 * Slice attributed string between two indices
 *
 * @param  {number}  start offset
 * @param  {number}  end offset
 * @param  {Object}  attributedString
 * @return {Object} attributedString
 */


var slice = function slice(start, end, string) {
  return R.ifElse(R.pathEq(['string', 'length'], 0), R.identity, R.evolve({
    string: R.slice(start, end),
    runs: R.compose(sliceRuns(start, end), (0, _filter.default)(start, end))
  }))(string);
};

var _default = R.curryN(3, slice);

exports.default = _default;