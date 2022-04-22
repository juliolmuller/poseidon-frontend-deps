"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _slice = _interopRequireDefault(require("./slice"));

var _indexAtOffset = _interopRequireDefault(require("./indexAtOffset"));

/**
 * Slice attributed string at given offset
 *
 * @param  {number}  offset
 * @param  {Object}  attributedString
 * @return {Object} attributedString
 */
var sliceAtOffset = function sliceAtOffset(offset, string) {
  var index = (0, _indexAtOffset.default)(offset, string);
  return (0, _slice.default)(0, index, string);
};

var _default = R.curryN(2, sliceAtOffset);

exports.default = _default;