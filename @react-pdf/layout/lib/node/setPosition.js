"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.setPositionTop = exports.setPositionRight = exports.setPositionLeft = exports.setPositionBottom = exports.setPosition = exports.default = void 0;

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set position top attribute to node's Yoga instance
 *
 * @param {Number} position top
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setPositionTop = (0, _setYogaValue.default)('position', _yoga.default.EDGE_TOP);
/**
 * Set position right attribute to node's Yoga instance
 *
 * @param {Number} position right
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPositionTop = setPositionTop;
var setPositionRight = (0, _setYogaValue.default)('position', _yoga.default.EDGE_RIGHT);
/**
 * Set position bottom attribute to node's Yoga instance
 *
 * @param {Number} position bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPositionRight = setPositionRight;
var setPositionBottom = (0, _setYogaValue.default)('position', _yoga.default.EDGE_BOTTOM);
/**
 * Set position left attribute to node's Yoga instance
 *
 * @param {Number} position left
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPositionBottom = setPositionBottom;
var setPositionLeft = (0, _setYogaValue.default)('position', _yoga.default.EDGE_LEFT);
/**
 * Set all positions at once
 *
 * @param {Number} position
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPositionLeft = setPositionLeft;

var setPosition = function setPosition(position) {
  return function (node) {
    setPositionTop(position)(node);
    setPositionRight(position)(node);
    setPositionBottom(position)(node);
    setPositionLeft(position)(node);
    return node;
  };
};

exports.setPosition = setPosition;
var _default = setPosition;
exports.default = _default;