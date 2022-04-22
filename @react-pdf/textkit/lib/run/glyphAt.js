"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _glyphIndexAt = _interopRequireDefault(require("./glyphIndexAt"));

/**
 * Return glyph at string index, if glyph indices present.
 * Otherwise null
 *
 * @param  {number}  string index
 * @param  {Object}  run
 * @return {Object}  glyph
 */
var glyphAt = function glyphAt(index, run) {
  var glyphIndex = (0, _glyphIndexAt.default)(index, run);
  return R.pathOr(null, ['glyphs', glyphIndex])(run);
};

var _default = R.curryN(2, glyphAt);

exports.default = _default;