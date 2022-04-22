"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _isBetween = _interopRequireDefault(require("../utils/isBetween"));

/**
 * Get run index that contains passed index
 *
 * @param  {number}  char index
 * @param  {Array}  runs array
 * @return {Array} run index
 */
var runIndexAt = function runIndexAt(n, runs) {
  return R.findIndex((0, _isBetween.default)(R.prop('start'), R.prop('end'), n))(runs);
};

var _default = R.curryN(2, runIndexAt);

exports.default = _default;