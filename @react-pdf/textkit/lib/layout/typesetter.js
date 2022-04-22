"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _copy = _interopRequireDefault(require("../rect/copy"));

var _crop = _interopRequireDefault(require("../rect/crop"));

var _slice = _interopRequireDefault(require("../block/slice"));

var _height = _interopRequireDefault(require("../block/height"));

var _truncate = _interopRequireDefault(require("../block/truncate"));

var _layoutParagraph = _interopRequireDefault(require("./layoutParagraph"));

var _sliceAtHeight = _interopRequireDefault(require("../block/sliceAtHeight"));

/**
 * Layout paragraphs inside container until it does not
 * fit anymore, performing line wrapping in the process.
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Object}  container rect
 * @param  {Object}  attributed strings (paragraphs)
 * @return {Array} paragraph blocks
 */
var typesetter = function typesetter(engines, options, container, attributedStrings) {
  var blocks = [];
  var paragraphs = [].concat(attributedStrings);
  var layoutBlock = (0, _layoutParagraph.default)(engines, options);
  var maxLines = R.propOr(Infinity, 'maxLines', container);
  var truncateEllipsis = container.truncateMode === 'ellipsis';
  var linesCount = maxLines;
  var paragraphRect = (0, _copy.default)(container);
  var nextParagraph = paragraphs.shift();

  while (linesCount > 0 && nextParagraph) {
    var block = layoutBlock(paragraphRect, nextParagraph);
    var slicedBlock = (0, _slice.default)(linesCount, block);
    var linesHeight = (0, _height.default)(slicedBlock);
    var shouldTruncate = truncateEllipsis && block.length !== slicedBlock.length;
    linesCount -= slicedBlock.length;

    if (paragraphRect.height >= linesHeight) {
      blocks.push(R.when(R.always(shouldTruncate), _truncate.default)(slicedBlock));
      paragraphRect = (0, _crop.default)(linesHeight, paragraphRect);
      nextParagraph = paragraphs.shift();
    } else {
      blocks.push(R.compose(_truncate.default, (0, _sliceAtHeight.default)(paragraphRect.height))(slicedBlock));
      break;
    }
  }

  return blocks;
};

var _default = R.curryN(4, typesetter);

exports.default = _default;