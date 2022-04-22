"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var getYOffset = R.pathOr(0, ['attributes', 'yOffset']);
var getUnitsPerEm = R.pathOr(0, ['attributes', 'font', 'unitsPerEm']);
/**
 * Resolves yOffset for run
 *
 * @param  {Object}  run
 * @return {Object} run
 */

var resolveRunYOffset = function resolveRunYOffset(run) {
  var unitsPerEm = getUnitsPerEm(run);
  var yOffset = getYOffset(run);
  var mult = yOffset * unitsPerEm;
  return R.evolve({
    positions: R.map(R.assoc('yOffset', mult))
  })(run);
};
/**
 * Resolves yOffset for multiple paragraphs
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Array}  attributed strings (paragraphs)
 * @return {Array} attributed strings (paragraphs)
 */


var resolveYOffset = function resolveYOffset() {
  return R.evolve({
    runs: R.map(resolveRunYOffset)
  });
};

var _default = resolveYOffset;
exports.default = _default;