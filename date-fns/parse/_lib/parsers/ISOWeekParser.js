"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISOWeekParser = void 0;

var _Parser = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

var _index = _interopRequireDefault(require("../../../_lib/setUTCISOWeek/index.js"));

var _index2 = _interopRequireDefault(require("../../../_lib/startOfUTCISOWeek/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ISO week of year
class ISOWeekParser extends _Parser.Parser {
  constructor() {
    super(...arguments);

    _defineProperty(this, "priority", 100);

    _defineProperty(this, "incompatibleTokens", ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']);
  }

  parse(dateString, token, match) {
    switch (token) {
      case 'I':
        return (0, _utils.parseNumericPattern)(_constants.numericPatterns.week, dateString);

      case 'Io':
        return match.ordinalNumber(dateString, {
          unit: 'week'
        });

      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 53;
  }

  set(date, _flags, value) {
    return (0, _index2.default)((0, _index.default)(date, value));
  }

}

exports.ISOWeekParser = ISOWeekParser;