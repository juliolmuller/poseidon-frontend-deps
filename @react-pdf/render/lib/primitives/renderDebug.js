"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _save = _interopRequireDefault(require("../operations/save"));

var _restore = _interopRequireDefault(require("../operations/restore"));

var CONTENT_COLOR = '#a1c6e7';
var PADDING_COLOR = '#c4deb9';
var MARGIN_COLOR = '#f8cca1';
var shouldDebug = R.pathEq(['props', 'debug'], true); // TODO: Draw debug boxes using clipping to enhance quality

var debugContent = function debugContent(ctx) {
  return function (node) {
    var _node$box = node.box,
        left = _node$box.left,
        top = _node$box.top,
        width = _node$box.width,
        height = _node$box.height,
        _node$box$paddingLeft = _node$box.paddingLeft,
        paddingLeft = _node$box$paddingLeft === void 0 ? 0 : _node$box$paddingLeft,
        _node$box$paddingTop = _node$box.paddingTop,
        paddingTop = _node$box$paddingTop === void 0 ? 0 : _node$box$paddingTop,
        _node$box$paddingRigh = _node$box.paddingRight,
        paddingRight = _node$box$paddingRigh === void 0 ? 0 : _node$box$paddingRigh,
        _node$box$paddingBott = _node$box.paddingBottom,
        paddingBottom = _node$box$paddingBott === void 0 ? 0 : _node$box$paddingBott,
        _node$box$borderLeftW = _node$box.borderLeftWidth,
        borderLeftWidth = _node$box$borderLeftW === void 0 ? 0 : _node$box$borderLeftW,
        _node$box$borderTopWi = _node$box.borderTopWidth,
        borderTopWidth = _node$box$borderTopWi === void 0 ? 0 : _node$box$borderTopWi,
        _node$box$borderRight = _node$box.borderRightWidth,
        borderRightWidth = _node$box$borderRight === void 0 ? 0 : _node$box$borderRight,
        _node$box$borderBotto = _node$box.borderBottomWidth,
        borderBottomWidth = _node$box$borderBotto === void 0 ? 0 : _node$box$borderBotto;
    ctx.fillColor(CONTENT_COLOR).opacity(0.5).rect(left + paddingLeft + borderLeftWidth, top + paddingTop + borderTopWidth, width - paddingLeft - paddingRight - borderRightWidth - borderLeftWidth, height - paddingTop - paddingBottom - borderTopWidth - borderBottomWidth).fill();
    return node;
  };
};

var debugPadding = function debugPadding(ctx) {
  return function (node) {
    var _node$box2 = node.box,
        left = _node$box2.left,
        top = _node$box2.top,
        width = _node$box2.width,
        height = _node$box2.height,
        _node$box2$paddingLef = _node$box2.paddingLeft,
        paddingLeft = _node$box2$paddingLef === void 0 ? 0 : _node$box2$paddingLef,
        _node$box2$paddingTop = _node$box2.paddingTop,
        paddingTop = _node$box2$paddingTop === void 0 ? 0 : _node$box2$paddingTop,
        _node$box2$paddingRig = _node$box2.paddingRight,
        paddingRight = _node$box2$paddingRig === void 0 ? 0 : _node$box2$paddingRig,
        _node$box2$paddingBot = _node$box2.paddingBottom,
        paddingBottom = _node$box2$paddingBot === void 0 ? 0 : _node$box2$paddingBot,
        _node$box2$borderLeft = _node$box2.borderLeftWidth,
        borderLeftWidth = _node$box2$borderLeft === void 0 ? 0 : _node$box2$borderLeft,
        _node$box2$borderTopW = _node$box2.borderTopWidth,
        borderTopWidth = _node$box2$borderTopW === void 0 ? 0 : _node$box2$borderTopW,
        _node$box2$borderRigh = _node$box2.borderRightWidth,
        borderRightWidth = _node$box2$borderRigh === void 0 ? 0 : _node$box2$borderRigh,
        _node$box2$borderBott = _node$box2.borderBottomWidth,
        borderBottomWidth = _node$box2$borderBott === void 0 ? 0 : _node$box2$borderBott;
    ctx.fillColor(PADDING_COLOR).opacity(0.5); // Padding top

    ctx.rect(left + paddingLeft + borderLeftWidth, top + borderTopWidth, width - paddingRight - paddingLeft - borderLeftWidth - borderRightWidth, paddingTop).fill(); // Padding left

    ctx.rect(left + borderLeftWidth, top + borderTopWidth, paddingLeft, height - borderTopWidth - borderBottomWidth).fill(); // Padding right

    ctx.rect(left + width - paddingRight - borderRightWidth, top + borderTopWidth, paddingRight, height - borderTopWidth - borderBottomWidth).fill(); // Padding bottom

    ctx.rect(left + paddingLeft + borderLeftWidth, top + height - paddingBottom - borderBottomWidth, width - paddingRight - paddingLeft - borderLeftWidth - borderRightWidth, paddingBottom).fill();
    return node;
  };
};

