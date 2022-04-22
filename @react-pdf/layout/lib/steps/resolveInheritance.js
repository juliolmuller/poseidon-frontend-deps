"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var INHERITED_PROPERTIES = ['color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'letterSpacing', 'opacity', 'textDecoration', 'textTransform', 'lineHeight', 'textAlign', 'visibility', 'wordSpacing'];
var isSvg = R.propEq('type', P.Svg);
/**
 * Get styles sub group of inherited properties
 *
 * @param {Object} style object
 * @returns {Object} style object only with inherited properties
 */

var getInheritStyles = R.compose(R.pick(INHERITED_PROPERTIES), R.propOr({}, 'style')); // Merge style values

var mergeValues = function mergeValues(styleName, value, inheritedValue) {
  switch (styleName) {
    case 'textDecoration':
      {
        // merge not none and not false textDecoration values to one rule
        return [inheritedValue, value].filter(function (v) {
          return v && v !== 'none';
        }).join(' ');
      }

    default:
      return value;
  }
}; // Merge inherited and node styles


var merge = function merge(inheritedStyles, style) {
  var mergedStyles = (0, _extends2.default)({}, inheritedStyles);
  Object.entries(style).forEach(function (_ref) {
    var styleName = _ref[0],
        value = _ref[1];
    mergedStyles[styleName] = mergeValues(styleName, value, inheritedStyles[styleName]);
  });
  return mergedStyles;
};
/**
 * Merges styles with node
 *
 * @param {Object} style object
 * @param {Object} node
 * @returns {Object} node with styles merged
 */


var mergeStyles = function mergeStyles(inheritedStyles) {
  return R.evolve({
    style: function style(_style) {
      return merge(inheritedStyles, _style);
    }
  });
};
/**
 * Inherit style values from the root to the leafs
 *
 * @param {Object} document root
 * @returns {Object} document root with inheritance
 *
 */


var resolveInheritance = function resolveInheritance(node) {
  if (isSvg(node)) return node;
  var inheritStyles = getInheritStyles(node);
  var resolveChild = R.compose(resolveInheritance, mergeStyles(inheritStyles));
  return R.evolve({
    children: R.map(resolveChild)
  })(node);
};

var _default = resolveInheritance;
exports.default = _default;