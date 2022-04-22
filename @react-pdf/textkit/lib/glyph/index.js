"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _fromCodePoint = _interopRequireDefault(require("./fromCodePoint"));

var _isWhiteSpace = _interopRequireDefault(require("./isWhiteSpace"));

var _slice = _interopRequireDefault(require("./slice"));

var _default = {
  fromCodePoint: _fromCodePoint.default,
  isWhiteSpace: _isWhiteSpace.default,
  slice: _slice.default
};
exports.default = _default;