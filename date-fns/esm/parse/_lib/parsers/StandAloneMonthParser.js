function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Parser } from "../Parser.js";
import { numericPatterns } from "../constants.js";
import { parseNumericPattern, parseNDigits, mapValue } from "../utils.js";
export class StandAloneMonthParser extends Parser {
  constructor() {
    super(...arguments);

    _defineProperty(this, "priority", 110);

    _defineProperty(this, "incompatibleTokens", ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']);
  }

  parse(dateString, token, match) {
    var valueCallback = function (value) {
      return value - 1;
    };

    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback);
      // 01, 02, ..., 12

      case 'LL':
        return mapValue(parseNDigits(2, dateString), valueCallback);
      // 1st, 2nd, ..., 12th

      case 'Lo':
        return mapValue(match.ordinalNumber(dateString, {
          unit: 'month'
        }), valueCallback);
      // Jan, Feb, ..., Dec

      case 'LLL':
        return match.month(dateString, {
          width: 'abbreviated',
          context: 'standalone'
        }) || match.month(dateString, {
          width: 'narrow',
          context: 'standalone'
        });
      // J, F, ..., D

      case 'LLLLL':
        return match.month(dateString, {
          width: 'narrow',
          context: 'standalone'
        });
      // January, February, ..., December

      case 'LLLL':
      default:
        return match.month(dateString, {
          width: 'wide',
          context: 'standalone'
        }) || match.month(dateString, {
          width: 'abbreviated',
          context: 'standalone'
        }) || match.month(dateString, {
          width: 'narrow',
          context: 'standalone'
        });
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    date.setUTCMonth(value, 1);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

}