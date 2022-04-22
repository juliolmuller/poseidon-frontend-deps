"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _renderEllipse = require("./renderEllipse");

var getProp = function getProp(p, v) {
  return R.path(['props', p], v);
};

var renderCircle = function renderCircle(ctx, node) {
  var cx = getProp('cx', node);
  var cy = getProp('cy', node);
  var r = getProp('r', node);
  (0, _renderEllipse.drawEllipse)(ctx, cx, cy, r, r);
  return node;
};

var _default = R.curryN(2, renderCircle);

exports.default = _default;