"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Returns max rect Y coordinate
 *
 * @param  {Object}  rect
 * @return {number} y coordinate
 */
var maxY = R.converge(R.add, [R.propOr(0, 'y'), R.propOr(0, 'height')]);
var _default = maxY;
exports.default = _default;