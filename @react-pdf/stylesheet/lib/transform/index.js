"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _units = _interopRequireDefault(require("./units"));

var _colors = _interopRequireDefault(require("./colors"));

var _transform = _interopRequireDefault(require("./transform"));

var _fontWeight = _interopRequireDefault(require("./fontWeight"));

var _objectPosition = _interopRequireDefault(require("./objectPosition"));

var _transformOrigin = _interopRequireDefault(require("./transformOrigin"));

var _castFloat = _interopRequireDefault(require("../utils/castFloat"));

var handlers = {
  transform: _transform.default,
  fontWeight: _fontWeight.default,
  objectPositionX: _objectPosition.default,
  objectPositionY: _objectPosition.default,
  transformOriginX: _transformOrigin.default,
  transformOriginY: _transformOrigin.default
};

var transformStyle = function transformStyle(key, value, container) {
  var result = handlers[key] ? handlers[key](value) : value;
  return (0, _colors.default)((0, _units.default)(container, (0, _castFloat.default)(result)));
};
/**
 * Transform styles values
 *
 * @param {Object} styles object
 * @returns {Object} transformed styles
 */


var transform = function transform(container) {
  return function (style) {
    if (!style) return style;
    var propsArray = Object.keys(style);
    var resolvedStyle = {};

    for (var i = 0; i < propsArray.length; i += 1) {
      var key = propsArray[i];
      var value = style[key];
      var transformed = transformStyle(key, value, container);
      resolvedStyle[key] = transformed;
    }

    return resolvedStyle;
  };
};

var _default = transform;
exports.default = _default;