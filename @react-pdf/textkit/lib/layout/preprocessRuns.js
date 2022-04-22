"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _omit = _interopRequireDefault(require("../run/omit"));

var _flatten = _interopRequireDefault(require("../run/flatten"));

var _empty = _interopRequireDefault(require("../attributedString/empty"));

var omitFont = R.evolve({
  runs: R.map((0, _omit.default)('font'))
});
/**
 * Performs font substitution and script itemization on attributed string
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} processed attributed string
 */

var preprocessRuns = function preprocessRuns(engines, options) {
  return R.ifElse(R.isNil, _empty.default, R.applySpec({
    string: R.prop('string'),
    runs: R.compose(_flatten.default, R.flatten, R.pluck('runs'), R.juxt([engines.fontSubstitution(options), // font substitution
    engines.scriptItemizer(options), // script itemization
    omitFont]))
  }));
};

var _default = preprocessRuns;
exports.default = _default;