"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _length = _interopRequireDefault(require("./length"));

var _normalize = _interopRequireDefault(require("../indices/normalize"));

var reverseMerge = R.flip(R.merge);
var reverseConcat = R.flip(R.concat);
/**
 * Concats two runs into one
 *
 * @param  {Object}  first run
 * @param  {Object}  second run
 * @return {Object}  concatenated run
 */

var concat = function concat(runA, runB) {
  return R.evolve({
    end: R.add((0, _length.default)(runB)),
    glyphs: reverseConcat(R.prop('glyphs', runB)),
    positions: reverseConcat(R.prop('positions', runB)),
    attributes: reverseMerge(R.prop('attributes', runB)),
    glyphIndices: R.compose(_normalize.default, reverseConcat(R.map(R.compose(R.inc, R.add(R.last(R.propOr([], 'glyphIndices', runA)) || 0)), R.propOr([], 'glyphIndices', runB))))
  })(runA);
};

var _default = R.curryN(2, concat);

exports.default = _default;