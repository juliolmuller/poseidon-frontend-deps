"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _getOrientation = _interopRequireDefault(require("./getOrientation"));

/**
 * Return true if page is landscape
 *
 * @param {Object} page instance
 * @returns {Boolean} is page landscape
 */
var isLandscape = function isLandscape(page) {
  return (0, _getOrientation.default)(page) === 'landscape';
};

var _default = isLandscape;
exports.default = _default;