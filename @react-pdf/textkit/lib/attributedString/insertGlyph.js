"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _append = _interopRequireDefault(require("./append"));

var _copy = _interopRequireDefault(require("../run/copy"));

var _insert = _interopRequireDefault(require("../run/insert"));

var _runIndexAt = _interopRequireDefault(require("./runIndexAt"));

var _stringFromCodePoints = _interopRequireDefault(require("../utils/stringFromCodePoints"));

var mapCond = function mapCond(conds) {
  return R.addIndex(R.map)(R.cond(conds));
};

var idxEquals = function idxEquals(idx) {
  return R.compose(R.equals(idx), R.nthArg(1));
};

var idxGt = function idxGt(idx) {
  return R.compose(R.gt(R.__, idx), R.nthArg(1));
};
/**
 * Insert glyph into attributed string
 *
 * @param {number} index
 * @param {Object} glyph
 * @param {Object} attributed string
 * @return {Object} attributed string with new glyph
 */


var insertGlyph = function insertGlyph(index, glyph, string) {
  var runIndex = (0, _runIndexAt.default)(index, string); // Add glyph to the end if run index invalid

  if (runIndex === -1) {
    return (0, _append.default)(glyph, string);
  }

  var codePoints = R.propOr([], 'codePoints')(glyph);
  var incRange = R.add(R.length(codePoints));
  return R.evolve({
    string: R.compose(R.join(''), R.insert(index, (0, _stringFromCodePoints.default)(codePoints))),
    runs: mapCond([[idxEquals(runIndex), function (run) {
      return (0, _insert.default)(index - run.start, glyph, run);
    }], [idxGt(runIndex), R.evolve({
      start: incRange,
      end: incRange
    })], [R.T, _copy.default]])
  })(string);
};

var _default = R.curryN(3, insertGlyph);

exports.default = _default;