"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Checks if value is not an array
 *
 * @param {any} value
 * @returns {Boolean} isn't value an array
 */
var isNotArray = R.complement(R.is(Array));
/**
 * Casts value to array
 *
 * @param {any} value
 * @returns {Array} casted value
 */

var castArray = R.when(isNotArray, function (v) {
  return [v];
});
var _default = castArray;
exports.default = _default;