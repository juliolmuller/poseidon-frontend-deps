"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _createForOfIteratorHelperLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelperLoose"));

var R = _interopRequireWildcard(require("ramda"));

var _empty = _interopRequireDefault(require("../../attributedString/empty"));

/* eslint-disable no-restricted-syntax */
var getFontSize = R.pathOr(12, ['attributes', 'fontSize']);
/**
 * Resolve font runs in an AttributedString, grouping equal
 * runs and performing font substitution where necessary.
 *
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} attributed string
 */

var fontSubstitution = function fontSubstitution(options, attributedString) {
  var string = attributedString.string,
      runs = attributedString.runs;
  var lastFont = null;
  var lastIndex = 0;
  var index = 0;
  var res = [];
  if (!string) return (0, _empty.default)();

  for (var _iterator = (0, _createForOfIteratorHelperLoose2.default)(runs), _step; !(_step = _iterator()).done;) {
    var run = _step.value;

    var _fontSize = getFontSize(run);

    var defaultFont = run.attributes.font;

    if (string.length === 0) {
      res.push({
        start: 0,
        end: 0,
        attributes: {
          font: defaultFont
        }
      });
      break;
    }

    for (var _iterator2 = (0, _createForOfIteratorHelperLoose2.default)(string.slice(run.start, run.end)), _step2; !(_step2 = _iterator2()).done;) {
      var char = _step2.value;
      var font = defaultFont;

      if (font !== lastFont) {
        if (lastFont) {
          res.push({
            start: lastIndex,
            end: index,
            attributes: {
              font: lastFont,
              scale: lastFont ? _fontSize / lastFont.unitsPerEm : 0
            }
          });
        }

        lastFont = font;
        lastIndex = index;
      }

      index += char.length;
    }
  }

  if (lastIndex < string.length) {
    var fontSize = getFontSize(R.last(runs));
    res.push({
      start: lastIndex,
      end: string.length,
      attributes: {
        font: lastFont,
        scale: lastFont ? fontSize / lastFont.unitsPerEm : 0
      }
    });
  }

  return {
    string: string,
    runs: res
  };
};

var _default = R.curryN(2, fontSubstitution);

exports.default = _default;