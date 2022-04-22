"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var _layoutText = _interopRequireDefault(require("./layoutText"));

var _linesWidth = _interopRequireDefault(require("./linesWidth"));

var _linesHeight = _interopRequireDefault(require("./linesHeight"));

/* eslint-disable no-param-reassign */
var ALIGNMENT_FACTORS = {
  center: 0.5,
  right: 1
};
/**
 * Yoga text measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} text width and height
 */

var measureText = function measureText(page, node, fontStore, width, widthMode, height) {
  if (widthMode === _yoga.default.MEASURE_MODE_EXACTLY) {
    if (!node.lines) node.lines = (0, _layoutText.default)(node, width, height, fontStore);
    return {
      height: (0, _linesHeight.default)(node)
    };
  }

  if (widthMode === _yoga.default.MEASURE_MODE_AT_MOST) {
    var _node$style;

    var alignFactor = ALIGNMENT_FACTORS[(_node$style = node.style) === null || _node$style === void 0 ? void 0 : _node$style.textAlign] || 0;

    if (!node.lines) {
      node.lines = (0, _layoutText.default)(node, width, height, fontStore);
      node.alignOffset = (width - (0, _linesWidth.default)(node)) * alignFactor; // Compensate align in variable width containers
    }

    return {
      height: (0, _linesHeight.default)(node),
      width: Math.min(width, (0, _linesWidth.default)(node))
    };
  }

  return {};
};

var _default = R.curryN(7, measureText);

exports.default = _default;