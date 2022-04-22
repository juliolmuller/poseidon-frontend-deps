"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Slice block lines
 *
 * @param  {number}  lines quantity
 * @param  {Object}  paragraph block
 * @return {Object} sliced paragraph block
 */
var sliceBlock = function sliceBlock(lines, block) {
  return R.slice(0, lines, block);
};

var _default = sliceBlock;
exports.default = _default;