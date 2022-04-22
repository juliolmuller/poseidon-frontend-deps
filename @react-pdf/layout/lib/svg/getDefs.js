"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var isDefs = R.propEq('type', P.Defs);
var getChildren = R.propOr([], 'children');
var getId = R.path(['props', 'id']);
var getDefs = R.compose(R.map(R.prop(0)), R.groupBy(getId), getChildren, R.defaultTo({}), R.find(isDefs), getChildren);
var _default = getDefs;
exports.default = _default;