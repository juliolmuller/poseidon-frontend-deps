"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _runAt = _interopRequireDefault(require("./runAt"));

var _glyphIndexAt = _interopRequireDefault(require("../run/glyphIndexAt"));

/**
 * Get glyph width at string index
 *
 * @param {number} string index
 * @param {Object} attributed string
 * @return {number} glyph width
 */
var glyphWidthAt = function glyphWidthAt(index, string) {
  var run = (0, _runAt.default)(index, string);
  var glyphIndex = (0, _glyphIndexAt.default)(index, run);
  return run.positions[glyphIndex].xAdvance;
};

var _default = glyphWidthAt;
exports.default = _default;