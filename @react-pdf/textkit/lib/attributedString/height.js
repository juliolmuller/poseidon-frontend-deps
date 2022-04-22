"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _reduce = _interopRequireDefault(require("./reduce"));

var _height = _interopRequireDefault(require("../run/height"));

/**
 * Returns attributed string height
 *
 * @param {Object} attributed string
 * @return {number} height
 */
var height = (0, _reduce.default)(R.max, _height.default);
var _default = height;
exports.default = _default;