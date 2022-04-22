"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _getWrap = _interopRequireDefault(require("./getWrap"));

var _getNodesHeight = _interopRequireDefault(require("./getNodesHeight"));

/* eslint-disable no-continue */
var getBreak = R.pathOr(false, ['props', 'break']);
var getMinPresenceAhead = R.path(['props', 'minPresenceAhead']);

var defaultPresenceAhead = function defaultPresenceAhead(element) {
  return function (height) {
    return Math.min(element.box.height, height);
  };
};

var getPresenceAhead = function getPresenceAhead(elements, height) {
  var result = 0;

  for (var i = 0; i < elements.length; i += 1) {
    var element = elements[i];
    if (!element.box) continue;
    var isElementInside = height > element.box.top;
    var presenceAhead = element.props.presenceAhead || defaultPresenceAhead(element);

    if (element && isElementInside) {
      result += presenceAhead(height - element.box.top);
    }
  }

  return result;
};

var shouldBreak = function shouldBreak(child, futureElements, height) {
  var minPresenceAhead = getMinPresenceAhead(child);
  var presenceAhead = getPresenceAhead(futureElements, height);
  var futureHeight = (0, _getNodesHeight.default)(futureElements);
  var shouldSplit = height < child.box.top + child.box.height;
  var shouldWrap = (0, _getWrap.default)(child);
  return getBreak(child) || !shouldWrap && shouldSplit || minPresenceAhead < futureHeight && presenceAhead < minPresenceAhead;
};

var _default = shouldBreak;
exports.default = _default;