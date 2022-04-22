"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Set aspect ratio attribute to node's Yoga instance
 *
 * @param {Number} ratio
 * @param {Object} node instance
 * @return {Object} node instance
 */
var setAspectRatio = function setAspectRatio(value) {
  return function (node) {
    var yogaNode = node._yogaNode;

    if (!R.isNil(value) && yogaNode) {
      yogaNode.setAspectRatio(value);
    }

    return node;
  };
};

var _default = setAspectRatio;
exports.default = _default;