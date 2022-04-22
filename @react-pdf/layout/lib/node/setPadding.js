"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.setPaddingTop = exports.setPaddingRight = exports.setPaddingLeft = exports.setPaddingBottom = exports.setPadding = exports.default = void 0;

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set padding top attribute to node's Yoga instance
 *
 * @param {Number} padding top
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setPaddingTop = (0, _setYogaValue.default)('padding', _yoga.default.EDGE_TOP);
/**
 * Set padding right attribute to node's Yoga instance
 *
 * @param {Number} padding right
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPaddingTop = setPaddingTop;
var setPaddingRight = (0, _setYogaValue.default)('padding', _yoga.default.EDGE_RIGHT);
/**
 * Set padding bottom attribute to node's Yoga instance
 *
 * @param {Number} padding bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPaddingRight = setPaddingRight;
var setPaddingBottom = (0, _setYogaValue.default)('padding', _yoga.default.EDGE_BOTTOM);
/**
 * Set padding left attribute to node's Yoga instance
 *
 * @param {Number} padding left
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPaddingBottom = setPaddingBottom;
var setPaddingLeft = (0, _setYogaValue.default)('padding', _yoga.default.EDGE_LEFT);
/**
 * Set all paddings at once
 *
 * @param {Number} margin
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPaddingLeft = setPaddingLeft;

var setPadding = function setPadding(padding) {
  return function (node) {
    setPaddingTop(padding)(node);
    setPaddingRight(padding)(node);
    setPaddingBottom(padding)(node);
    setPaddingLeft(padding)(node);
    return node;
  };
};

exports.setPadding = setPadding;
var _default = setPadding;
exports.default = _default;