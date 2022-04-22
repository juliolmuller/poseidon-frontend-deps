"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _getMargin = _interopRequireDefault(require("../node/getMargin"));

var _getPadding = _interopRequireDefault(require("../node/getPadding"));

var _isHeightAuto = _interopRequireDefault(require("../page/isHeightAuto"));

/* eslint-disable no-param-reassign */
var SAFETY_HEIGHT = 10;
var getMax = R.reduce(R.max, -Infinity);
/**
 * Helper object to predict canvas size
 * TODO: Implement remaining functions (as close as possible);
 */

var measureCtx = function measureCtx() {
  var ctx = {};
  var points = [];

  var nil = function nil() {
    return ctx;
  };

  var addPoint = function addPoint(x, y) {
    return points.push([x, y]);
  };

  var moveTo = R.compose(nil, addPoint);

  var rect = function rect(x, y, w, h) {
    addPoint(x, y);
    addPoint(x + w, y);
    addPoint(x, y + h);
    addPoint(x + w, y + h);
    return ctx;
  };

  var ellipse = function ellipse(x, y, rx, ry) {
    ry = ry || rx;
    addPoint(x - rx, y - ry);
    addPoint(x + rx, y - ry);
    addPoint(x + rx, y + ry);
    addPoint(x - rx, y + ry);
    return ctx;
  };

  var polygon = function polygon() {
    points.push.apply(points, arguments);
    return nil();
  }; // Change dimensions


  ctx.rect = rect;
  ctx.moveTo = moveTo;
  ctx.lineTo = moveTo;
  ctx.circle = ellipse;
  ctx.polygon = polygon;
  ctx.ellipse = ellipse;
  ctx.roundedRect = rect; // To be implemented

  ctx.text = nil;
  ctx.path = nil;
  ctx.lineWidth = nil;
  ctx.bezierCurveTo = nil;
  ctx.quadraticCurveTo = nil;
  ctx.scale = nil;
  ctx.rotate = nil;
  ctx.translate = nil; // These don't change dimensions

  ctx.dash = nil;
  ctx.clip = nil;
  ctx.save = nil;
  ctx.fill = nil;
  ctx.font = nil;
  ctx.stroke = nil;
  ctx.lineCap = nil;
  ctx.opacity = nil;
  ctx.restore = nil;
  ctx.lineJoin = nil;
  ctx.fontSize = nil;
  ctx.fillColor = nil;
  ctx.miterLimit = nil;
  ctx.strokeColor = nil;
  ctx.fillOpacity = nil;
  ctx.strokeOpacity = nil;
  ctx.linearGradient = nil;
  ctx.radialGradient = nil;

  ctx.getWidth = function () {
    return R.compose(getMax, R.pluck(0))(points);
  };

  ctx.getHeight = function () {
    return R.compose(getMax, R.pluck(1))(points);
  };

  return ctx;
};
/**
 * Yoga canvas measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} canvas width and height
 */


var measureCanvas = function measureCanvas(page, node) {
  var imageMargin = (0, _getMargin.default)(node);
  var pagePadding = (0, _getPadding.default)(page);
  var pageArea = (0, _isHeightAuto.default)(page) ? Infinity : page.box.height - pagePadding.paddingTop - pagePadding.paddingBottom - imageMargin.marginTop - imageMargin.marginBottom - SAFETY_HEIGHT;
  var ctx = measureCtx();
  node.props.paint(ctx);
  var width = ctx.getWidth();
  var height = Math.min(pageArea, ctx.getHeight());
  return {
    height: height,
    width: width
  };
};

var _default = R.curryN(6, measureCanvas);

exports.default = _default;