"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _length = _interopRequireDefault(require("../attributedString/length"));

var _slice = _interopRequireDefault(require("../attributedString/slice"));

/**
 * Breaks attributed string into paragraphs
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Array} attributed string array
 */
var splitParagraphs = function splitParagraphs() {
  return function (attributedString) {
    var res = [];
    var start = 0;
    var breakPoint = attributedString.string.indexOf('\n') + 1;

    while (breakPoint > 0) {
      res.push((0, _slice.default)(start, breakPoint, attributedString));
      start = breakPoint;
      breakPoint = attributedString.string.indexOf('\n', breakPoint) + 1;
    }

    if (start === 0) {
      res.push(attributedString);
    } else if (start < attributedString.string.length) {
      res.push((0, _slice.default)(start, (0, _length.default)(attributedString), attributedString));
    }

    return res;
  };
};

var _default = splitParagraphs;
exports.default = _default;