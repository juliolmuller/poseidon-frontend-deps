"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.setMarginTop = exports.setMarginRight = exports.setMarginLeft = exports.setMarginBottom = exports.setMargin = exports.default = void 0;

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set margin top attribute to node's Yoga instance
 *
 * @param {Number} margin top
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setMarginTop = (0, _setYogaValue.default)('margin', _yoga.default.EDGE_TOP);
/**
 * Set margin right attribute to node's Yoga instance
 *
 * @param {Number} margin right
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMarginTop = setMarginTop;
var setMarginRight = (0, _setYogaValue.default)('margin', _yoga.default.EDGE_RIGHT);
/**
 * Set margin bottom attribute to node's Yoga instance
 *
 * @param {Number} margin bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMarginRight = setMarginRight;
var setMarginBottom = (0, _setYogaValue.default)('margin', _yoga.default.EDGE_BOTTOM);
/**
 * Set margin left attribute to node's Yoga instance
 *
 * @param {Number} margin left
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMarginBottom = setMarginBottom;
var setMarginLeft = (0, _setYogaValue.default)('margin', _yoga.default.EDGE_LEFT);
/**
 * Set all margins at once
 *
 * @param {Number} margin
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMarginLeft = setMarginLeft;

var setMargin = function setMargin(margin) {
  return function (node) {
    setMarginTop(margin)(node);
    setMarginRight(margin)(node);
    setMarginBottom(margin)(node);
    setMarginLeft(margin)(node);
    return node;
  };
};

exports.setMargin = setMargin;
var _default = setMargin;
exports.default = _default;