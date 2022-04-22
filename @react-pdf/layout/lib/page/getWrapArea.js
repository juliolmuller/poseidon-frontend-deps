"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _getPadding2 = _interopRequireDefault(require("../node/getPadding"));

var getWrapArea = function getWrapArea(page) {
  var _page$style;

  var _getPadding = (0, _getPadding2.default)(page),
      paddingBottom = _getPadding.paddingBottom;

  var height = (_page$style = page.style) === null || _page$style === void 0 ? void 0 : _page$style.height;
  return height - paddingBottom;
};

var _default = getWrapArea;
exports.default = _default;