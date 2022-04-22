"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _save = _interopRequireDefault(require("../operations/save"));

var _restore = _interopRequireDefault(require("../operations/restore"));

var _clipNode = _interopRequireDefault(require("../operations/clipNode"));

var _parseColor = _interopRequireDefault(require("../utils/parseColor"));

var drawBackground = function drawBackground(ctx, node) {
  if (node.box && node.style.backgroundColor) {
    var _node$style;

    var _node$box = node.box,
        top = _node$box.top,
        left = _node$box.left,
        width = _node$box.width,
        height = _node$box.height;
    var color = (0, _parseColor.default)(node.style.backgroundColor);
    var nodeOpacity = R.isNil((_node$style = node.style) === null || _node$style === void 0 ? void 0 : _node$style.opacity) ? 1 : node.style.opacity;
    var opacity = Math.min(color.opacity, nodeOpacity);
    ctx.fillOpacity(opacity).fillColor(color.value).rect(left, top, width, height).fill();
  }

  return node;
};

var renderBackground = function renderBackground(ctx, node) {
  var _node$style2;

  var hasBackground = !!node.box && !!((_node$style2 = node.style) !== null && _node$style2 !== void 0 && _node$style2.backgroundColor);

  if (hasBackground) {
    (0, _save.default)(ctx, node);
    (0, _clipNode.default)(ctx, node);
    drawBackground(ctx, node);
    (0, _restore.default)(ctx, node);
  }

  return node;
};

var _default = R.curryN(2, renderBackground);

exports.default = _default;