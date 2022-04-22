"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Check if two rect are equal
 *
 * @param  {Object}  rect A
 * @param  {Object}  rect B
 * @return {Boolean} rects are equal
 *
 */
var equals = R.equals;
var _default = equals;
exports.default = _default;