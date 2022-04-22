"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Return run advance width
 *
 * @param  {Object}  run
 * @return {number} advance width
 */
var advanceWidth = R.compose(R.reduce(R.useWith(R.add, [R.identity, R.propOr(0, 'xAdvance')]), 0), R.propOr([], 'positions'));
var _default = advanceWidth;
exports.default = _default;