"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _filter = _interopRequireDefault(require("../run/filter"));

var _advanceWidthBetween = _interopRequireDefault(require("../run/advanceWidthBetween"));

/**
 * Advance width between start and end
 * Does not consider ligature splitting for the moment.
 * Check performance impact on supporting this
 *
 * @param  {number}  start offset
 * @param  {number}  end offset
 * @param  {Object}  attributedString
 * @return {number} advance width
 */
var advanceWidthBetween = function advanceWidthBetween(start, end, string) {
  return R.compose(R.sum, R.map((0, _advanceWidthBetween.default)(start, end)), (0, _filter.default)(start, end), R.propOr([], 'runs'))(string);
};

var _default = R.curryN(3, advanceWidthBetween);

exports.default = _default;