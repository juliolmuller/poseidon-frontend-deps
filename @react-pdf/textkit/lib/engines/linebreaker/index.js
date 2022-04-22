"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _bestFit = _interopRequireDefault(require("./bestFit"));

var _linebreak = _interopRequireDefault(require("./linebreak"));

var _slice = _interopRequireDefault(require("../../attributedString/slice"));

var _insertGlyph = _interopRequireDefault(require("../../attributedString/insertGlyph"));

var _advanceWidthBetween = _interopRequireDefault(require("../../attributedString/advanceWidthBetween"));

var HYPHEN = 0x002d;
var TOLERANCE_STEPS = 5;
var TOLERANCE_LIMIT = 50;
var opts = {
  width: 3,
  stretch: 6,
  shrink: 9
};
/**
 * Slice attributed string to many lines
 *
 * @param {Object} attributed string
 * @param  {Array}  nodes
 * @param  {Array}  breaks
 * @return {Array} attributed strings
 */

var breakLines = function breakLines(string, nodes, breaks) {
  var start = 0;
  var end = null;
  var lines = breaks.reduce(function (acc, breakPoint) {
    var node = nodes[breakPoint.position];
    var prevNode = nodes[breakPoint.position - 1]; // Last breakpoint corresponds to K&P mandatory final glue

    if (breakPoint.position === nodes.length - 1) return acc;
    var line;

    if (node.type === 'penalty') {
      end = prevNode.value.end;
      line = (0, _slice.default)(start, end, string);
      line = (0, _insertGlyph.default)(line.length, HYPHEN, line);
    } else {
      end = node.value.end;
      line = (0, _slice.default)(start, end, string);
    }

    start = end;
    return [].concat(acc, [line]);
  }, []); // Last line

  lines.push((0, _slice.default)(start, string.string.length, string));
  return lines;
};
/**
 * Return Knuth & Plass nodes based on line and previously calculated syllables
 *
 * @param {Object} attributed string
 * @param  {Object}  attributed string
 * @param  {Object}  layout options
 * @return {Array} attributed strings
 */


var getNodes = function getNodes(attributedString, _ref, options) {
  var align = _ref.align;
  var start = 0;
  var hyphenWidth = 5;
  var syllables = attributedString.syllables;
  var hyphenPenalty = options.hyphenationPenalty || (align === 'justify' ? 100 : 600);
  var result = syllables.reduce(function (acc, s, index) {
    var width = (0, _advanceWidthBetween.default)(start, start + s.length, attributedString);

    if (s.trim() === '') {
      var stretch = width * opts.width / opts.stretch;
      var shrink = width * opts.width / opts.shrink;
      var value = {
        start: start,
        end: start + s.length
      };
      acc.push(_linebreak.default.glue(width, value, stretch, shrink));
    } else {
      var hyphenated = syllables[index + 1] !== ' ';
      var _value = {
        start: start,
        end: start + s.length
      };
      acc.push(_linebreak.default.box(width, _value, hyphenated));

      if (syllables[index + 1] && hyphenated) {
        acc.push(_linebreak.default.penalty(hyphenWidth, hyphenPenalty, 1));
      }
    }

    start += s.length;
    return acc;
  }, []);
  result.push(_linebreak.default.glue(0, null, _linebreak.default.infinity, 0));
  result.push(_linebreak.default.penalty(0, -_linebreak.default.infinity, 1));
  return result;
};

var getStyles = R.pathOr({}, ['attributedString', 'runs', 0, 'attributes']);
/**
 * Performs Knuth & Plass line breaking algorithm
 * Fallbacks to best fit algorithm if latter not successful
 *
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @param {Object} attributed string
 * @return {Array} attributed strings
 */

var lineBreaker = function lineBreaker(options, attributedString, availableWidths) {
  var tolerance = options.tolerance || 4;
  var style = getStyles(attributedString);
  var nodes = getNodes(attributedString, style, options);
  var breaks = (0, _linebreak.default)(nodes, availableWidths, {
    tolerance: tolerance
  }); // Try again with a higher tolerance if the line breaking failed.

  while (breaks.length === 0 && tolerance < TOLERANCE_LIMIT) {
    tolerance += TOLERANCE_STEPS;
    breaks = (0, _linebreak.default)(nodes, availableWidths, {
      tolerance: tolerance
    });
  }

  if (breaks.length === 0 || breaks.length === 1 && breaks[0].position === 0) {
    breaks = (0, _bestFit.default)(nodes, availableWidths);
  }

  return breakLines(attributedString, nodes, breaks.slice(1));
};

var _default = R.curryN(3, lineBreaker);

exports.default = _default;