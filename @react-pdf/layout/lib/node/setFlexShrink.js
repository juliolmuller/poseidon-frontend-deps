"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set flex shrink attribute to node's Yoga instance
 *
 * @param {Number} flex shrink value
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setFlexShrink = R.compose((0, _setYogaValue.default)('flexShrink'), R.defaultTo(1));
var _default = setFlexShrink;
exports.default = _default;