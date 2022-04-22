"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _trailingOffset = _interopRequireDefault(require("../run/trailingOffset"));

/**
 * Get attributed string trailing white space offset
 *
 * @param  {Object}  attributed string
 * @return {number} trailing white space offset
 */
var trailingOffset = R.compose(_trailingOffset.default, R.last, R.propOr([], 'runs'));
var _default = trailingOffset;
exports.default = _default;