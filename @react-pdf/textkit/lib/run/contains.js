"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _isBetween = _interopRequireDefault(require("../utils/isBetween"));

/**
 * Checks if run contains value
 *
 * @param  {number}  value
 * @param  {Object}  run
 * @return {boolean} runs contains value
 */
var contains = (0, _isBetween.default)(R.prop('start'), R.prop('end'));
var _default = contains;
exports.default = _default;