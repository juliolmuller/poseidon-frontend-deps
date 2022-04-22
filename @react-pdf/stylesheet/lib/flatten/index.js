"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var isNotArray = R.complement(R.is(Array));
var castArray = R.when(isNotArray, function (v) {
  return [v];
});
/**
 * Remove nil values from array
 *
 * @param {Array} array
 * @returns {Array} array without nils
 */

var compact = R.filter(Boolean);
/**
 * Checks if value is array
 *
 * @param {any} value
 * @returns {Boolean} is value an array
 */

var isArray = R.is(Array);
/**
 * Merges style objects array
 *
 * @param {Array} style objects array
 * @returns {Object} merged style object
 */

var mergeStyles = function mergeStyles(styles) {
  return styles.reduce(function (acc, style) {
    var s = isArray(style) ? flatten(style) : style;
    Object.keys(s).forEach(function (key) {
      if (s[key] !== null && s[key] !== undefined) {
        acc[key] = s[key];
      }
    });
    return acc;
  }, {});
};
/**
 * Flattens an array of style objects, into one aggregated style object.
 *
 * @param {Array} style objects array
 * @returns {Object} flatted style object
 */


var flatten = R.compose(mergeStyles, compact, castArray);
var _default = flatten;
exports.default = _default;