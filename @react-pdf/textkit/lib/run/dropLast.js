"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _slice = _interopRequireDefault(require("./slice"));

/**
 * Drop last char of run
 *
 * @param  {Object}  run
 * @return {boolean} run without last char
 */
var dropLast = function dropLast(run) {
  return (0, _slice.default)(0, run.end - run.start - 1, run);
};

var _default = dropLast;
exports.default = _default;