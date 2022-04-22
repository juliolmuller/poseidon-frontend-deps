"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var getAspectRatio = function getAspectRatio(viewbox) {
  if (!viewbox) return null;
  return (viewbox.maxX - viewbox.minX) / (viewbox.maxY - viewbox.minY);
};
/**
 * Yoga svg measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} canvas width and height
 */


var measureCanvas = function measureCanvas(page, node, width, widthMode, height, heightMode) {
  var aspectRatio = getAspectRatio(node.props.viewBox) || 1;

  if (widthMode === _yoga.default.MEASURE_MODE_EXACTLY || widthMode === _yoga.default.MEASURE_MODE_AT_MOST) {
    return {
      width: width,
      height: width / aspectRatio
    };
  }

  if (heightMode === _yoga.default.MEASURE_MODE_EXACTLY) {
    return {
      width: height * aspectRatio
    };
  }

  return {};
};

var _default = R.curryN(6, measureCanvas);

exports.default = _default;