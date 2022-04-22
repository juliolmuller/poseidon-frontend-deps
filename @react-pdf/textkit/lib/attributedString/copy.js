"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _copy = _interopRequireDefault(require("../run/copy"));

/**
 * Deep clone attributed string
 *
 * @param  {Object}  attributed string
 * @return {Object} cloned attributed string
 */
var copy = R.evolve({
  string: R.identity,
  syllables: R.identity,
  runs: R.map(_copy.default)
});
var _default = copy;
exports.default = _default;