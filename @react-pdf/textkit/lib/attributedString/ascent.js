"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _reduce = _interopRequireDefault(require("./reduce"));

var _ascent = _interopRequireDefault(require("../run/ascent"));

/**
 * Returns attributed string ascent
 *
 * @param {Object} attributed string
 * @return {number} ascent
 */
var ascent = (0, _reduce.default)(R.max, _ascent.default);
var _default = ascent;
exports.default = _default;