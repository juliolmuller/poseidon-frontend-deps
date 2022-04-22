"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _stylesheet = require("@react-pdf/stylesheet");

var _layoutText = _interopRequireDefault(require("../svg/layoutText"));

var _replaceDefs = _interopRequireDefault(require("../svg/replaceDefs"));

var _getContainer = _interopRequireDefault(require("../svg/getContainer"));

var _parseViewbox = _interopRequireDefault(require("../svg/parseViewbox"));

var _inheritProps = _interopRequireDefault(require("../svg/inheritProps"));

var _matchPercent = _interopRequireDefault(require("../utils/matchPercent"));

var _parseAspectRatio = _interopRequireDefault(require("../svg/parseAspectRatio"));

var STYLE_PROPS = ['width', 'height', 'color', 'stroke', 'strokeWidth', 'opacity', 'fillOpacity', 'strokeOpacity', 'fill', 'fillRule', 'clipPath', 'offset', 'transform', 'strokeLinejoin', 'strokeLinecap', 'strokeDasharray'];
var VERTICAL_PROPS = ['y', 'y1', 'y2', 'height', 'cy', 'ry'];
var HORIZONTAL_PROPS = ['x', 'x1', 'x2', 'width', 'cx', 'rx'];
var isType = R.propEq('type');
var isSvg = isType(P.Svg);
var isText = isType(P.Text);
var isTextInstance = isType(P.TextInstance);

var transformPercent = function transformPercent(container) {
  return R.mapObjIndexed(function (value, key) {
    var match = (0, _matchPercent.default)(value);

    if (match && VERTICAL_PROPS.includes(key)) {
      return match.percent * container.height;
    }

    if (match && HORIZONTAL_PROPS.includes(key)) {
      return match.percent * container.width;
    }

    return value;
  });
};

var parsePercent = function parsePercent(value) {
  var match = (0, _matchPercent.default)(value);
  return match ? match.percent : parseFloat(value);
};

var parseProps = function parseProps(container) {
  return R.compose(R.evolve({
    props: R.o(R.evolve({
      x: parseFloat,
      x1: parseFloat,
      x2: parseFloat,
      y: parseFloat,
      y1: parseFloat,
      y2: parseFloat,
      r: parseFloat,
      rx: parseFloat,
      ry: parseFloat,
      cx: parseFloat,
      cy: parseFloat,
      width: parseFloat,
      height: parseFloat,
      offset: parsePercent,
      fill: _stylesheet.transformColor,
      opacity: parsePercent,
      stroke: _stylesheet.transformColor,
      stopOpacity: parsePercent,
      stopColor: _stylesheet.transformColor,
      transform: _stylesheet.processTransform
    }), transformPercent(container))
  }));
};

var mergeStyles = function mergeStyles(node) {
  var style = node.style || {};
  return R.evolve({
    props: R.merge(style)
  }, node);
};

var removeNoneValues = R.evolve({
  props: R.map(R.when(R.equals('none'), R.always(null)))
});

var pickStyleProps = function pickStyleProps(node) {
  var props = node.props || {};
  var styleProps = R.pick(STYLE_PROPS, props);
  return R.evolve({
    style: R.merge(styleProps)
  }, node);
};

var parseSvgProps = R.evolve({
  props: R.evolve({
    width: parseFloat,
    height: parseFloat,
    viewBox: _parseViewbox.default,
    preserveAspectRatio: _parseAspectRatio.default
  })
});

var wrapBetweenTspan = function wrapBetweenTspan(node) {
  return {
    type: P.Tspan,
    props: {},
    children: [node]
  };
};

var addMissingTspan = R.when(isText, R.evolve({
  children: R.map(R.when(isTextInstance, wrapBetweenTspan))
}));

var resolveSvgNode = function resolveSvgNode(container) {
  return R.compose(parseProps(container), addMissingTspan, removeNoneValues, mergeStyles);
};

var resolveChildren = function resolveChildren(container) {
  return function (node) {
    return R.evolve({
      children: R.map(R.compose(resolveChildren(container), resolveSvgNode(container)))
    })(node);
  };
};

var parseText = function parseText(fontStore) {
  return function (node) {
    return R.ifElse(isText, (0, _layoutText.default)(fontStore), R.evolve({
      children: R.map(parseText(fontStore))
    }))(node);
  };
};

var resolveSvgRoot = function resolveSvgRoot(fontStore) {
  return function (node) {
    var container = (0, _getContainer.default)(node);
    return R.compose(_replaceDefs.default, parseText(fontStore), parseSvgProps, pickStyleProps, _inheritProps.default, resolveChildren(container))(node);
  };
};
/**
 * Pre-process SVG nodes so they can be rendered in the next steps
 *
 * @param {Object} root node
 * @param {Object} fontStore font store
 * @returns {Object} root node
 */


var resolveSvg = function resolveSvg(node, fontStore) {
  var mapChild = function mapChild(child) {
    return resolveSvg(child, fontStore);
  };

  return R.compose(R.evolve({
    children: R.map(mapChild)
  }), R.when(isSvg, resolveSvgRoot(fontStore)))(node);
};

var _default = resolveSvg;
exports.default = _default;