"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _renderNode = _interopRequireDefault(require("./primitives/renderNode"));

var _addMetadata = _interopRequireDefault(require("./operations/addMetadata"));

var renderDocument = function renderDocument(ctx) {
  return function (doc) {
    var pages = doc.children || [];
    pages.forEach((0, _renderNode.default)(ctx));
  };
};

var render = function render(ctx, doc) {
  (0, _addMetadata.default)(ctx)(doc);
  renderDocument(ctx)(doc);
  ctx.end();
  return ctx;
};

var _default = render;
exports.default = _default;