"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

/**
 * Set display attribute to node's Yoga instance
 *
 * @param {String} display
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setDisplay = function setDisplay(value) {
  return function (node) {
    var yogaNode = node._yogaNode;

    if (yogaNode) {
      yogaNode.setDisplay(value === 'none' ? _yoga.default.DISPLAY_NONE : _yoga.default.DISPLAY_FLEX);
    }

    return node;
  };
};

var _default = setDisplay;
exports.default = _default;