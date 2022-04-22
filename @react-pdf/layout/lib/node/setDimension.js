"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.setWidth = exports.setMinWidth = exports.setMinHeight = exports.setMaxWidth = exports.setMaxHeight = exports.setHeight = void 0;

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set width to node's Yoga instance
 *
 * @param {Number} width
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setWidth = (0, _setYogaValue.default)('width');
/**
 * Set min width to node's Yoga instance
 *
 * @param {Number} min width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setWidth = setWidth;
var setMinWidth = (0, _setYogaValue.default)('minWidth');
/**
 * Set max width to node's Yoga instance
 *
 * @param {Number} max width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMinWidth = setMinWidth;
var setMaxWidth = (0, _setYogaValue.default)('maxWidth');
/**
 * Set height to node's Yoga instance
 *
 * @param {Number} height
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMaxWidth = setMaxWidth;
var setHeight = (0, _setYogaValue.default)('height');
/**
 * Set min height to node's Yoga instance
 *
 * @param {Number} min height
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setHeight = setHeight;
var setMinHeight = (0, _setYogaValue.default)('minHeight');
/**
 * Set max height to node's Yoga instance
 *
 * @param {Number} max height
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMinHeight = setMinHeight;
var setMaxHeight = (0, _setYogaValue.default)('maxHeight');
exports.setMaxHeight = setMaxHeight;