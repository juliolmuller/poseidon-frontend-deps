"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

// This constant is used to approximate a symmetrical arc using a cubic
// Bezier curve.
var KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

var clipNode = function clipNode(ctx, node) {
  if (!node.style) return node;
  var _node$box = node.box,
      top = _node$box.top,
      left = _node$box.left,
      width = _node$box.width,
      height = _node$box.height;
  var _node$style = node.style,
      _node$style$borderTop = _node$style.borderTopLeftRadius,
      borderTopLeftRadius = _node$style$borderTop === void 0 ? 0 : _node$style$borderTop,
      _node$style$borderTop2 = _node$style.borderTopRightRadius,
      borderTopRightRadius = _node$style$borderTop2 === void 0 ? 0 : _node$style$borderTop2,
      _node$style$borderBot = _node$style.borderBottomRightRadius,
      borderBottomRightRadius = _node$style$borderBot === void 0 ? 0 : _node$style$borderBot,
      _node$style$borderBot2 = _node$style.borderBottomLeftRadius,
      borderBottomLeftRadius = _node$style$borderBot2 === void 0 ? 0 : _node$style$borderBot2; // Border top

  var rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
  var ctr = rtr * (1.0 - KAPPA);
  ctx.moveTo(left + rtr, top);
  ctx.lineTo(left + width - rtr, top);
  ctx.bezierCurveTo(left + width - ctr, top, left + width, top + ctr, left + width, top + rtr); // Border right

  var rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
  var cbr = rbr * (1.0 - KAPPA);
  ctx.lineTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(left + width, top + height - cbr, left + width - cbr, top + height, left + width - rbr, top + height); // Border bottom

  var rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
  var cbl = rbl * (1.0 - KAPPA);
  ctx.lineTo(left + rbl, top + height);
  ctx.bezierCurveTo(left + cbl, top + height, left, top + height - cbl, left, top + height - rbl); // Border left

  var rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
  var ctl = rtl * (1.0 - KAPPA);
  ctx.lineTo(left, top + rtl);
  ctx.bezierCurveTo(left, top + ctl, left + ctl, top, left + rtl, top);
  ctx.closePath();
  ctx.clip();
  return node;
};

var _default = R.curryN(2, clipNode);

exports.default = _default;