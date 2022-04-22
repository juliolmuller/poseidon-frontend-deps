"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Get many nodes height
 *
 * @param {Array} nodes
 * @return {number} nodes height
 */
var getNodesHeight = function getNodesHeight(nodes) {
  var max = 0;
  var min = Infinity;
  if (R.isEmpty(nodes)) return 0;

  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];
    min = Math.min(min, node.box.top);
    max = Math.max(max, node.box.top + node.box.height);
  }

  return max - min;
};

var _default = getNodesHeight;
exports.default = _default;