"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Clone rect
 *
 * @param  {Object}  rect
 * @return {Object} cloned rect
 */
var copy = R.clone;
var _default = copy;
exports.default = _default;