"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _getPadding2 = _interopRequireDefault(require("../node/getPadding"));

var getContentArea = function getContentArea(page) {
  var _page$style;

  var height = (_page$style = page.style) === null || _page$style === void 0 ? void 0 : _page$style.height;

  var _getPadding = (0, _getPadding2.default)(page),
      paddingTop = _getPadding.paddingTop,
      paddingBottom = _getPadding.paddingBottom;

  return height - paddingBottom - paddingTop;
};

var _default = getContentArea;
exports.default = _default;