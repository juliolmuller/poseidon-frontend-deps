"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var isRow = R.equals('row');
var isRowReverse = R.equals('row-reverse');
var isColumnReverse = R.equals('column-reverse');
/**
 * Set flex direction attribute to node's Yoga instance
 *
 * @param {String} flex direction value
 * @param {Object} node instance
 * @return {Object} node instance
 */

var setFlexDirection = function setFlexDirection(value) {
  return R.tap(function (node) {
    var yogaNode = node._yogaNode;

    if (yogaNode) {
      var yogaValue = R.cond([[isRow, R.always(_yoga.default.FLEX_DIRECTION_ROW)], [isRowReverse, R.always(_yoga.default.FLEX_DIRECTION_ROW_REVERSE)], [isColumnReverse, R.always(_yoga.default.FLEX_DIRECTION_COLUMN_REVERSE)], [R.T, R.always(_yoga.default.FLEX_DIRECTION_COLUMN)]])(value);
      yogaNode.setFlexDirection(yogaValue);
    }
  });
};

var _default = setFlexDirection;
exports.default = _default;