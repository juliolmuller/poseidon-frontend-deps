"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _add = _interopRequireDefault(require("../run/add"));

var _empty = _interopRequireDefault(require("../run/empty"));

var _prepend = _interopRequireDefault(require("../run/prepend"));

var _stringFromCodePoints = _interopRequireDefault(require("../utils/stringFromCodePoints"));

/**
 * prepend glyph into last run of attributed string
 *
 * @param {Object} glyph
 * @param {Object} attributed string
 * @return {Object} attributed string with new glyph
 */
var prepend = function prepend(glyph, string) {
  var codePoints = R.propOr([], 'codePoints')(glyph);
  return R.evolve({
    string: R.concat((0, _stringFromCodePoints.default)(codePoints)),
    runs: R.converge(R.concat, [R.compose(R.unapply(R.identity), (0, _prepend.default)(glyph), R.either(R.head, _empty.default)), R.compose(R.map((0, _add.default)(codePoints.length)), R.tail)])
  })(string);
};

var _default = R.curryN(2, prepend);

exports.default = _default;