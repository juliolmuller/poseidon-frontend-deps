"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Crop upper section of rect
 *
 * @param  {Object}  rect
 * @return {Object} cropped rect
 */
var crop = function crop(height, rect) {
  return R.evolve({
    y: R.add(height),
    height: R.subtract(R.__, height)
  })(rect);
};

var _default = R.curryN(2, crop);

exports.default = _default;