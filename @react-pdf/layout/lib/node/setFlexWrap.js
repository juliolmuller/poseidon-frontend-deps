"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

/**
 * Set flex wrap attribute to node's Yoga instance
 *
 * @param {String} flex wrap value
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setFlexWrap = function setFlexWrap(value) {
  return function (node) {
    var yogaNode = node._yogaNode;

    if (yogaNode) {
      var yogaValue = R.cond([[R.equals('wrap'), R.always(_yoga.default.WRAP_WRAP)], [R.equals('wrap-reverse'), R.always(_yoga.default.WRAP_WRAP_REVERSE)], [R.T, R.always(_yoga.default.WRAP_NO_WRAP)]])(value);
      yogaNode.setFlexWrap(yogaValue);
    }

    return node;
  };
};

var _default = setFlexWrap;
exports.default = _default;