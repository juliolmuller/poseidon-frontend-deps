"use strict";

exports.__esModule = true;
exports.default = void 0;

/* eslint-disable no-plusplus */
var INFINITY = 10000;

var getNextBreakpoint = function getNextBreakpoint(subnodes, widths, lineNumber) {
  var position = null;
  var minimumBadness = Infinity;
  var sum = {
    width: 0,
    stretch: 0,
    shrink: 0
  };
  var lineLength = widths[Math.min(lineNumber, widths.length - 1)];

  var calculateRatio = function calculateRatio(node) {
    if (sum.width < lineLength) {
      return sum.stretch - node.stretch > 0 ? (lineLength - sum.width) / sum.stretch : INFINITY;
    }

    if (sum.width > lineLength) {
      return sum.shrink - node.shrink > 0 ? (lineLength - sum.width) / sum.shrink : INFINITY;
    }

    return 0;
  };

  for (var i = 0; i < subnodes.length; i += 1) {
    var node = subnodes[i];

    if (node.type === 'box') {
      sum.width += node.width;
    } else if (node.type === 'glue') {
      sum.width += node.width;
      sum.stretch += node.stretch;
      sum.shrink += node.shrink;
    }

    if (sum.width - sum.shrink > lineLength) {
      if (position === null) {
        var j = i === 0 ? i + 1 : i;

        while (j < subnodes.length && (subnodes[j].type === 'glue' || subnodes[j].type === 'penalty')) {
          j++;
        }

        position = j - 1;
      }

      break;
    }

    if (node.type === 'penalty' || node.type === 'glue') {
      var ratio = calculateRatio(node);
      var penalty = node.type === 'penalty' ? node.penalty : 0;
      var badness = 100 * Math.pow(Math.abs(ratio), 3) + penalty;

      if (minimumBadness >= badness) {
        position = i;
        minimumBadness = badness;
      }
    }
  }

  return sum.width - sum.shrink > lineLength ? position : null;
};

var applyBestFit = function applyBestFit(nodes, widths) {
  var count = 0;
  var lineNumber = 0;
  var subnodes = nodes;
  var breakpoints = [{
    position: 0
  }];

  while (subnodes.length > 0) {
    var breakpoint = getNextBreakpoint(subnodes, widths, lineNumber);

    if (breakpoint !== null) {
      count += breakpoint;
      breakpoints.push({
        position: count
      });
      subnodes = subnodes.slice(breakpoint + 1, subnodes.length);
      count++;
      lineNumber++;
    } else {
      subnodes = [];
    }
  }

  return breakpoints;
};

var _default = applyBestFit;
exports.default = _default;