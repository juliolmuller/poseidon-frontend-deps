"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var getComputedBorder = function getComputedBorder(yogaNode, edge) {
  return yogaNode ? yogaNode.getComputedBorder(edge) : 0;
};
/**
 * Get Yoga computed border width. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} border widths
 */


var getBorderWidth = function getBorderWidth(node) {
  var yogaNode = node._yogaNode;
  return {
    borderTopWidth: getComputedBorder(yogaNode, _yoga.default.EDGE_TOP),
    borderRightWidth: getComputedBorder(yogaNode, _yoga.default.EDGE_RIGHT),
    borderBottomWidth: getComputedBorder(yogaNode, _yoga.default.EDGE_BOTTOM),
    borderLeftWidth: getComputedBorder(yogaNode, _yoga.default.EDGE_LEFT)
  };
};

var _default = getBorderWidth;
exports.default = _default;