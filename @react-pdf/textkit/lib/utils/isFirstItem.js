"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Checks if value is first of the list
 *
 * @param  {Array}  list
 * @param  {any}  value
 * @return {boolean} is first?
 */
var isFirstItem = R.useWith(R.equals, [R.head, R.identity]);
var _default = isFirstItem;
exports.default = _default;