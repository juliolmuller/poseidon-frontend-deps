"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Subtract scalar to run
 *
 * @param  {number}  scalar
 * @param  {Object}  run
 * @return {Object} subtracted run
 */
var subtract = function subtract(n, run) {
  return R.evolve({
    start: R.subtract(R.__, n),
    end: R.subtract(R.__, n)
  })(run);
};

var _default = R.curryN(2, subtract);

exports.default = _default;