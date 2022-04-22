"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var R = _interopRequireWildcard(require("ramda"));

var availableMethods = ['dash', 'clip', 'save', 'path', 'fill', 'font', 'text', 'rect', 'scale', 'moveTo', 'lineTo', 'stroke', 'rotate', 'circle', 'lineCap', 'opacity', 'ellipse', 'polygon', 'restore', 'lineJoin', 'fontSize', 'fillColor', 'lineWidth', 'translate', 'miterLimit', 'strokeColor', 'fillOpacity', 'roundedRect', 'fillAndStroke', 'strokeOpacity', 'bezierCurveTo', 'quadraticCurveTo', 'linearGradient', 'radialGradient'];

var painter = function painter(ctx) {
  var p = availableMethods.reduce(function (acc, prop) {
    var _extends2;

    return (0, _extends3.default)({}, acc, (_extends2 = {}, _extends2[prop] = function () {
      ctx[prop].apply(ctx, arguments);
      return p;
    }, _extends2));
  }, {});
  return p;
};

var defaultsZero = R.propOr(0);

var renderCanvas = function renderCanvas(ctx, node) {
  var _node$box = node.box,
      top = _node$box.top,
      left = _node$box.left,
      width = _node$box.width,
      height = _node$box.height;
  var paddingTop = defaultsZero('paddingTop', node.box);
  var paddingLeft = defaultsZero('paddingLeft', node.box);
  var paddingRight = defaultsZero('paddingRight', node.box);
  var paddingBottom = defaultsZero('paddingBottom', node.box);
  var availableWidth = width - paddingLeft - paddingRight;
  var availableHeight = height - paddingTop - paddingBottom;

  if (!availableWidth || !availableHeight) {
    console.warn('Canvas element has null width or height. Please provide valid values via the `style` prop in order to correctly render it.');
  }

  ctx.save().translate(left + paddingLeft, top + paddingTop);

  if (node.props.paint) {
    node.props.paint(painter(ctx), availableWidth, availableHeight);
  }

  ctx.restore();
  return node;
};

var _default = R.curryN(2, renderCanvas);

exports.default = _default;