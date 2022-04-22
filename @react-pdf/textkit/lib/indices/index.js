"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _append = _interopRequireDefault(require("./append"));

var _normalize = _interopRequireDefault(require("./normalize"));

var _prepend = _interopRequireDefault(require("./prepend"));

var _resolve = _interopRequireDefault(require("./resolve"));

var _default = {
  append: _append.default,
  normalize: _normalize.default,
  prepend: _prepend.default,
  resolve: _resolve.default
};
exports.default = _default;