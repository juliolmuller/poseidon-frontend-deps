"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Get paragrpah block height
 *
 * @param  {Object}  paragraph block
 * @return {number} paragraph block height
 */
var height = R.compose(R.sum, R.map(R.prop('height')), R.pluck('box'));
var _default = height;
exports.default = _default;