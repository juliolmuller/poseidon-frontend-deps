"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _start = _interopRequireDefault(require("./start"));

var _end = _interopRequireDefault(require("./end"));

/**
 * Get attributed string length
 *
 * @param  {Object}  glyph string
 * @return {number} end
 */
var length = R.converge(R.subtract, [_end.default, _start.default]);
var _default = length;
exports.default = _default;