"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var unitsPerEm = ['font', 'unitsPerEm'];
/**
 * Calculate run scale
 *
 * @param  {Object}  run
 * @return {number} scale
 */

var calculateScale = R.compose(R.ifElse(R.compose(R.not, R.isNil, R.path(unitsPerEm)), R.converge(R.divide, [R.propOr(12, 'fontSize'), R.path(unitsPerEm)]), R.always(0)), R.propOr({}, 'attributes'));
/**
 * Get run scale
 *
 * @param  {Object}  run
 * @return {number} scale
 */

var scale = R.either(R.path(['attributes', 'scale']), calculateScale);
var _default = scale;
exports.default = _default;