var getMargin = function getMargin(box) {
  var marginLeft = box.marginLeft === 'auto' ? 0 : box.marginLeft;
  var marginTop = box.marginTop === 'auto' ? 0 : box.marginTop;
  var marginRight = box.marginRight === 'auto' ? 0 : box.marginRight;
  var marginBottom = box.marginBottom === 'auto' ? 0 : box.marginBottom;
  return {
    marginLeft: marginLeft,
    marginTop: marginTop,
    marginRight: marginRight,
    marginBottom: marginBottom
  };
};

var debugMargin = function debugMargin(ctx) {
  return function (node) {
    var _node$box3 = node.box,
        left = _node$box3.left,
        top = _node$box3.top,
        width = _node$box3.width,
        height = _node$box3.height;

    var _getMargin = getMargin(node.box),
        _getMargin$marginLeft = _getMargin.marginLeft,
        marginLeft = _getMargin$marginLeft === void 0 ? 0 : _getMargin$marginLeft,
        _getMargin$marginTop = _getMargin.marginTop,
        marginTop = _getMargin$marginTop === void 0 ? 0 : _getMargin$marginTop,
        _getMargin$marginRigh = _getMargin.marginRight,
        marginRight = _getMargin$marginRigh === void 0 ? 0 : _getMargin$marginRigh,
        _getMargin$marginBott = _getMargin.marginBottom,
        marginBottom = _getMargin$marginBott === void 0 ? 0 : _getMargin$marginBott;

    ctx.fillColor(MARGIN_COLOR).opacity(0.5); // Margin top

    ctx.rect(left, top - marginTop, width, marginTop).fill(); // Margin left

    ctx.rect(left - marginLeft, top - marginTop, marginLeft, height + marginTop + marginBottom).fill(); // Margin right

    ctx.rect(left + width, top - marginTop, marginRight, height + marginTop + marginBottom).fill(); // Margin bottom

    ctx.rect(left, top + height, width, marginBottom).fill();
    return node;
  };
};

var debugText = function debugText(ctx) {
  return function (node) {
    var _node$box4 = node.box,
        left = _node$box4.left,
        top = _node$box4.top,
        width = _node$box4.width,
        height = _node$box4.height;

    var _getMargin2 = getMargin(node.box),
        _getMargin2$marginLef = _getMargin2.marginLeft,
        marginLeft = _getMargin2$marginLef === void 0 ? 0 : _getMargin2$marginLef,
        _getMargin2$marginTop = _getMargin2.marginTop,
        marginTop = _getMargin2$marginTop === void 0 ? 0 : _getMargin2$marginTop,
        _getMargin2$marginRig = _getMargin2.marginRight,
        marginRight = _getMargin2$marginRig === void 0 ? 0 : _getMargin2$marginRig,
        _getMargin2$marginBot = _getMargin2.marginBottom,
        marginBottom = _getMargin2$marginBot === void 0 ? 0 : _getMargin2$marginBot;

    var roundedWidth = Math.round(width + marginLeft + marginRight);
    var roundedHeight = Math.round(height + marginTop + marginBottom);
    ctx.fontSize(6).opacity(1).fillColor('black').text(roundedWidth + " x " + roundedHeight, left - marginLeft, Math.max(top - marginTop - 4, 1));
    return node;
  };
};

var debugOrigin = function debugOrigin(ctx) {
  return function (node) {
    if (node.origin) {
      ctx.circle(node.origin.left, node.origin.top, 3).fill('red').circle(node.origin.left, node.origin.top, 5).stroke('red');
    }

    return node;
  };
};

var renderDebug = function renderDebug(ctx) {
  return R.tap(R.when(shouldDebug, R.compose((0, _restore.default)(ctx), debugOrigin(ctx), debugText(ctx), debugMargin(ctx), debugPadding(ctx), debugContent(ctx), (0, _save.default)(ctx))));
};

var _default = renderDebug;
exports.default = _default;