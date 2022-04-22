"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _maxY = _interopRequireDefault(require("./maxY"));

/**
 * Returns rect bottom left point
 *
 * @param  {Object}  rect
 * @return {number} bottom left point
 */
var bottomLeft = R.applySpec({
  x: R.propOr(0, 'x'),
  y: _maxY.default
});
var _default = bottomLeft;
exports.default = _default;