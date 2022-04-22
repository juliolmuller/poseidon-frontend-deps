"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _lineIndexAtHeight = _interopRequireDefault(require("./lineIndexAtHeight"));

var _heightAtLineIndex = _interopRequireDefault(require("./heightAtLineIndex"));

var zero = R.always(0);
var getTop = R.pathOr(0, ['box', 'top']);
var getWidows = R.pathOr(2, ['props', 'widows']);
var getOrphans = R.pathOr(2, ['props', 'orphans']);

var getLineBreak = function getLineBreak(node, height) {
  var top = getTop(node);
  var widows = getWidows(node);
  var orphans = getOrphans(node);
  var linesQuantity = node.lines.length;
  var slicedLine = (0, _lineIndexAtHeight.default)(node, height - top);

  if (slicedLine === 0) {
    return 0;
  }

  if (linesQuantity < orphans) {
    return linesQuantity;
  }

  if (slicedLine < orphans || linesQuantity < orphans + widows) {
    return 0;
  }

  if (linesQuantity === orphans + widows) {
    return orphans;
  }

  if (linesQuantity - slicedLine < widows) {
    return linesQuantity - widows;
  }

  return slicedLine;
}; // Also receives contentArea in case it's needed


var splitText = function splitText(node, height) {
  var slicedLineIndex = getLineBreak(node, height);
  var currentHeight = (0, _heightAtLineIndex.default)(node, slicedLineIndex);
  var nextHeight = node.box.height - currentHeight;
  var current = R.evolve({
    lines: R.slice(0, slicedLineIndex),
    style: R.evolve({
      marginBottom: zero,
      paddingBottom: zero,
      borderBottomWidth: zero,
      borderBottomLeftRadius: zero,
      borderBottomRightRadius: zero
    }),
    box: {
      height: R.always(currentHeight),
      borderBottomWidth: zero
    }
  }, node);
  var next = R.evolve({
    lines: R.slice(slicedLineIndex, Infinity),
    style: R.evolve({
      marginTop: zero,
      paddingTop: zero,
      borderTopWidth: zero,
      borderTopLeftRadius: zero,
      borderTopRightRadius: zero
    }),
    box: {
      top: zero,
      height: R.always(nextHeight),
      borderTopWidth: zero
    }
  }, node);
  return [current, next];
};

var _default = splitText;
exports.default = _default;