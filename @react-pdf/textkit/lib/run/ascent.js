"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _scale = _interopRequireDefault(require("./scale"));

var getFontAscent = R.ifElse(R.has('attributes'), R.pathOr(0, ['attributes', 'font', 'ascent']), R.always(0));
/**
 * Get run ascent
 *
 * @param  {Object}  run
 * @return {boolean} ascent
 */

var ascent = R.converge(R.max, [R.pathOr(0, ['attributes', 'attachment', 'height']), R.converge(R.multiply, [_scale.default, getFontAscent])]);
var _default = ascent;
exports.default = _default;