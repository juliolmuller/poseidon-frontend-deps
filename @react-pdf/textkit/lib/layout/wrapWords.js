"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var R = _interopRequireWildcard(require("ramda"));

var _fromFragments = _interopRequireDefault(require("../attributedString/fromFragments"));

/**
 * Default word hyphenation engine used when no one provided.
 * Does not perform word hyphenation at all
 *
 * @param  {String} word
 * @return {Array} same word
 */
var defaultHyphenationEngine = function defaultHyphenationEngine(word) {
  return [word];
};
/**
 * Wrap words of attribute string
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} attributed string including syllables
 */


var wrapWords = function wrapWords(engines, options, attributedString) {
  if (engines === void 0) {
    engines = {};
  }

  if (options === void 0) {
    options = {};
  }

  var syllables = [];
  var fragments = [];
  var hyphenateWord = options.hyphenationCallback || engines.wordHyphenation && engines.wordHyphenation(options) || defaultHyphenationEngine;

  for (var i = 0; i < attributedString.runs.length; i += 1) {
    var string = '';
    var run = attributedString.runs[i];
    var words = attributedString.string.slice(run.start, run.end).split(/([ ]+)/g).filter(Boolean);

    for (var j = 0; j < words.length; j += 1) {
      var word = words[j];
      var parts = hyphenateWord(word);
      syllables.push.apply(syllables, parts);
      string += parts.join('');
    }

    fragments.push({
      string: string,
      attributes: run.attributes
    });
  }

  return (0, _extends2.default)({}, (0, _fromFragments.default)(fragments), {
    syllables: syllables
  });
};

var _default = R.curryN(3, wrapWords);

exports.default = _default;