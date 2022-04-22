"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _castFloat = _interopRequireDefault(require("../utils/castFloat"));

var _offsetKeyword = _interopRequireDefault(require("../utils/offsetKeyword"));

var transformTransformOrigin = function transformTransformOrigin(value) {
  return (0, _offsetKeyword.default)(value) || (0, _castFloat.default)(value);
};

var _default = transformTransformOrigin;
exports.default = _default;