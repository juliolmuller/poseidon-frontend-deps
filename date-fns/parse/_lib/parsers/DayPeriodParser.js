"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayPeriodParser = void 0;

var _Parser = require("../Parser.js");

var _utils = require("../utils.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// in the morning, in the afternoon, in the evening, at night
class DayPeriodParser extends _Parser.Parser {
  constructor() {
    super(...arguments);

    _defineProperty(this, "priority", 80);

    _defineProperty(this, "incompatibleTokens", ['a', 'b', 't', 'T']);
  }

  parse(dateString, token, match) {
    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return match.dayPeriod(dateString, {
          width: 'abbreviated',
          context: 'formatting'
        }) || match.dayPeriod(dateString, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'BBBBB':
        return match.dayPeriod(dateString, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'BBBB':
      default:
        return match.dayPeriod(dateString, {
          width: 'wide',
          context: 'formatting'
        }) || match.dayPeriod(dateString, {
          width: 'abbreviated',
          context: 'formatting'
        }) || match.dayPeriod(dateString, {
          width: 'narrow',
          context: 'formatting'
        });
    }
  }

  set(date, _flags, value) {
    date.setUTCHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
    return date;
  }

}

exports.DayPeriodParser = DayPeriodParser;