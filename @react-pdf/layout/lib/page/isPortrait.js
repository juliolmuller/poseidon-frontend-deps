"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _getOrientation = _interopRequireDefault(require("./getOrientation"));

/**
 * Return true if page is portrait
 *
 * @param {Object} page instance
 * @returns {Boolean} is page portrait
 */
var isPortrait = function isPortrait(page) {
  return (0, _getOrientation.default)(page) === 'portrait';
};

var _default = isPortrait;
exports.default = _default;