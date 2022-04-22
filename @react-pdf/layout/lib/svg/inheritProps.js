"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var SVG_INHERITED_PROPS = ['x', 'y', 'clipPath', 'clipRule', 'opacity', 'fill', 'fillOpacity', 'fillRule', 'stroke', 'strokeLinecap', 'strokeLinejoin', 'strokeOpacity', 'strokeWidth', 'textAnchor', 'dominantBaseline', 'color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'letterSpacing', 'opacity', 'textDecoration', 'lineHeight', 'textAlign', 'visibility', 'wordSpacing'];

var getInheritProps = function getInheritProps(node) {
  var props = node.props || {};
  return R.pick(SVG_INHERITED_PROPS, props);
};

var inheritProps = function inheritProps(node) {
  var props = getInheritProps(node);
  return R.evolve({
    children: R.map(R.compose(inheritProps, R.evolve({
      props: R.merge(props)
    })))
  })(node);
};

var _default = inheritProps;
exports.default = _default;