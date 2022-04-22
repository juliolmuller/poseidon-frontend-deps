"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Returns empty rect
 *
 * @return {Object} empty rect
 */
var empty = R.always({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});
var _default = empty;
exports.default = _default;