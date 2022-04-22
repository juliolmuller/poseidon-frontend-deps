"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _dropLast = _interopRequireDefault(require("../run/dropLast"));

/**
 * Drop last glyph
 *
 * @param {Object} attributed string
 * @return {Object} attributed string with new glyph
 */
var dropLast = function dropLast(string) {
  return R.evolve({
    string: R.dropLast(1),
    runs: R.adjust(-1, _dropLast.default)
  })(string);
};

var _default = dropLast;
exports.default = _default;