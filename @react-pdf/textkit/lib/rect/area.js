"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Returns rect area
 *
 * @param  {Object}  rect
 * @return {number} rect area
 */
var area = R.converge(R.multiply, [R.propOr(0, 'height'), R.propOr(0, 'width')]);
var _default = area;
exports.default = _default;