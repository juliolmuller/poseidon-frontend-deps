"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _matchPercent = _interopRequireDefault(require("../utils/matchPercent"));

/**
 *
 * @param {Object} container width and height
 * @param {String | Number} value border radius value
 * @returns {Number} fixed border radius value
 */
var resolveRadius = function resolveRadius(container) {
  return function (value) {
    var match = (0, _matchPercent.default)(value);
    return match ? match.percent * Math.min(container.width, container.height) : value;
  };
};
/**
 * Transforms percent border radius into fixed values
 *
 * @param {Object} node
 * @returns {Object} node
 */


var resolvePercentRadius = function resolvePercentRadius(node) {
  return R.evolve({
    children: R.map(resolvePercentRadius),
    style: R.evolve({
      borderTopLeftRadius: resolveRadius(node.box),
      borderTopRightRadius: resolveRadius(node.box),
      borderBottomRightRadius: resolveRadius(node.box),
      borderBottomLeftRadius: resolveRadius(node.box)
    })
  })(node);
};

var _default = resolvePercentRadius;
exports.default = _default;