"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var renderPath = function renderPath(ctx) {
  return R.tap(function (node) {
    var d = R.path(['props', 'd'], node);
    if (d) ctx.path(node.props.d);
  });
};

var _default = renderPath;
exports.default = _default;