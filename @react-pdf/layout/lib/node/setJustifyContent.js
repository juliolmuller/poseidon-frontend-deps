"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

/**
 * Set justify content attribute to node's Yoga instance
 *
 * @param {String} justify content value
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setJustifyContent = function setJustifyContent(value) {
  return function (node) {
    var yogaNode = node._yogaNode;

    if (!R.isNil(value) && yogaNode) {
      var yogaValue = R.cond([[R.equals('center'), R.always(_yoga.default.JUSTIFY_CENTER)], [R.equals('flex-end'), R.always(_yoga.default.JUSTIFY_FLEX_END)], [R.equals('space-between'), R.always(_yoga.default.JUSTIFY_SPACE_BETWEEN)], [R.equals('space-around'), R.always(_yoga.default.JUSTIFY_SPACE_AROUND)], [R.equals('space-evenly'), R.always(_yoga.default.JUSTIFY_SPACE_EVENLY)], [R.T, R.always(_yoga.default.JUSTIFY_FLEX_START)]])(value);
      yogaNode.setJustifyContent(yogaValue);
    }

    return node;
  };
};

var _default = setJustifyContent;
exports.default = _default;