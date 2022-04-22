"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _colorString = _interopRequireDefault(require("color-string"));

var parseColor = function parseColor(hex) {
  var parsed = _colorString.default.get(hex);

  var value = _colorString.default.to.hex(parsed.value.slice(0, 3));

  var opacity = parsed.value[3];
  return {
    value: value,
    opacity: opacity
  };
};

var _default = parseColor;
exports.default = _default;