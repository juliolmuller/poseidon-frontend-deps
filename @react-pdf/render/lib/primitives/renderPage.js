"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var renderPage = function renderPage(ctx, node) {
  var _node$box = node.box,
      width = _node$box.width,
      height = _node$box.height;
  ctx.addPage({
    size: [width, height],
    margin: 0
  });
  return node;
};

var _default = R.curryN(2, renderPage);

exports.default = _default;