"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var isFixed = R.pathEq(['props', 'fixed'], true);
var _default = isFixed;
exports.default = _default;