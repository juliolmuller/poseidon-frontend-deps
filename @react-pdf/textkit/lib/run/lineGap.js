"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _scale = _interopRequireDefault(require("./scale"));

/**
 * Get run lineGap
 *
 * @param  {Object}  run
 * @return {number} lineGap
 */
var lineGap = R.converge(R.multiply, [_scale.default, R.pathOr(0, ['attributes', 'font', 'lineGap'])]);
var _default = lineGap;
exports.default = _default;