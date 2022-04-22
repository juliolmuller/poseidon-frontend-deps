"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _empty = _interopRequireDefault(require("../run/empty"));

var _append = _interopRequireDefault(require("../run/append"));

var _stringFromCodePoints = _interopRequireDefault(require("../utils/stringFromCodePoints"));

/**
 * Append glyph into last run of attributed string
 *
 * @param {Object} glyph
 * @param {Object} attributed string
 * @return {Object} attributed string with new glyph
 */
var append = function append(glyph, string) {
  var codePoints = R.propOr([], 'codePoints')(glyph);
  return R.evolve({
    string: R.concat(R.__, (0, _stringFromCodePoints.default)(codePoints)),
    runs: R.converge(R.concat, [R.init, R.compose(R.unapply(R.identity), (0, _append.default)(glyph), R.either(R.last, _empty.default))])
  })(string);
};

var _default = R.curryN(2, append);

exports.default = _default;