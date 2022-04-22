"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _maxX = _interopRequireDefault(require("./maxX"));

var _maxY = _interopRequireDefault(require("./maxY"));

/**
 * Checks if point is inside rect
 *
 * @param  {Object}  rect
 * @param  {Object}  point
 * @return {Boolean} contains
 */
var containsPoint = function containsPoint(rectA, point) {
  var rectX = R.propOr(0, 'x', rectA);
  var rectY = R.propOr(0, 'y', rectA);
  var rectMaxX = (0, _maxX.default)(rectA);
  var rectMaxY = (0, _maxY.default)(rectA);
  var pointX = R.propOr(0, 'x', point);
  var pointY = R.propOr(0, 'y', point);
  return rectX <= pointX && rectY <= pointY && rectMaxX >= pointX && rectMaxY >= pointY;
};

var _default = R.curryN(2, containsPoint);

exports.default = _default;