"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Returns empty run
 *
 * @return {Object} empty run
 */
var empty = R.always({
  start: 0,
  end: 0,
  glyphIndices: [],
  glyphs: [],
  positions: [],
  attributes: {}
});
var _default = empty;
exports.default = _default;