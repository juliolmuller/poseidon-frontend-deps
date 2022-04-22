"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _renderPolyline = _interopRequireDefault(require("./renderPolyline"));

var closePath = function closePath(ctx) {
  return R.tap(function () {
    return ctx.closePath();
  });
};

var renderPolygon = function renderPolygon(ctx) {
  return R.compose(closePath(ctx), (0, _renderPolyline.default)(ctx));
};

var _default = renderPolygon;
exports.default = _default;