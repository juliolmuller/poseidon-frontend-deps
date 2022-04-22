"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/* eslint-disable import/prefer-default-export */
var matchNumber = R.when(R.is(String), R.test(/^-?\d*\.?\d*$/));

var castFloat = function castFloat(value) {
  if (typeof value !== 'string') return value;
  if (matchNumber(value)) return parseFloat(value, 10);
  return value;
};

var _default = castFloat;
exports.default = _default;