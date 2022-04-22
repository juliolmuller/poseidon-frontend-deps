"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var _upperFirst = _interopRequireDefault(require("../utils/upperFirst"));

/**
 * Set generic align attribute to node's Yoga instance
 *
 * @param {String} specific align property
 * @param {String} align value
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setAlign = function setAlign(attr) {
  return function (value) {
    return R.tap(function (node) {
      var yogaNode = node._yogaNode;

      if (yogaNode) {
        var yogaValue = R.cond([[R.equals('flex-start'), R.always(_yoga.default.ALIGN_FLEX_START)], [R.equals('center'), R.always(_yoga.default.ALIGN_CENTER)], [R.equals('flex-end'), R.always(_yoga.default.ALIGN_FLEX_END)], [R.equals('stretch'), R.always(_yoga.default.ALIGN_STRETCH)], [R.equals('baseline'), R.always(_yoga.default.ALIGN_BASELINE)], [R.equals('space-between'), R.always(_yoga.default.ALIGN_SPACE_BETWEEN)], [R.equals('space-around'), R.always(_yoga.default.ALIGN_SPACE_AROUND)], [R.T, R.always(attr === 'items' ? _yoga.default.ALIGN_STRETCH : _yoga.default.ALIGN_AUTO)]])(value);
        yogaNode["setAlign" + (0, _upperFirst.default)(attr)](yogaValue);
      }
    });
  };
};

var _default = setAlign;
exports.default = _default;