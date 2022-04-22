"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Get string index at offset
 *
 * @param  {Object}  run
 * @param  {number}  offset
 * @return {number} string index at offset N
 */
var indexAtOffset = function indexAtOffset(offset, run) {
  var counter = 0;
  var index = 0;
  var glyphs = R.propOr([], 'glyphs', run);
  var positions = R.propOr([], 'positions', run);

  for (var i = 0; i < positions.length; i += 1) {
    var xAdvance = positions[i].xAdvance;
    if (counter + xAdvance > offset) return index;
    counter += xAdvance;
    index += R.pathOr(0, [i, 'codePoints', 'length'], glyphs);
  }

  return index;
};

var _default = R.curryN(2, indexAtOffset);

exports.default = _default;