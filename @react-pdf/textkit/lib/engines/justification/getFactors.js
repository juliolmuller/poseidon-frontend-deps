"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _isWhiteSpace = _interopRequireDefault(require("../../glyph/isWhiteSpace"));

var WHITESPACE_PRIORITY = 1;
var LETTER_PRIORITY = 2;
var EXPAND_WHITESPACE_FACTOR = {
  before: 0.5,
  after: 0.5,
  priority: WHITESPACE_PRIORITY,
  unconstrained: false
};
var EXPAND_CHAR_FACTOR = {
  before: 0.14453125,
  // 37/256
  after: 0.14453125,
  priority: LETTER_PRIORITY,
  unconstrained: false
};
var SHRINK_WHITESPACE_FACTOR = {
  before: -0.04296875,
  // -11/256
  after: -0.04296875,
  priority: WHITESPACE_PRIORITY,
  unconstrained: false
};
var SHRINK_CHAR_FACTOR = {
  before: -0.04296875,
  after: -0.04296875,
  priority: LETTER_PRIORITY,
  unconstrained: false
};

var getCharFactor = function getCharFactor(direction, options) {
  var expandCharFactor = R.propOr({}, 'expandCharFactor', options);
  var shrinkCharFactor = R.propOr({}, 'shrinkCharFactor', options);
  return direction === 'GROW' ? R.merge(EXPAND_CHAR_FACTOR, expandCharFactor) : R.merge(SHRINK_CHAR_FACTOR, shrinkCharFactor);
};

var getWhitespaceFactor = function getWhitespaceFactor(direction, options) {
  var expandWhitespaceFactor = R.propOr({}, 'expandWhitespaceFactor', options);
  var shrinkWhitespaceFactor = R.propOr({}, 'shrinkWhitespaceFactor', options);
  return direction === 'GROW' ? R.merge(EXPAND_WHITESPACE_FACTOR, expandWhitespaceFactor) : R.merge(SHRINK_WHITESPACE_FACTOR, shrinkWhitespaceFactor);
};

var factor = function factor(direction, options) {
  return function (glyphs) {
    var charFactor = getCharFactor(direction, options);
    var whitespaceFactor = getWhitespaceFactor(direction, options);
    var factors = [];

    for (var index = 0; index < glyphs.length; index += 1) {
      var f = void 0;
      var glyph = glyphs[index];

      if ((0, _isWhiteSpace.default)(glyph)) {
        f = R.clone(whitespaceFactor);

        if (index === glyphs.length - 1) {
          f.before = 0;

          if (index > 0) {
            factors[index - 1].after = 0;
          }
        }
      } else if (glyph.isMark && index > 0) {
        f = R.clone(factors[index - 1]);
        f.before = 0;
        factors[index - 1].after = 0;
      } else {
        f = R.clone(charFactor);
      }

      factors.push(f);
    }

    return factors;
  };
};

var getFactors = function getFactors(gap, line, options) {
  var direction = gap > 0 ? 'GROW' : 'SHRINK';
  var getFactor = factor(direction, options);
  var concatFactors = R.useWith(R.concat, [R.identity, R.compose(getFactor, R.prop('glyphs'))]);
  return R.compose(R.adjust(-1, R.assoc('after', 0)), R.adjust(0, R.assoc('before', 0)), R.reduce(concatFactors, []), R.prop('runs'))(line);
};

var _default = getFactors;
exports.default = _default;