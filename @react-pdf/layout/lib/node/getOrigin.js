"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _matchPercent = _interopRequireDefault(require("../utils/matchPercent"));

var getTransformStyle = function getTransformStyle(s) {
  return R.pathOr('50%', ['style', s]);
};
/**
 * Get node origin
 *
 * @param {Object} node
 * @returns {Object} node origin
 */


var getOrigin = function getOrigin(node) {
  if (!node.box) return {};
  var _node$box = node.box,
      left = _node$box.left,
      top = _node$box.top,
      width = _node$box.width,
      height = _node$box.height;
  var transformOriginX = getTransformStyle('transformOriginX')(node);
  var transformOriginY = getTransformStyle('transformOriginY')(node);
  var percentX = (0, _matchPercent.default)(transformOriginX);
  var percentY = (0, _matchPercent.default)(transformOriginY);
  var offsetX = percentX ? width * percentX.percent : transformOriginX;
  var offsetY = percentY ? height * percentY.percent : transformOriginY;
  return {
    left: left + offsetX,
    top: top + offsetY
  };
};

var _default = getOrigin;
exports.default = _default;