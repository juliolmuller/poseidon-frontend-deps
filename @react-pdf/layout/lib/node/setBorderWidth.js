"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.setBorderTop = exports.setBorderRight = exports.setBorderLeft = exports.setBorderBottom = exports.setBorder = exports.default = void 0;

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set border top attribute to node's Yoga instance
 *
 * @param {Number} border top width
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setBorderTop = (0, _setYogaValue.default)('border', _yoga.default.EDGE_TOP);
/**
 * Set border right attribute to node's Yoga instance
 *
 * @param {Number} border right width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setBorderTop = setBorderTop;
var setBorderRight = (0, _setYogaValue.default)('border', _yoga.default.EDGE_RIGHT);
/**
 * Set border bottom attribute to node's Yoga instance
 *
 * @param {Number} border bottom width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setBorderRight = setBorderRight;
var setBorderBottom = (0, _setYogaValue.default)('border', _yoga.default.EDGE_BOTTOM);
/**
 * Set border left attribute to node's Yoga instance
 *
 * @param {Number} border left width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setBorderBottom = setBorderBottom;
var setBorderLeft = (0, _setYogaValue.default)('border', _yoga.default.EDGE_LEFT);
/**
 * Set all border widths at once
 *
 * @param {Number} border width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setBorderLeft = setBorderLeft;

var setBorder = function setBorder(width) {
  return function (node) {
    setBorderTop(width)(node);
    setBorderRight(width)(node);
    setBorderBottom(width)(node);
    setBorderLeft(width)(node);
    return node;
  };
};

exports.setBorder = setBorder;
var _default = setBorder;
exports.default = _default;