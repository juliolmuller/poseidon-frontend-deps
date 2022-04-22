"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _createForOfIteratorHelperLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelperLoose"));

var R = _interopRequireWildcard(require("ramda"));

var _getFactors = _interopRequireDefault(require("./getFactors"));

var _getDistances = _interopRequireDefault(require("./getDistances"));

var _advanceWidth = _interopRequireDefault(require("../../attributedString/advanceWidth"));

/* eslint-disable consistent-return */

/* eslint-disable no-plusplus */

/* eslint-disable no-restricted-syntax */

/**
 * Adjust run positions by given distances
 *
 * @param {Array} distances
 * @param {Object} line
 * @returns {Object} line
 */
var justifyLine = function justifyLine(distances, line) {
  var index = 0;

  for (var _iterator = (0, _createForOfIteratorHelperLoose2.default)(line.runs), _step; !(_step = _iterator()).done;) {
    var run = _step.value;

    for (var _iterator2 = (0, _createForOfIteratorHelperLoose2.default)(run.positions), _step2; !(_step2 = _iterator2()).done;) {
      var position = _step2.value;
      position.xAdvance += distances[index++];
    }
  }

  return line;
};
/**
 * A JustificationEngine is used by a Typesetter to perform line fragment
 * justification. This implementation is based on a description of Apple's
 * justification algorithm from a PDF in the Apple Font Tools package.
 *
 * //TODO: Make it immutable
 *
 * @param {Object} layout options
 * @param {Object} line
 * @returns {Object} line
 */


var justification = function justification(options, line) {
  var gap = line.box.width - (0, _advanceWidth.default)(line);
  if (gap === 0) return; // Exact fit

  var factors = (0, _getFactors.default)(gap, line, options);
  var distances = (0, _getDistances.default)(gap, factors);
  return justifyLine(distances, line);
};

var _default = R.curryN(2, justification);

exports.default = _default;