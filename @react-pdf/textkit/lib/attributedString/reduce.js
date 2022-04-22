"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Sum run function results
 *
 * @param {function} accum fn
 * @param {function} function run (run) -> Number
 * @param {number} initial value
 * @return {number} sum
 */
var sumRuns = function sumRuns(accum, fn, init) {
  if (init === void 0) {
    init = 0;
  }

  return R.compose(R.reduce(R.useWith(accum, [R.identity, fn]), init), R.prop('runs'));
};

var _default = sumRuns;
exports.default = _default;