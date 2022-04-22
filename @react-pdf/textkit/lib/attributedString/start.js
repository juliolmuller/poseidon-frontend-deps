"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Get attributed string start value
 *
 * @param  {Object}  glyph string
 * @return {number} start
 */
var start = R.ifElse(R.pathEq(['runs', 'length'], 0), R.always(0), R.path(['runs', 0, 'start']));
var _default = start;
exports.default = _default;