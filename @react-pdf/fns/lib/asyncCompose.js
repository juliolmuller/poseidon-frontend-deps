"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reverse = _interopRequireDefault(require("./reverse"));

/* eslint-disable no-await-in-loop */

/**
 * Performs right-to-left function composition with async functions support
 *
 * @param  {...any} functions
 */
var asyncCompose = function asyncCompose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(value) {
      var result,
          reversedFns,
          _len2,
          args,
          _key2,
          i,
          fn,
          _args = arguments;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = value;
              reversedFns = (0, _reverse.default)(fns);

              for (_len2 = _args.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = _args[_key2];
              }

              i = 0;

            case 4:
              if (!(i < reversedFns.length)) {
                _context.next = 12;
                break;
              }

              fn = reversedFns[i];
              _context.next = 8;
              return fn.apply(void 0, [result].concat(args));

            case 8:
              result = _context.sent;

            case 9:
              i += 1;
              _context.next = 4;
              break;

            case 12:
              return _context.abrupt("return", result);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var _default = asyncCompose;
exports.default = _default;