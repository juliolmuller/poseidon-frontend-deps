"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _unicodeProperties = _interopRequireDefault(require("@react-pdf/unicode-properties"));

var _empty = _interopRequireDefault(require("../../attributedString/empty"));

var ignoredScripts = ['Common', 'Inherited', 'Unknown'];
/**
 * Resolves unicode script in runs, grouping equal runs together
 *
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} attributed string
 */

var scriptItemizer = function scriptItemizer(options, attributedString) {
  var string = attributedString.string;
  var lastScript = 'Unknown';
  var lastIndex = 0;
  var index = 0;
  var res = [];
  if (!string) return (0, _empty.default)();

  for (var i = 0; i < string.length; i += 1) {
    var char = string[i];
    var codePoint = char.codePointAt();

    var script = _unicodeProperties.default.getScript(codePoint);

    if (script !== lastScript && !ignoredScripts.includes(script)) {
      if (lastScript !== 'Unknown') {
        res.push({
          start: lastIndex,
          end: index,
          attributes: {
            script: lastScript
          }
        });
      }

      lastIndex = index;
      lastScript = script;
    }

    index += char.length;
  }

  if (lastIndex < string.length) {
    res.push({
      start: lastIndex,
      end: string.length,
      attributes: {
        script: lastScript
      }
    });
  }

  return {
    string: string,
    runs: res
  };
};

var _default = R.curryN(2, scriptItemizer);

exports.default = _default;