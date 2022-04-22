"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _scale = _interopRequireDefault(require("./scale"));

var getFontDescent = R.ifElse(R.has('attributes'), R.pathOr(0, ['attributes', 'font', 'descent']), R.always(0));
/**
 * Get run descent
 *
 * @param  {Object}  run
 * @return {number} descent
 */

var descent = R.converge(R.multiply, [_scale.default, getFontDescent]);
var _default = descent;
exports.default = _default;