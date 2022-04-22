"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _matchPercent = _interopRequireDefault(require("../utils/matchPercent"));

/*
 * Translates page percentage horizontal paddings in fixed ones
 *
 * @param {Object} page container
 * @param {String} padding value
 * @returns {Object} translated padding value
 */
var resolvePageHorizontalPadding = function resolvePageHorizontalPadding(container) {
  return function (value) {
    var match = (0, _matchPercent.default)(value);
    return match ? match.percent * container.width : value;
  };
};
/**
 * Translates page percentage vertical paddings in fixed ones
 *
 * @param {Object} page container
 * @param {String} padding value
 * @returns {Object} translated padding value
 */


var resolvePageVerticalPadding = function resolvePageVerticalPadding(container) {
  return function (value) {
    var match = (0, _matchPercent.default)(value);
    return match ? match.percent * container.height : value;
  };
};
/**
 * Translates page percentage paddings in fixed ones
 *
 * @param {Object} page
 * @returns {Object} page with fixed paddings
 */


var resolvePagePaddings = function resolvePagePaddings(page) {
  var container = page.style;
  return R.evolve({
    style: R.evolve({
      paddingTop: resolvePageVerticalPadding(container),
      paddingLeft: resolvePageHorizontalPadding(container),
      paddingRight: resolvePageHorizontalPadding(container),
      paddingBottom: resolvePageVerticalPadding(container)
    })
  })(page);
};
/**
 * Translates all pages percentage paddings in fixed ones
 * This has to be computed from pages calculated size and not by Yoga
 * because at this point we didn't performed pagination yet.
 *
 * @param {Object} document root
 * @returns {Object} document root with translated page paddings
 */


var _default = R.evolve({
  children: R.map(resolvePagePaddings)
});

exports.default = _default;