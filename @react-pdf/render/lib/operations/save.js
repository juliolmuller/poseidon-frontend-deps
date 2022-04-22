"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var save = function save(ctx, node) {
  ctx.save();
  return node;
};

var _default = R.curryN(2, save);

exports.default = _default;