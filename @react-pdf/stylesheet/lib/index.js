"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.transformColor = exports.processTransform = exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _expand = _interopRequireDefault(require("./expand"));

var _flatten = _interopRequireDefault(require("./flatten"));

var _transform = _interopRequireDefault(require("./transform"));

var _mediaQueries = _interopRequireDefault(require("./mediaQueries"));

var _colors = _interopRequireDefault(require("./transform/colors"));

exports.transformColor = _colors.default;

var _transform2 = _interopRequireDefault(require("./transform/transform"));

exports.processTransform = _transform2.default;

/**
 * Resolves styles
 *
 * @param {Object} container
 * @param {Object} style object
 * @returns {Object} resolved style object
 */
var resolveStyles = function resolveStyles(container, style) {
  return R.compose((0, _transform.default)(container), _expand.default, (0, _mediaQueries.default)(container), _flatten.default)(style);
}; // Utils exported for SVG processing


var _default = R.curryN(2, resolveStyles);

exports.default = _default;