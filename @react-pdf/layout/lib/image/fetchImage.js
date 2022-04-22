"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _image = _interopRequireDefault(require("@react-pdf/image"));

var _getSource = _interopRequireDefault(require("./getSource"));

var _resolveSource = _interopRequireDefault(require("./resolveSource"));

/* eslint-disable no-param-reassign */

/**
 * Fetches image and append data to node
 * Ideally this fn should be immutable.
 *
 * @param {Object} node
 */
var fetchImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(node) {
    var src, cache, source;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            src = (0, _getSource.default)(node);
            cache = node.props.cache;

            if (src) {
              _context.next = 5;
              break;
            }

            console.warn(false, 'Image should receive either a "src" or "source" prop');
            return _context.abrupt("return");

          case 5:
            _context.prev = 5;
            _context.next = 8;
            return (0, _resolveSource.default)(src);

          case 8:
            source = _context.sent;

            if (source) {
              _context.next = 11;
              break;
            }

            throw new Error("Image's \"src\" or \"source\" prop returned " + source);

          case 11:
            _context.next = 13;
            return (0, _image.default)(source, {
              cache: cache
            });

          case 13:
            node.image = _context.sent;
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](5);
            node.image = {
              width: 0,
              height: 0
            };
            console.warn(_context.t0.message);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 16]]);
  }));

  return function fetchImage(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = fetchImage;
exports.default = _default;