"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _hyphen = _interopRequireDefault(require("hyphen"));

var _enUs = _interopRequireDefault(require("hyphen/patterns/en-us"));

var SOFT_HYPHEN = "\xAD";
var hyphenator = (0, _hyphen.default)(_enUs.default);
var splitHyphen = R.split(SOFT_HYPHEN);
var cache = {};
var getParts = R.ifElse(R.contains(SOFT_HYPHEN), splitHyphen, R.o(splitHyphen, hyphenator));

var wordHyphenation = function wordHyphenation(options, word) {
  var cacheKey = "_" + word;
  if (R.isNil(word)) return [];
  if (cache[cacheKey]) return cache[cacheKey];
  cache[cacheKey] = getParts(word);
  return cache[cacheKey];
};

var _default = R.curryN(2, wordHyphenation);

exports.default = _default;