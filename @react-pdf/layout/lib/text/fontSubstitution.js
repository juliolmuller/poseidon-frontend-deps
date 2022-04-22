"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _standardFont = _interopRequireDefault(require("./standardFont"));

var fontCache = {};
var IGNORED_CODE_POINTS = [173];
var getFontSize = R.pathOr(12, ['attributes', 'fontSize']);

var getOrCreateFont = function getOrCreateFont(name) {
  if (fontCache[name]) return fontCache[name];
  var font = new _standardFont.default(name);
  fontCache[name] = font;
  return font;
};

var getFallbackFont = function getFallbackFont() {
  return getOrCreateFont('Helvetica');
};

var shouldFallbackToFont = function shouldFallbackToFont(codePoint, font) {
  return !font || !IGNORED_CODE_POINTS.includes(codePoint) && !font.hasGlyphForCodePoint(codePoint) && getFallbackFont().hasGlyphForCodePoint(codePoint);
};

var fontSubstitution = function fontSubstitution() {
  return function (_ref) {
    var string = _ref.string,
        runs = _ref.runs;
    var lastFont = null;
    var lastFontSize = null;
    var lastIndex = 0;
    var index = 0;
    var res = [];

    for (var i = 0; i < runs.length; i += 1) {
      var run = runs[i];
      var defaultFont = typeof run.attributes.font === 'string' ? getOrCreateFont(run.attributes.font) : run.attributes.font;

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

      var chars = string.slice(run.start, run.end);

      for (var j = 0; j < chars.length; j += 1) {
        var char = chars[j];
        var codePoint = char.codePointAt();
        var shouldFallback = shouldFallbackToFont(codePoint, defaultFont); // If the default font does not have a glyph and the fallback font does, we use it

        var font = shouldFallback ? getFallbackFont() : defaultFont;
        var fontSize = getFontSize(run); // If anything that would impact res has changed, update it

        if (font !== lastFont || fontSize !== lastFontSize || font.unitsPerEm !== lastFont.unitsPerEm) {
          if (lastFont) {
            res.push({
              start: lastIndex,
              end: index,
              attributes: {
                font: lastFont,
                scale: lastFontSize / lastFont.unitsPerEm
              }
            });
          }

          lastFont = font;
          lastFontSize = fontSize;
          lastIndex = index;
        }

        index += char.length;
      }
    }

    if (lastIndex < string.length) {
      var _fontSize = getFontSize(R.last(runs));

      res.push({
        start: lastIndex,
        end: string.length,
        attributes: {
          font: lastFont,
          scale: _fontSize / lastFont.unitsPerEm
        }
      });
    }

    return {
      string: string,
      runs: res
    };
  };
};

var _default = fontSubstitution;
exports.default = _default;