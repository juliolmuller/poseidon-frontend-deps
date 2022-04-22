"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

/**
 * Set overflow attribute to node's Yoga instance
 *
 * @param {String} overflow value
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setOverflow = function setOverflow(value) {
  return function (node) {
    var yogaNode = node._yogaNode;

    if (!R.isNil(value) && yogaNode) {
      var yogaValue = R.cond([[R.equals('hidden'), R.always(_yoga.default.OVERFLOW_HIDDEN)], [R.equals('scroll'), R.always(_yoga.default.OVERFLOW_SCROLL)], [R.T, R.always(_yoga.default.OVERFLOW_VISIBLE)]])(value);
      yogaNode.setOverflow(yogaValue);
    }

    return node;
  };
};

var _default = setOverflow;
exports.default = _default;