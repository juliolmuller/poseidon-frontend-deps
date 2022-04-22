"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Deep clone run
 *
 * @param  {Object}  run
 * @return {Object} cloned run
 */
var copy = R.evolve({
  glyphs: R.map(R.identity),
  positions: R.clone,
  glyphIndices: R.clone,
  attributes: R.evolve({
    font: R.identity
  })
});
var _default = copy;
exports.default = _default;