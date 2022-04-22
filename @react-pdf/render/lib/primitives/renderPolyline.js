"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.drawPolyline = exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _parsePoints = _interopRequireDefault(require("../svg/parsePoints"));

var drawPolyline = function drawPolyline(ctx) {
  return function (points) {
    if (points.length > 0) {
      ctx.moveTo(points[0][0], points[0][1]);
      points.slice(1).forEach(function (p) {
        return ctx.lineTo(p[0], p[1]);
      });
    }
  };
};

exports.drawPolyline = drawPolyline;

var renderPolyline = function renderPolyline(ctx) {
  return R.tap(R.compose(drawPolyline(ctx), _parsePoints.default, R.pathOr('', ['props', 'points'])));
};

var _default = renderPolyline;
exports.default = _default;