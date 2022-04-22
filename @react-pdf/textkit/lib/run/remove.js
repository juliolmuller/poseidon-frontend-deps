"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _copy = _interopRequireDefault(require("./copy"));

var _slice = _interopRequireDefault(require("./slice"));

var _concat = _interopRequireDefault(require("./concat"));

/**
 * Remove glyph from run in the given index
 *
 * @param  {number}  string index
 * @param  {Object}  run
 * @return {Object}  run without char
 */
var remove = function remove(index, run) {
  if (index < run.start || index >= run.end) return (0, _copy.default)(run); // Split resolves ligature splitting in case new glyph breaks some

  var leadingRun = (0, _slice.default)(0, index, run);
  var trailingRun = (0, _slice.default)(index + 1, Infinity, run);
  return (0, _concat.default)(leadingRun, trailingRun);
};

var _default = R.curryN(2, remove);

exports.default = _default;