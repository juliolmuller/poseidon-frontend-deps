"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

var getProp = function getProp(d, p, v) {
  return R.pathOr(d, ['props', p], v);
};

var renderRect = function renderRect(ctx) {
  return function (node) {
    var x = getProp(0, 'x', node);
    var y = getProp(0, 'y', node);
    var rx = getProp(0, 'rx', node);
    var ry = getProp(0, 'ry', node);
    var width = getProp(0, 'width', node);
    var height = getProp(0, 'height', node);
    if (!width || !height) return node;

    if (rx && ry) {
      var krx = rx * KAPPA;
      var kry = ry * KAPPA;
      ctx.moveTo(x + rx, y);
      ctx.lineTo(x - rx + width, y);
      ctx.bezierCurveTo(x - rx + width + krx, y, x + width, y + ry - kry, x + width, y + ry);
      ctx.lineTo(x + width, y + height - ry);
      ctx.bezierCurveTo(x + width, y + height - ry + kry, x - rx + width + krx, y + height, x - rx + width, y + height);
      ctx.lineTo(x + rx, y + height);
      ctx.bezierCurveTo(x + rx - krx, y + height, x, y + height - ry + kry, x, y + height - ry);
      ctx.lineTo(x, y + ry);
      ctx.bezierCurveTo(x, y + ry - kry, x + rx - krx, y, x + rx, y);
    } else {
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
    }

    ctx.closePath();
    return node;
  };
};

var _default = renderRect;
exports.default = _default;