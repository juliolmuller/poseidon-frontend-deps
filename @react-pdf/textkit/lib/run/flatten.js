"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _sort = _interopRequireDefault(require("./sort"));

var _isEmpty = _interopRequireDefault(require("./isEmpty"));

var sortPoints = function sortPoints(a, b) {
  return a[1] - b[1] || a[3] - b[3];
};

var mergeAttributes = function mergeAttributes(key, left, right) {
  return key === 'attributes' ? R.merge(left, right) : right;
};

var generatePoints = R.o(R.sort(sortPoints), R.addIndex(R.chain)(function (run, i) {
  return [['start', run.start, run.attributes, i], ['end', run.end, run.attributes, i]];
}));
var flattenEmptyRuns = R.compose(R.map(R.reduce(R.mergeDeepWithKey(mergeAttributes), {})), R.groupWith(R.eqProps('start')));

var flattenRegularRuns = function flattenRegularRuns(runs) {
  var res = [];
  var points = generatePoints(runs);
  var start = -1;
  var attrs = {};
  var stack = [];

  for (var i = 0; i < points.length; i += 1) {
    var _points$i = points[i],
        type = _points$i[0],
        offset = _points$i[1],
        attributes = _points$i[2];

    if (start !== -1 && start < offset) {
      res.push({
        start: start,
        end: offset,
        attributes: attrs
      });
    }

    if (type === 'start') {
      stack.push(attributes);
      attrs = R.merge(attrs, attributes);
    } else {
      attrs = {};

      for (var j = 0; j < stack.length; j += 1) {
        if (stack[j] === attributes) {
          // eslint-disable-next-line no-plusplus
          stack.splice(j--, 1);
        } else {
          attrs = R.merge(attrs, stack[j]);
        }
      }
    }

    start = offset;
  }

  return res;
};
/**
 * Flatten many runs
 *
 * @param  {Array}  runs
 * @return {Array} flatten runs
 */


var flatten = function flatten(runs) {
  if (runs === void 0) {
    runs = [];
  }

  return R.compose(_sort.default, R.apply(R.useWith(R.concat, [flattenEmptyRuns, flattenRegularRuns])), R.partition(_isEmpty.default))(runs);
};

var _default = flatten;
exports.default = _default;