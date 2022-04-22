"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Is run empty (start === end)
 *
 * @param  {Object}  run
 * @return {Object} is run empty
 */
var isEmpty = R.converge(R.equals, [R.prop('start'), R.prop('end')]);
var _default = isEmpty;
exports.default = _default;