"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _advanceWidth = _interopRequireDefault(require("../attributedString/advanceWidth"));

var _leadingOffset = _interopRequireDefault(require("../attributedString/leadingOffset"));

var _trailingOffset = _interopRequireDefault(require("../attributedString/trailingOffset"));

var _dropLast = _interopRequireDefault(require("../attributedString/dropLast"));

var ALIGNMENT_FACTORS = {
  center: 0.5,
  right: 1
};
/**
 * Remove new line char at the end of line if present
 *
 * @param  {Object}  line
 * @return {Object} line
 */

var removeNewLine = R.when(R.compose(R.equals('\n'), R.last, R.prop('string')), _dropLast.default);
var getOverflowLeft = R.converge(R.add, [R.propOr(0, 'overflowLeft'), _leadingOffset.default]);
var getOverflowRight = R.converge(R.add, [R.propOr(0, 'overflowRight'), _trailingOffset.default]);
/**
 * Ignore whitespace at the start and end of a line for alignment
 *
 * @param  {Object}  line
 * @return {Object} line
 */

var adjustOverflow = function adjustOverflow(line) {
  var overflowLeft = getOverflowLeft(line);
  var overflowRight = getOverflowRight(line);
  return R.compose(R.assoc('overflowLeft', overflowLeft), R.assoc('overflowRight', overflowRight), R.evolve({
    box: R.evolve({
      x: R.subtract(R.__, overflowLeft),
      width: R.add(overflowLeft + overflowRight)
    })
  }))(line);
};
/**
 * Performs line justification by calling appropiate engine
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {string}  text align
 * @param  {Object}  line
 * @return {Object} line
 */


var justifyLine = function justifyLine(engines, options, align) {
  return function (line) {
    var lineWidth = (0, _advanceWidth.default)(line);
    var alignFactor = ALIGNMENT_FACTORS[align] || 0;
    var remainingWidth = Math.max(0, line.box.width - lineWidth);
    var shouldJustify = align === 'justify' || lineWidth > line.box.width;
    return R.compose(R.when(R.always(shouldJustify), engines.justification(options)), R.evolve({
      box: R.evolve({
        x: R.add(remainingWidth * alignFactor)
      })
    }))(line);
  };
};
/**
 * Finalize line by performing line justification
 * and text decoration (using appropiate engines)
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Object}  line
 * @param  {number}  line index
 * @param  {Array}  total lines
 * @return {Object} line
 */


var finalizeBlock = function finalizeBlock(engines, options) {
  if (engines === void 0) {
    engines = {};
  }

  return function (line, i, lines) {
    var isLastFragment = i === lines.length - 1;
    var style = R.pathOr({}, ['runs', 0, 'attributes'], line);
    var align = isLastFragment ? style.alignLastLine : style.align;
    return R.compose(engines.textDecoration(options), justifyLine(engines, options, align), adjustOverflow, removeNewLine)(line);
  };
};
/**
 * Finalize line block by performing line justification
 * and text decoration (using appropiate engines)
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Array}  line blocks
 * @return {Array} line blocks
 */


var finalizeFragments = function finalizeFragments(engines, options, blocks) {
  var blockFinalizer = finalizeBlock(engines, options);
  return blocks.map(function (block) {
    return block.map(blockFinalizer);
  });
};

var _default = R.curryN(3, finalizeFragments);

exports.default = _default;