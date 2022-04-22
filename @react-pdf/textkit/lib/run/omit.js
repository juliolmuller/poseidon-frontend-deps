"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Omit attribute from run
 *
 * @param  {Object}  run
 * @return {Object} run without ommited attribute
 */
var omit = function omit(value, run) {
  return R.evolve({
    attributes: R.dissoc(value)
  })(run);
};

var _default = R.curryN(2, omit);

exports.default = _default;