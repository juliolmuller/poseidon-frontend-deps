"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _setAlign = _interopRequireDefault(require("./setAlign"));

/**
 * Set align items attribute to node's Yoga instance
 *
 * @param {String} align value
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setAlignItems = (0, _setAlign.default)('items');
var _default = setAlignItems;
exports.default = _default;