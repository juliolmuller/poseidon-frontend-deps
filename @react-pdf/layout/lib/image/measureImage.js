"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var _getRatio = _interopRequireDefault(require("./getRatio"));

var _getMargin = _interopRequireDefault(require("../node/getMargin"));

var _getPadding = _interopRequireDefault(require("../node/getPadding"));

var _isHeightAuto = _interopRequireDefault(require("../page/isHeightAuto"));

var SAFETY_HEIGHT = 10;
/**
 * Yoga image measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} image width and height
 */

var measureImage = function measureImage(page, node, width, widthMode, height, heightMode) {
  var imageRatio = (0, _getRatio.default)(node);
  var imageMargin = (0, _getMargin.default)(node);
  var pagePadding = (0, _getPadding.default)(page);
  var pageArea = (0, _isHeightAuto.default)(page) ? Infinity : page.box.height - pagePadding.paddingTop - pagePadding.paddingBottom - imageMargin.marginTop - imageMargin.marginBottom - SAFETY_HEIGHT; // Skip measure if image data not present yet

  if (!node.image) return {
    width: 0,
    height: 0
  };

  if (widthMode === _yoga.default.MEASURE_MODE_EXACTLY && heightMode === _yoga.default.MEASURE_MODE_UNDEFINED) {
    var scaledHeight = width / imageRatio;
    return {
      height: Math.min(pageArea, scaledHeight)
    };
  }

  if (heightMode === _yoga.default.MEASURE_MODE_EXACTLY && (widthMode === _yoga.default.MEASURE_MODE_AT_MOST || widthMode === _yoga.default.MEASURE_MODE_UNDEFINED)) {
    return {
      width: Math.min(height * imageRatio, width)
    };
  }

  if (widthMode === _yoga.default.MEASURE_MODE_EXACTLY && heightMode === _yoga.default.MEASURE_MODE_AT_MOST) {
    var _scaledHeight = width / imageRatio;

    return {
      height: Math.min(height, pageArea, _scaledHeight)
    };
  }

  if (widthMode === _yoga.default.MEASURE_MODE_AT_MOST && heightMode === _yoga.default.MEASURE_MODE_AT_MOST) {
    if (imageRatio > 1) {
      return {
        width: width,
        height: Math.min(width / imageRatio, height)
      };
    }

    return {
      height: height,
      width: Math.min(height * imageRatio, width)
    };
  }

  return {
    height: height,
    width: width
  };
};

var _default = R.curryN(6, measureImage);

exports.default = _default;