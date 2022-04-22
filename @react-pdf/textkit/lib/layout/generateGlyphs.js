"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var R = _interopRequireWildcard(require("ramda"));

var _scale = _interopRequireDefault(require("../run/scale"));

var _resolve = _interopRequireDefault(require("../indices/resolve"));

var getCharacterSpacing = R.pathOr(0, ['attributes', 'characterSpacing']);
/**
 * Scale run positions
 *
 * @param  {Object}  run
 * @param  {Array}  positions
 * @return {Array} scaled positions
 */

var scalePositions = function scalePositions(run, positions) {
  var multScale = R.multiply((0, _scale.default)(run));
  var characterSpacing = getCharacterSpacing(run);
  var scalePosition = R.evolve({
    xAdvance: R.o(R.add(characterSpacing), multScale),
    yAdvance: multScale,
    xOffset: multScale,
    yOffset: multScale
  });
  var subCharacterSpacing = R.evolve({
    xAdvance: R.subtract(R.__, characterSpacing)
  });
  return R.compose(R.adjust(-1, subCharacterSpacing), R.map(scalePosition))(positions);
};
/**
 * Create glyph run
 *
 * @param  {String}  string
 * @param  {Object}  run
 * @return {Object}  glyph run
 */


var layoutRun = function layoutRun(string) {
  return function (run) {
    var start = run.start,
        end = run.end,
        _run$attributes = run.attributes,
        attributes = _run$attributes === void 0 ? {} : _run$attributes;
    var font = attributes.font;
    if (!font) return (0, _extends2.default)({}, run, {
      glyphs: [],
      glyphIndices: [],
      positions: []
    });
    var runString = string.slice(start, end);
    var glyphRun = font.layout(runString);
    var positions = scalePositions(run, glyphRun.positions);
    var glyphIndices = (0, _resolve.default)(glyphRun.glyphs);
    return (0, _extends2.default)({}, run, {
      positions: positions,
      glyphIndices: glyphIndices,
      glyphs: glyphRun.glyphs
    });
  };
};
/**
 * Generate glyphs for single attributed string
 *
 * @param  {Object}  layout engines
 * @param  {Object}  layout options
 * @param  {Array}  attributed strings
 * @return {Array} attributed string with glyphs
 */


var generateGlyphs = function generateGlyphs() {
  return function (attributedString) {
    return R.evolve({
      runs: R.map(layoutRun(attributedString.string))
    })(attributedString);
  };
};

var _default = generateGlyphs;
exports.default = _default;