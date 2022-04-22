"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _length = _interopRequireDefault(require("../run/length"));

var _advanceWidth = _interopRequireDefault(require("../run/advanceWidth"));

var _indexAtOffset = _interopRequireDefault(require("../run/indexAtOffset"));

/**
 * Get string index at offset
 *
 * @param  {Object}  attributed string
 * @param  {number}  offset
 * @return {number} string index at offset N
 */
var indexAtOffset = function indexAtOffset(offset, string) {
  var index = 0;
  var counter = 0;
  var runs = R.propOr([], 'runs', string);

  for (var i = 0; i < runs.length; i += 1) {
    var run = runs[i];
    var advanceWidth = (0, _advanceWidth.default)(run);

    if (counter + advanceWidth > offset) {
      return index + (0, _indexAtOffset.default)(offset - counter, run);
    }

    counter += advanceWidth;
    index += (0, _length.default)(run);
  }

  return index;
};

var _default = R.curryN(2, indexAtOffset);

exports.default = _default;