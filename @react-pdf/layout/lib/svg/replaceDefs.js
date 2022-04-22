"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _getDefs = _interopRequireDefault(require("./getDefs"));

var isDefs = R.propEq('type', P.Defs);
var isNotDefs = R.complement(isDefs);
var detachDefs = R.evolve({
  children: R.filter(isNotDefs)
});
var URL_REGEX = /url\(['"]?#([^'"]+)['"]?\)/;

var replaceDef = function replaceDef(defs) {
  return R.compose(R.when(R.test(URL_REGEX), R.compose(R.prop(R.__, defs), R.prop(1), R.match(URL_REGEX))), R.defaultTo(''));
};

var parseNodeDefs = function parseNodeDefs(defs) {
  return function (node) {
    return R.compose(R.evolve({
      props: R.evolve({
        fill: replaceDef(defs),
        clipPath: replaceDef(defs)
      })
    }), R.evolve({
      children: R.map(parseNodeDefs(defs))
    }))(node);
  };
};

var parseDefs = function parseDefs(root) {
  var defs = (0, _getDefs.default)(root);
  return R.evolve({
    children: R.map(parseNodeDefs(defs))
  }, root);
};

var replaceDefs = R.compose(detachDefs, parseDefs);
var _default = replaceDefs;
exports.default = _default;