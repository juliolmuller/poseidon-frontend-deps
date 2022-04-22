"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _save = _interopRequireDefault(require("../operations/save"));

var _restore = _interopRequireDefault(require("../operations/restore"));

var _clipNode = _interopRequireDefault(require("../operations/clipNode"));

var _resolveObjectFit2 = _interopRequireDefault(require("../utils/resolveObjectFit"));

var drawImage = function drawImage(ctx) {
  return function (node) {
    var _node$style, _node$style2, _node$style3, _node$style4;

    var _node$box = node.box,
        left = _node$box.left,
        top = _node$box.top;
    var opacity = (_node$style = node.style) === null || _node$style === void 0 ? void 0 : _node$style.opacity;
    var objectFit = (_node$style2 = node.style) === null || _node$style2 === void 0 ? void 0 : _node$style2.objectFit;
    var objectPositionX = (_node$style3 = node.style) === null || _node$style3 === void 0 ? void 0 : _node$style3.objectPositionX;
    var objectPositionY = (_node$style4 = node.style) === null || _node$style4 === void 0 ? void 0 : _node$style4.objectPositionY;
    var paddingTop = node.box.paddingTop || 0;
    var paddingRight = node.box.paddingRight || 0;
    var paddingBottom = node.box.paddingBottom || 0;
    var paddingLeft = node.box.paddingLeft || 0;

    var _resolveObjectFit = (0, _resolveObjectFit2.default)(objectFit, node.box.width - paddingLeft - paddingRight, node.box.height - paddingTop - paddingBottom, node.image.width, node.image.height, objectPositionX, objectPositionY),
        width = _resolveObjectFit.width,
        height = _resolveObjectFit.height,
        xOffset = _resolveObjectFit.xOffset,
        yOffset = _resolveObjectFit.yOffset;

    if (node.image.data) {
      if (width !== 0 && height !== 0) {
        ctx.fillOpacity(opacity || 1).image(node.image.data, left + paddingLeft + xOffset, top + paddingTop + yOffset, {
          width: width,
          height: height
        });
      } else {
        console.warn("Image with src '" + node.props.src + "' skipped due to invalid dimensions");
      }
    }

    return node;
  };
};

var renderImage = function renderImage(ctx, node) {
  R.compose((0, _restore.default)(ctx), drawImage(ctx), (0, _clipNode.default)(ctx), (0, _save.default)(ctx))(node);
  return node;
};

var _default = R.curryN(2, renderImage);

exports.default = _default;