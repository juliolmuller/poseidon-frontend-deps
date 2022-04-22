"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Get run font
 *
 * @param  {Object}  run
 * @return {Object} font
 */
var getFont = R.pathOr(null, ['attributes', 'font']);
var _default = getFont;
exports.default = _default;