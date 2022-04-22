"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _setPadding = _interopRequireDefault(require("./setPadding"));

/**
 * Removes padding on node
 *
 * @param {Object} node
 * @returns {Object} node without padding
 */
var removePaddings = R.compose((0, _setPadding.default)(0), R.dissocPath(['style', 'padding']), R.dissocPath(['style', 'paddingTop']), R.dissocPath(['style', 'paddingRight']), R.dissocPath(['style', 'paddingBottom']), R.dissocPath(['style', 'paddingLeft']), R.dissocPath(['style', 'paddingHorizontal']), R.dissocPath(['style', 'paddingVertical']));
var _default = removePaddings;
exports.default = _default;