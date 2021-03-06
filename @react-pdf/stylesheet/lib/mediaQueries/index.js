"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _mediaEngine = _interopRequireDefault(require("media-engine"));

/**
 * Resolves media queries in styles object
 *
 * @param {Object} container
 * @param {Object} styles object
 */
var resolveMediaQueries = function resolveMediaQueries(container, styles) {
  return Object.keys(styles).reduce(function (acc, key) {
    var _extends2;

    if (/@media/.test(key)) {
      var _matchMedia;

      return (0, _extends3.default)({}, acc, (0, _mediaEngine.default)((_matchMedia = {}, _matchMedia[key] = styles[key], _matchMedia), container));
    }

    return (0, _extends3.default)({}, acc, (_extends2 = {}, _extends2[key] = styles[key], _extends2));
  }, {});
};

var _default = resolveMediaQueries;
exports.default = _default;