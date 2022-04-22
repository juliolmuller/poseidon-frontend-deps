"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _save = _interopRequireDefault(require("../operations/save"));

var _restore = _interopRequireDefault(require("../operations/restore"));

var drawImage = function drawImage(ctx) {
  return function (node) {
    var _node$props = node.props,
        x = _node$props.x,
        y = _node$props.y;
    var _node$style = node.style,
        width = _node$style.width,
        height = _node$style.height,
        opacity = _node$style.opacity;
    var paddingTop = node.box.paddingLeft || 0;
    var paddingLeft = node.box.paddingLeft || 0;

    if (node.image.data) {
      if (width !== 0 && height !== 0) {
        ctx.fillOpacity(opacity || 1).image(node.image.data, x + paddingLeft, y + paddingTop, {
          width: width,
          height: height
        });
      } else {
        console.warn("Image with src '" + node.props.href + "' skipped due to invalid dimensions");
      }
    }

    return node;
  };
};

var renderImage = function renderImage(ctx, node) {
  R.compose((0, _restore.default)(ctx), drawImage(ctx), (0, _save.default)(ctx))(node);
  return node;
};

var _default = R.curryN(2, renderImage);

exports.default = _default;