"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Checks if two rect intersects
 *
 * @param  {Object}  rect A
 * @param  {Object}  rect B
 * @return {Boolean} rects intersect
 */
var intersects = function intersects(rectA, rectB) {
  var rectAX = R.propOr(0, 'x', rectA);
  var rectBX = R.propOr(0, 'x', rectB);
  var rectAY = R.propOr(0, 'y', rectA);
  var rectBY = R.propOr(0, 'y', rectB);
  var rectAW = R.propOr(0, 'width', rectA);
  var rectBW = R.propOr(0, 'width', rectB);
  var rectAH = R.propOr(0, 'height', rectA);
  var rectBH = R.propOr(0, 'height', rectB);
  return rectAX <= rectBX + rectBW && rectBX <= rectAX + rectAW && rectAY <= rectBY + rectBH && rectBY <= rectAY + rectAH;
};

var _default = R.curryN(2, intersects);

exports.default = _default;