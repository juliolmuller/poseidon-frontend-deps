"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Get attributed string end value
 *
 * @param  {Object}  glyph string
 * @return {number} end
 */
var end = R.ifElse(R.pathEq(['runs', 'length'], 0), R.always(0), R.compose(R.prop('end'), R.last, R.prop('runs')));
var _default = end;
exports.default = _default;