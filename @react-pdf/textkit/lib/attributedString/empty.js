"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Returns empty attributed string
 *
 * @return {Object} empty attributed string
 */
var empty = R.always({
  string: '',
  runs: []
});
var _default = empty;
exports.default = _default;