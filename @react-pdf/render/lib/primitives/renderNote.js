"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var renderNote = function renderNote(ctx, node) {
  var _node$children;

  var _node$box = node.box,
      top = _node$box.top,
      left = _node$box.left;
  var value = (node === null || node === void 0 ? void 0 : (_node$children = node.children) === null || _node$children === void 0 ? void 0 : _node$children[0].value) || '';
  ctx.note(left, top, 0, 0, value);
  return node;
};

var _default = R.curryN(2, renderNote);

exports.default = _default;