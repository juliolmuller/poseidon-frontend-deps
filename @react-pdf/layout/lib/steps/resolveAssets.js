"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _emoji = _interopRequireDefault(require("../text/emoji"));

var _fetchImage = _interopRequireDefault(require("../image/fetchImage"));

var isImage = R.propEq('type', P.Image);
/**
 * Get all asset promises that need to be resolved
 *
 * @param {Object} root node
 * @returns {Array} asset promises
 */

var fetchAssets = function fetchAssets(fontStore, node) {
  var _node$children;

  var promises = [];
  var listToExplore = ((_node$children = node.children) === null || _node$children === void 0 ? void 0 : _node$children.slice(0)) || [];
  var emojiSource = fontStore ? fontStore.getEmojiSource() : null;

  while (listToExplore.length > 0) {
    var _n$style;

    var n = listToExplore.shift();

    if (isImage(n)) {
      promises.push((0, _fetchImage.default)(n));
    }

    if (fontStore && (_n$style = n.style) !== null && _n$style !== void 0 && _n$style.fontFamily) {
      promises.push(fontStore.load(n.style));
    }

    if (typeof n === 'string') {
      promises.push.apply(promises, (0, _emoji.default)(n, emojiSource));
    }

    if (typeof n.value === 'string') {
      promises.push.apply(promises, (0, _emoji.default)(n.value, emojiSource));
    }

    if (n.children) {
      n.children.forEach(function (childNode) {
        listToExplore.push(childNode);
      });
    }
  }

  return promises;
};
/**
 * Fetch image, font and emoji assets in parallel.
 * Layout process will not be resumed until promise resolves.
 *
 * @param {Object} root node
 * @param {Object} fontStore font store
 * @returns {Object} root node
 */


var resolveAssets = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(node, fontStore) {
    var promises;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            promises = fetchAssets(fontStore, node);
            _context.next = 3;
            return Promise.all(promises);

          case 3:
            return _context.abrupt("return", node);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resolveAssets(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = resolveAssets;
exports.default = _default;