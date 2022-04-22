"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _maxX = _interopRequireDefault(require("./maxX"));

/**
 * Returns rect top right point
 *
 * @param  {Object}  rect
 * @return {number} top right point
 */
var topRight = R.applySpec({
  x: _maxX.default,
  y: R.propOr(0, 'y')
});
var _default = topRight;
exports.default = _default;