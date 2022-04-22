"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

/**
 * Set position type attribute to node's Yoga instance
 *
 * @param {String} position type
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setPositionType = function setPositionType(value) {
  return function (node) {
    var yogaNode = node._yogaNode;

    if (!R.isNil(value) && yogaNode) {
      yogaNode.setPositionType(value === 'absolute' ? _yoga.default.POSITION_TYPE_ABSOLUTE : _yoga.default.POSITION_TYPE_RELATIVE);
    }

    return node;
  };
};

var _default = setPositionType;
exports.default = _default;