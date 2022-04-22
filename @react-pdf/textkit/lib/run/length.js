"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Get run length
 *
 * @param  {Object}  run
 * @return {number} length
 */
var length = R.converge(R.subtract, [R.prop('end'), R.prop('start')]);
var _default = length;
exports.default = _default;