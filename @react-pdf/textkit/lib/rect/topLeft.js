"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Returns rect top left point
 *
 * @param  {Object}  rect
 * @return {number} top left point
 */
var topLeft = R.applySpec({
  x: R.propOr(0, 'x'),
  y: R.propOr(0, 'y')
});
var _default = topLeft;
exports.default = _default;