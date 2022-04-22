"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var getComputedMargin = function getComputedMargin(node, edge) {
  var yogaNode = node._yogaNode;
  return yogaNode ? yogaNode.getComputedMargin(edge) : null;
};
/**
 * Get Yoga computed magins. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} margins
 */


var getMargin = function getMargin(node) {
  var style = node.style,
      box = node.box;
  var marginTop = getComputedMargin(node, _yoga.default.EDGE_TOP) || (box === null || box === void 0 ? void 0 : box.marginTop) || (style === null || style === void 0 ? void 0 : style.marginTop) || (style === null || style === void 0 ? void 0 : style.marginVertical) || (style === null || style === void 0 ? void 0 : style.margin) || 0;
  var marginRight = getComputedMargin(node, _yoga.default.EDGE_RIGHT) || (box === null || box === void 0 ? void 0 : box.marginRight) || (style === null || style === void 0 ? void 0 : style.marginRight) || (style === null || style === void 0 ? void 0 : style.marginHorizontal) || (style === null || style === void 0 ? void 0 : style.margin) || 0;
  var marginBottom = getComputedMargin(node, _yoga.default.EDGE_BOTTOM) || (box === null || box === void 0 ? void 0 : box.marginBottom) || (style === null || style === void 0 ? void 0 : style.marginBottom) || (style === null || style === void 0 ? void 0 : style.marginVertical) || (style === null || style === void 0 ? void 0 : style.margin) || 0;
  var marginLeft = getComputedMargin(node, _yoga.default.EDGE_LEFT) || (box === null || box === void 0 ? void 0 : box.marginLeft) || (style === null || style === void 0 ? void 0 : style.marginLeft) || (style === null || style === void 0 ? void 0 : style.marginHorizontal) || (style === null || style === void 0 ? void 0 : style.margin) || 0;
  return {
    marginTop: marginTop,
    marginRight: marginRight,
    marginBottom: marginBottom,
    marginLeft: marginLeft
  };
};

var _default = getMargin;
exports.default = _default;