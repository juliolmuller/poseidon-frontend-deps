"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _matchPercent = _interopRequireDefault(require("../utils/matchPercent"));

/**
 * Transform percent height into fixed
 *
 * @param {String | number} height
 * @return {number} height
 */
var transformHeight = function transformHeight(pageArea) {
  return function (height) {
    var match = (0, _matchPercent.default)(height);
    return match ? match.percent * pageArea : height;
  };
};
/**
 * Get page area (height minus paddings)
 *
 * @param {Object} page
 * @return {number} page area
 */


var getPageArea = function getPageArea(page) {
  var pageHeight = R.path(['style', 'height'], page);
  var pagePaddingTop = R.pathOr(0, ['style', 'paddingTop'], page);
  var pagePaddingBottom = R.pathOr(0, ['style', 'paddingBottom'], page);
  return pageHeight - pagePaddingTop - pagePaddingBottom;
};
/**
 * Checks if page has height
 *
 * @param {Object} page
 * @return {boolean} page has height
 */


var hasHeight = R.hasPath(['style', 'height']);
/**
 * Transform node percent height to fixed
 *
 * @param {Object} page
 * @param {Object} node
 * @return {Object} transformed node
 */

var resolveNodePercentHeight = function resolveNodePercentHeight(page) {
  return function (node) {
    if (hasHeight(page)) {
      var pageArea = getPageArea(page);
      return R.evolve({
        style: {
          height: transformHeight(pageArea)
        }
      })(node);
    }

    return node;
  };
};
/**
 * Transform page immediate children with percent height to fixed
 *
 * @param {Object} page
 * @return {Object} transformed page
 */


var resolvePagePercentHeight = function resolvePagePercentHeight(page) {
  return R.evolve({
    children: R.map(resolveNodePercentHeight(page))
  })(page);
};
/**
 * Transform all page immediate children with percent height to fixed.
 * This is needed for computing correct dimensions on pre-pagination layout.
 *
 * @param {Object} document root
 * @return {Object} transformed document root
 */


var resolvePercentHeight = R.evolve({
  children: R.map(resolvePagePercentHeight)
});
var _default = resolvePercentHeight;
exports.default = _default;