"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _reduce = _interopRequireDefault(require("./reduce"));

var _descent = _interopRequireDefault(require("../run/descent"));

/**
 * Returns attributed string descent
 *
 * @param {Object} attributed string
 * @return {number} descent
 */
var descent = (0, _reduce.default)(R.min, _descent.default);
var _default = descent;
exports.default = _default;