"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _reduce = _interopRequireDefault(require("./reduce"));

var _advanceWidth = _interopRequireDefault(require("../run/advanceWidth"));

/**
 * Returns attributed string advancewidth
 *
 * @param {Object} attributed string
 * @return {number} advance width
 */
var advanceWidth = (0, _reduce.default)(R.add, _advanceWidth.default);
var _default = advanceWidth;
exports.default = _default;