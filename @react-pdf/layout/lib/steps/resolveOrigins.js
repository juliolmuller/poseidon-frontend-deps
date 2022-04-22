"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _getOrigin = _interopRequireDefault(require("../node/getOrigin"));

/**
 * Resolve node origin
 *
 * @param {Object} node
 * @returns {Object} node with origin attribute
 */
var resolveNodeOrigin = function resolveNodeOrigin(node) {
  return R.compose(R.evolve({
    children: R.map(resolveNodeOrigin)
  }), R.converge(R.assoc('origin'), [_getOrigin.default, R.identity]))(node);
};
/**
 * Resolve document origins
 *
 * @param {Object} document root
 * @returns {Object} documrnt root
 */


var resolveOrigin = R.evolve({
  children: R.map(resolveNodeOrigin)
});
var _default = resolveOrigin;
exports.default = _default;