"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Sort runs in ascending order
 *
 * @param  {Array}  runs
 * @return {Array} sorted runs
 */
var sort = function sort(a, b) {
  return a.start - b.start || a.end - b.end;
};

var _default = R.sort(sort);

exports.default = _default;