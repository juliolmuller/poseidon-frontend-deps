"use strict";

exports.__esModule = true;
exports.default = void 0;
var BORDER_SHORTHAND_REGEX = /(-?\d+(\.\d+)?(px|in|mm|cm|pt|vw|vh|px)?)\s(\S+)\s(.+)/;

var matchBorderShorthand = function matchBorderShorthand(value) {
  return value.match(BORDER_SHORTHAND_REGEX) || [];
};

var expandBorders = function expandBorders(key, value) {
  var match = matchBorderShorthand("" + value);

  if (match) {
    var color = match[5] || value;
    var style = match[4] || value;
    var width = match[1] || value;

    if (key.match(/(Top|Right|Bottom|Left)$/)) {
      var _ref;

      return _ref = {}, _ref[key + "Color"] = color, _ref[key + "Style"] = style, _ref[key + "Width"] = width, _ref;
    }

    if (key.match(/Color$/)) {
      return {
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: color
      };
    }

    if (key.match(/Style$/)) {
      return {
        borderTopStyle: style,
        borderRightStyle: style,
        borderBottomStyle: style,
        borderLeftStyle: style
      };
    }

    if (key.match(/Width$/)) {
      return {
        borderTopWidth: width,
        borderRightWidth: width,
        borderBottomWidth: width,
        borderLeftWidth: width
      };
    }

    if (key.match(/Radius$/)) {
      return {
        borderTopLeftRadius: value,
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
        borderBottomLeftRadius: value
      };
    }

    return {
      borderTopColor: color,
      borderTopStyle: style,
      borderTopWidth: width,
      borderRightColor: color,
      borderRightStyle: style,
      borderRightWidth: width,
      borderBottomColor: color,
      borderBottomStyle: style,
      borderBottomWidth: width,
      borderLeftColor: color,
      borderLeftStyle: style,
      borderLeftWidth: width
    };
  }

  return value;
};

var _default = expandBorders;
exports.default = _default;