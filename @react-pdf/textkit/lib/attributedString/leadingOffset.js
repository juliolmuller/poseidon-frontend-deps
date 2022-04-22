"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _leadingOffset = _interopRequireDefault(require("../run/leadingOffset"));

/**
 * Get attributed string leading white space offset
 *
 * @param  {Object}  attributed string
 * @return {number} leading white space offset
 */
var leadingOffset = R.compose(_leadingOffset.default, R.head, R.propOr([], 'runs'));
var _default = leadingOffset;
exports.default = _default;