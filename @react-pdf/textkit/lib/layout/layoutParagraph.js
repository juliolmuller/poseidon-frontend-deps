"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _omit = _interopRequireDefault(require("../run/omit"));

var _height = _interopRequireDefault(require("../attributedString/height"));

var ATTACHMENT_CODE = "\uFFFC"; // 65532

/**
 * Remove attachment attribute if no char present
 *
 * @param  {Object} attributed string
 * @return {Object} attributed string
 */

var purgeAttachments = R.when(R.compose(R.not, R.includes(ATTACHMENT_CODE), R.prop('string')), R.evolve({
  runs: R.map((0, _omit.default)('attachment'))
}));
/**
 * Layout paragraphs inside rectangle
 *
 * @param  {Object} rect
 * @param  {Array} attributed strings
 * @return {Object} layout blocks
 */

var layoutLines = function layoutLines(rect, lines, indent) {
  var currentY = rect.y;
  return R.addIndex(R.map)(R.compose(purgeAttachments, function (line, i) {
    var lineIndent = i === 0 ? indent : 0;
    var style = R.pathOr({}, ['runs', 0, 'attributes'], line);
    var height = Math.max((0, _height.default)(line), style.lineHeight);
    var box = {
      x: rect.x + lineIndent,
      y: currentY,
      width: rect.width - lineIndent,
      height: height
    };
    currentY += height;
    return R.compose(R.assoc('box', box), R.omit(['syllables']))(line);
  }))(lines);
};
/**
 * Performs line breaking and layout
 *
 * @param  {Object} engines
 * @param  {Object}  layout options
 * @param  {Object} rect
 * @param  {Object} attributed string
 * @return {Object} layout block
 */


var layoutParagraph = function layoutParagraph(engines, options) {
  return function (rect, paragraph) {
    var indent = R.pathOr(0, ['runs', 0, 'attributes', 'indent'], paragraph);
    var lines = engines.linebreaker(options)(paragraph, [rect.width - indent, rect.width]);
    var lineFragments = layoutLines(rect, lines, indent);
    return lineFragments;
  };
};

var _default = layoutParagraph;
exports.default = _default;