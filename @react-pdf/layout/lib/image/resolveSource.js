"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Resolves `src` to `@react-pdf/image` interface.
 *
 * Also it handles factories and async sources.
 *
 * @param {string | Object | Function} src
 * @returns {object} resolved src
 */
var resolveSource = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(src) {
    var source;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof src === 'function')) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return src();

          case 3:
            _context.t0 = _context.sent;
            _context.next = 9;
            break;

          case 6:
            _context.next = 8;
            return src;

          case 8:
            _context.t0 = _context.sent;

          case 9:
            source = _context.t0;
            return _context.abrupt("return", typeof source === 'string' ? {
              uri: source
            } : source);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resolveSource(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = resolveSource;
exports.default = _default;