"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var getComputedPadding = function getComputedPadding(node, edge) {
  var yogaNode = node._yogaNode;
  return yogaNode ? yogaNode.getComputedPadding(edge) : null;
};
/**
 * Get Yoga computed paddings. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} paddings
 */


var getPadding = function getPadding(node) {
  var style = node.style,
      box = node.box;
  var paddingTop = getComputedPadding(node, _yoga.default.EDGE_TOP) || (box === null || box === void 0 ? void 0 : box.paddingTop) || (style === null || style === void 0 ? void 0 : style.paddingTop) || (style === null || style === void 0 ? void 0 : style.paddingVertical) || (style === null || style === void 0 ? void 0 : style.padding) || 0;
  var paddingRight = getComputedPadding(node, _yoga.default.EDGE_RIGHT) || (box === null || box === void 0 ? void 0 : box.paddingRight) || (style === null || style === void 0 ? void 0 : style.paddingRight) || (style === null || style === void 0 ? void 0 : style.paddingHorizontal) || (style === null || style === void 0 ? void 0 : style.padding) || 0;
  var paddingBottom = getComputedPadding(node, _yoga.default.EDGE_BOTTOM) || (box === null || box === void 0 ? void 0 : box.paddingBottom) || (style === null || style === void 0 ? void 0 : style.paddingBottom) || (style === null || style === void 0 ? void 0 : style.paddingVertical) || (style === null || style === void 0 ? void 0 : style.padding) || 0;
  var paddingLeft = getComputedPadding(node, _yoga.default.EDGE_LEFT) || (box === null || box === void 0 ? void 0 : box.paddingLeft) || (style === null || style === void 0 ? void 0 : style.paddingLeft) || (style === null || style === void 0 ? void 0 : style.paddingHorizontal) || (style === null || style === void 0 ? void 0 : style.padding) || 0;
  return {
    paddingTop: paddingTop,
    paddingRight: paddingRight,
    paddingBottom: paddingBottom,
    paddingLeft: paddingLeft
  };
};

var _default = getPadding;
exports.default = _default;