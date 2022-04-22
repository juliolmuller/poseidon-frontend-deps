"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var isType = R.propEq('type');
var isSvg = isType(P.Svg);
var isNote = isType(P.Note);
var isImage = isType(P.Image);
var isCanvas = isType(P.Canvas);
var getWrap = R.ifElse(R.anyPass([isSvg, isNote, isImage, isCanvas]), R.always(false), R.pathOr(true, ['props', 'wrap']));
var _default = getWrap;
exports.default = _default;