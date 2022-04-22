"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var getProp = function getProp(p, v) {
  return R.path(['props', p], v);
};

var renderLine = function renderLine(ctx) {
  return function (node) {
    var x1 = getProp('x1', node);
    var y1 = getProp('y1', node);
    var x2 = getProp('x2', node);
    var y2 = getProp('y2', node);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    return node;
  };
};

var _default = renderLine;
exports.default = _default;