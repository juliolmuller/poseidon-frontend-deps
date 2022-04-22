"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var DEST_REGEXP = /^#.+/;
var isSrcId = R.test(DEST_REGEXP);

var getSource = function getSource(node) {
  var props = node.props || {};
  return props.src || props.href;
};

var setLink = function setLink(ctx, node) {
  var _node$box = node.box,
      top = _node$box.top,
      left = _node$box.left,
      width = _node$box.width,
      height = _node$box.height;
  var src = getSource(node);

  if (src) {
    var isId = isSrcId(src);
    var method = isId ? 'goTo' : 'link';
    var value = isId ? src.slice(1) : src;
    ctx[method](left, top, width, height, value);
  }

  return node;
};

var _default = R.curryN(2, setLink);

exports.default = _default;