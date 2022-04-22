"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _wrapWords = _interopRequireDefault(require("./wrapWords"));

var _typesetter = _interopRequireDefault(require("./typesetter"));

var _generateGlyphs = _interopRequireDefault(require("./generateGlyphs"));

var _resolveYOffset = _interopRequireDefault(require("./resolveYOffset"));

var _preprocessRuns = _interopRequireDefault(require("./preprocessRuns"));

var _splitParagraphs = _interopRequireDefault(require("./splitParagraphs"));

var _finalizeFragments = _interopRequireDefault(require("./finalizeFragments"));

var _resolveAttachments = _interopRequireDefault(require("./resolveAttachments"));

var _applyDefaultStyles = _interopRequireDefault(require("./applyDefaultStyles"));

/**
 * A LayoutEngine is the main object that performs text layout.
 * It accepts an AttributedString and a Container object
 * to layout text into, and uses several helper objects to perform
 * various layout tasks. These objects can be overridden to customize
 * layout behavior.
 *
 * @param  {Object}  engines
 * @param  {Object}  attributed string
 * @param  {Object}  container rect
 * @param  {Object}  layout options
 * @return {Array} paragraph blocks
 */
var layoutEngine = function layoutEngine(engines, attributedString, container, options) {
  if (options === void 0) {
    options = {};
  }

  var processParagraphs = R.compose((0, _resolveYOffset.default)(engines, options), (0, _resolveAttachments.default)(engines, options), (0, _generateGlyphs.default)(engines, options), (0, _wrapWords.default)(engines, options));
  return R.compose((0, _finalizeFragments.default)(engines, options), (0, _typesetter.default)(engines, options, container), R.map(processParagraphs), (0, _splitParagraphs.default)(engines, options), (0, _preprocessRuns.default)(engines, options), (0, _applyDefaultStyles.default)(engines, options))(attributedString);
};

var _default = R.curryN(3, layoutEngine);

exports.default = _default;