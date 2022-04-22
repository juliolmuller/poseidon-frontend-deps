"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Checks if value is last of the list
 *
 * @param  {Array}  list
 * @param  {any}  value
 * @return {boolean} is last?
 */
var isLastItem = R.useWith(R.equals, [R.last, R.identity]);
var _default = isLastItem;
exports.default = _default;