"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.resolvePageSize = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var R = _interopRequireWildcard(require("ramda"));

var _flatten = _interopRequireDefault(require("@react-pdf/stylesheet/lib/flatten"));

var _getSize = _interopRequireDefault(require("../page/getSize"));

/**
 * Resolves page size
 *
 * @param {Object} page
 * @returns {Object} page with resolved size in style attribute
 */
var resolvePageSize = function resolvePageSize(page) {
  var size = (0, _getSize.default)(page);
  var style = (0, _flatten.default)(page.style || {});
  return (0, _extends2.default)({}, page, {
    style: (0, _extends2.default)({}, style, size)
  });
};
/**
 * Resolves page sizes
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved page sizes
 */


exports.resolvePageSize = resolvePageSize;
var resolvePageSizes = R.evolve({
  children: R.map(resolvePageSize)
});
var _default = resolvePageSizes;
exports.default = _default;