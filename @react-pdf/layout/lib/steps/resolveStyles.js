"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _stylesheet = _interopRequireDefault(require("@react-pdf/stylesheet"));

var isLink = R.propEq('type', P.Link);
var LINK_STYLES = {
  color: 'blue',
  textDecoration: 'underline'
};
/**
 * Resolves node styles
 *
 * @param {Object} container
 * @param {Object} document node
 * @returns {Object} node (and subnodes) with resolved styles
 */

var resolveNodeStyles = function resolveNodeStyles(container) {
  return function (node) {
    return R.o(R.when(isLink, R.evolve({
      style: R.merge(LINK_STYLES)
    })), R.evolve({
      style: (0, _stylesheet.default)(container),
      children: R.map(resolveNodeStyles(container))
    }))(node);
  };
};
/**
 * Resolves page styles
 *
 * @param {Object} document page
 * @returns {Object} document page with resolved styles
 */


var resolvePageStyles = function resolvePageStyles(page) {
  var box = R.prop('box', page);
  var style = R.prop('style', page);
  var container = R.isEmpty(box) ? style : box;
  return R.evolve({
    style: (0, _stylesheet.default)(container),
    children: R.map(resolveNodeStyles(container))
  })(page);
};
/**
 * Resolves document styles
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved styles
 */


var _default = R.evolve({
  children: R.map(resolvePageStyles)
});

exports.default = _default;