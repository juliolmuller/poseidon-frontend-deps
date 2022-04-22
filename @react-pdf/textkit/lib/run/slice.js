"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _scale = _interopRequireDefault(require("./scale"));

var _offset = _interopRequireDefault(require("./offset"));

var _getFont = _interopRequireDefault(require("./getFont"));

var _slice = _interopRequireDefault(require("../glyph/slice"));

var _glyphIndexAt = _interopRequireDefault(require("./glyphIndexAt"));

var _normalize = _interopRequireDefault(require("../indices/normalize"));

/**
 * Slice run between glyph indices range
 *
 * @param  {number}  start glyph index
 * @param  {number}  end glyph index
 * @param  {Object}  run
 * @return {Object} sliced run
 */
var slice = function slice(start, end, run) {
  var runScale = (0, _scale.default)(run);
  var font = (0, _getFont.default)(run); // Get glyph start and end indices

  var glyphStartIndex = (0, _glyphIndexAt.default)(start, run);
  var glyphEndIndex = (0, _glyphIndexAt.default)(end, run); // Get start and end glyph

  var startGlyph = R.path(['glyphs', glyphStartIndex], run);
  var endGlyph = R.path(['glyphs', glyphEndIndex], run); // Get start ligature chunks (if any)

  var startOffset = (0, _offset.default)(start, run);
  var startGlyphs = startOffset > 0 ? (0, _slice.default)(startOffset, Infinity, font, startGlyph) : []; // Get end ligature chunks (if any)

  var endOffset = (0, _offset.default)(end, run);
  var endGlyphs = (0, _slice.default)(0, endOffset, font, endGlyph);
  var sliceOffset = Math.min(1, startOffset);
  return R.evolve({
    start: R.add(start),
    end: R.compose(R.apply(R.min), R.juxt([R.identity, // string.end
    R.o(R.add(end), R.always(run.start)) // end + string.start
    ])),
    glyphs: function glyphs(_glyphs) {
      return R.flatten([startGlyphs, _glyphs.slice(glyphStartIndex + sliceOffset, glyphEndIndex), endGlyphs]);
    },
    positions: function positions(_positions) {
      return R.flatten([startGlyphs.map(function (g) {
        return {
          xAdvance: g.advanceWidth * runScale
        };
      }), _positions.slice(glyphStartIndex + sliceOffset, glyphEndIndex), endGlyphs.map(function (g) {
        return {
          xAdvance: g.advanceWidth * runScale
        };
      })]);
    },
    glyphIndices: R.o(_normalize.default, R.slice(start, end)),
    attributes: R.identity
  })(run);
};

var _default = R.curryN(3, slice);

exports.default = _default;