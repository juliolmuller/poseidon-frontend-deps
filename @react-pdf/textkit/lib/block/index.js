"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _height = _interopRequireDefault(require("./height"));

var _slice = _interopRequireDefault(require("./slice"));

var _sliceAtHeight = _interopRequireDefault(require("./sliceAtHeight"));

var _truncate = _interopRequireDefault(require("./truncate"));

var _default = {
  height: _height.default,
  slice: _slice.default,
  sliceAtHeight: _sliceAtHeight.default,
  truncate: _truncate.default
};
exports.default = _default;