"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _maxX = _interopRequireDefault(require("./maxX"));

var _maxY = _interopRequireDefault(require("./maxY"));

/**
 * Returns rect bottom right point
 *
 * @param  {Object}  rect
 * @return {number} bottom right point
 */
var bottomRight = R.applySpec({
  x: _maxX.default,
  y: _maxY.default
});
var _default = bottomRight;
exports.default = _default;