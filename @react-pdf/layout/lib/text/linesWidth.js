"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _attributedString = _interopRequireDefault(require("@react-pdf/textkit/lib/attributedString"));

/**
 * Get lines width (if any)
 *
 * @param {Object} node
 * @returns {Number} lines width
 */
var linesWidth = function linesWidth(node) {
  if (!node.lines) return -1;
  return Math.max.apply(Math, node.lines.map(function (line) {
    return _attributedString.default.advanceWidth(line);
  }));
};

var _default = linesWidth;
exports.default = _default;