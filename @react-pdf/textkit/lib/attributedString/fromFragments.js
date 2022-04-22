"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Create attributed string from text fragments
 *
 * @param  {Array}  fragments
 * @return {Object} attributed string
 */
var fromFragments = function fromFragments(fragments) {
  var offset = 0;
  var getRuns = R.map(function (fragment) {
    var run = {
      start: offset,
      end: offset + fragment.string.length,
      attributes: fragment.attributes || {}
    };
    offset += fragment.string.length;
    return run;
  });
  return R.applySpec({
    runs: getRuns,
    string: R.o(R.join(''), R.pluck('string'))
  })(fragments);
};

var _default = fromFragments;
exports.default = _default;