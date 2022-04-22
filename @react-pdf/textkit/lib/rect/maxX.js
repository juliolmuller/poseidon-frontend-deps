"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Returns max rect X coordinate
 *
 * @param  {Object}  rect
 * @return {number} x coordinate
 */
var maxX = R.converge(R.add, [R.propOr(0, 'x'), R.propOr(0, 'width')]);
var _default = maxX;
exports.default = _default;