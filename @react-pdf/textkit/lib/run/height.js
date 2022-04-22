"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _ascent = _interopRequireDefault(require("./ascent"));

var _descent = _interopRequireDefault(require("./descent"));

var _lineGap = _interopRequireDefault(require("./lineGap"));

/**
 * Get run height
 *
 * @param  {Object}  run
 * @return {number} height
 */
var height = R.either(R.path(['attributes', 'lineHeight']), R.compose(R.sum, R.juxt([_ascent.default, R.o(R.negate, _descent.default), _lineGap.default])));
var _default = height;
exports.default = _default;