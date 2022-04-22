"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _layout = _interopRequireDefault(require("@react-pdf/textkit/lib/layout"));

var _linebreaker = _interopRequireDefault(require("@react-pdf/textkit/lib/engines/linebreaker"));

var _justification = _interopRequireDefault(require("@react-pdf/textkit/lib/engines/justification"));

var _textDecoration = _interopRequireDefault(require("@react-pdf/textkit/lib/engines/textDecoration"));

var _scriptItemizer = _interopRequireDefault(require("@react-pdf/textkit/lib/engines/scriptItemizer"));

var _wordHyphenation = _interopRequireDefault(require("@react-pdf/textkit/lib/engines/wordHyphenation"));

var _fontSubstitution = _interopRequireDefault(require("./fontSubstitution"));

var _getAttributedString = _interopRequireDefault(require("./getAttributedString"));

var engines = {
  linebreaker: _linebreaker.default,
  justification: _justification.default,
  textDecoration: _textDecoration.default,
  scriptItemizer: _scriptItemizer.default,
  wordHyphenation: _wordHyphenation.default,
  fontSubstitution: _fontSubstitution.default
};
var engine = (0, _layout.default)(engines);
var getMaxLines = R.path(['style', 'maxLines']);
var getTextOverflow = R.path(['style', 'textOverflow']);
/**
 * Get layout container for specific text node
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Object} node
 * @returns {Object} layout container
 */

var getContainer = function getContainer(width, height, node) {
  var maxLines = getMaxLines(node);
  var textOverflow = getTextOverflow(node);
  return {
    x: 0,
    y: 0,
    width: width,
    maxLines: maxLines,
    height: height || Infinity,
    truncateMode: textOverflow
  };
};
/**
 * Get text layout options for specific text node
 *
 * @param {Object} node instance
 * @returns {Object} layout options
 */


var getLayoutOptions = function getLayoutOptions(fontStore, node) {
  return {
    hyphenationPenalty: node.props.hyphenationPenalty,
    shrinkWhitespaceFactor: {
      before: -0.5,
      after: -0.5
    },
    hyphenationCallback: node.props.hyphenationCallback || (fontStore === null || fontStore === void 0 ? void 0 : fontStore.getHyphenationCallback()) || null
  };
};
/**
 * Get text lines for given node
 *
 * @param {Object} node
 * @param {Number} container width
 * @param {Number} container height
 * @param {Number} fontStore font store
 * @returns {Array} layout lines
 */


var layoutText = function layoutText(node, width, height, fontStore) {
  var attributedString = (0, _getAttributedString.default)(fontStore, node);
  var container = getContainer(width, height, node);
  var options = getLayoutOptions(fontStore, node);
  var lines = engine(attributedString, container, options);
  return R.reduce(R.concat, [], lines);
};

var _default = R.curryN(4, layoutText);

exports.default = _default;