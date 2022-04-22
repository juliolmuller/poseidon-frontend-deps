"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _maxX = _interopRequireDefault(require("./maxX"));

var _maxY = _interopRequireDefault(require("./maxY"));

/**
 * Checks if rect b can be fitted inside A
 *
 * @param  {Object}  rect A
 * @param  {Object}  rect B
 * @return {Boolean} contains
 */
var containsRect = function containsRect(rectA, rectB) {
  var rectAX = R.propOr(0, 'x', rectA);
  var rectBX = R.propOr(0, 'x', rectB);
  var rectAY = R.propOr(0, 'y', rectA);
  var rectBY = R.propOr(0, 'y', rectB);
  var rectAMaxX = (0, _maxX.default)(rectA);
  var rectAMaxY = (0, _maxY.default)(rectA);
  var rectBMaxX = (0, _maxX.default)(rectB);
  var rectBMaxY = (0, _maxY.default)(rectB);
  return rectAX <= rectBX && rectAY <= rectBY && rectAMaxX >= rectBMaxX && rectAMaxY >= rectBMaxY;
};

var _default = R.curryN(2, containsRect);

exports.default = _default;