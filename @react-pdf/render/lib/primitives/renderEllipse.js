"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.drawEllipse = exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

var getProp = function getProp(p, v) {
  return R.path(['props', p], v);
};

var drawEllipse = function drawEllipse(ctx, cx, cy, rx, ry) {
  var x = cx - rx;
  var y = cy - ry;
  var ox = rx * KAPPA;
  var oy = ry * KAPPA;
  var xe = x + rx * 2;
  var ye = y + ry * 2;
  var xm = x + rx;
  var ym = y + ry;
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  ctx.closePath();
};

exports.drawEllipse = drawEllipse;

var renderEllipse = function renderEllipse(ctx, node) {
  var cx = getProp('cx', node);
  var cy = getProp('cy', node);
  var rx = getProp('rx', node);
  var ry = getProp('ry', node);
  drawEllipse(ctx, cx, cy, rx, ry);
  return node;
};

var _default = R.curryN(2, renderEllipse);

exports.default = _default;