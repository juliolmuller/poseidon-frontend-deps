"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var _upperFirst = _interopRequireDefault(require("../utils/upperFirst"));

var _matchPercent = _interopRequireDefault(require("../utils/matchPercent"));

/* eslint-disable no-unused-expressions */
var isNotNil = R.complement(R.isNil);
/**
 * Set generic yoga attribute to node's Yoga instance, handing `auto`, edges and percentage cases
 *
 * @param {String} property
 * @param {Number} edge
 * @param {any} value
 * @param {Object} node instance
 * @return {Object} node instance
 */

var setYogaValue = function setYogaValue(attr, edge) {
  return function (value) {
    return function (node) {
      var yogaNode = node._yogaNode;

      if (!R.isNil(value) && yogaNode) {
        var hasEdge = isNotNil(edge);
        var fixedMethod = "set" + (0, _upperFirst.default)(attr);
        var autoMethod = fixedMethod + "Auto";
        var percentMethod = fixedMethod + "Percent";
        var percent = (0, _matchPercent.default)(value);

        if (percent && !yogaNode[percentMethod]) {
          throw new Error("You can't pass percentage values to " + attr + " property");
        }

        if (percent) {
          if (hasEdge) {
            var _yogaNode$percentMeth;

            (_yogaNode$percentMeth = yogaNode[percentMethod]) === null || _yogaNode$percentMeth === void 0 ? void 0 : _yogaNode$percentMeth.call(yogaNode, edge, percent.value);
          } else {
            var _yogaNode$percentMeth2;

            (_yogaNode$percentMeth2 = yogaNode[percentMethod]) === null || _yogaNode$percentMeth2 === void 0 ? void 0 : _yogaNode$percentMeth2.call(yogaNode, percent.value);
          }
        } else if (value === 'auto') {
          if (hasEdge) {
            var _yogaNode$autoMethod;

            (_yogaNode$autoMethod = yogaNode[autoMethod]) === null || _yogaNode$autoMethod === void 0 ? void 0 : _yogaNode$autoMethod.call(yogaNode, edge);
          } else if (attr === 'flexBasis') {
            // YogaNode.setFlexBasisAuto is missing (#766)
            yogaNode.setFlexBasis(_yoga.default.UNIT_AUTO);
          } else {
            var _yogaNode$autoMethod2;

            (_yogaNode$autoMethod2 = yogaNode[autoMethod]) === null || _yogaNode$autoMethod2 === void 0 ? void 0 : _yogaNode$autoMethod2.call(yogaNode);
          }
        } else if (hasEdge) {
          var _yogaNode$fixedMethod;

          (_yogaNode$fixedMethod = yogaNode[fixedMethod]) === null || _yogaNode$fixedMethod === void 0 ? void 0 : _yogaNode$fixedMethod.call(yogaNode, edge, value);
        } else {
          var _yogaNode$fixedMethod2;

          (_yogaNode$fixedMethod2 = yogaNode[fixedMethod]) === null || _yogaNode$fixedMethod2 === void 0 ? void 0 : _yogaNode$fixedMethod2.call(yogaNode, value);
        }
      }

      return node;
    };
  };
};

var _default = setYogaValue;
exports.default = _default;