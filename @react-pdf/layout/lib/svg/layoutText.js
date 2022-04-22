"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _layout = _interopRequireDefault(require("@react-pdf/textkit/lib/layout"));

var _linebreaker = _interopRequireDefault(require("@react-pdf/textkit/lib/engines/linebreaker"));

var _attributedString = _interopRequireDefault(require("@react-pdf/textkit/lib/attributedString"));

var _justification = _interopRequireDefault(require("@react-pdf/textkit/lib/engines/justification"));

var _scriptItemizer = _interopRequireDefault(require("@react-pdf/textkit/lib/engines/scriptItemizer"));

var _wordHyphenation = _interopRequireDefault(require("@react-pdf/textkit/lib/engines/wordHyphenation"));

var _textDecoration = _interopRequireDefault(require("@react-pdf/textkit/lib/engines/textDecoration"));

var _transformText = _interopRequireDefault(require("../text/transformText"));

var _fontSubstitution = _interopRequireDefault(require("../text/fontSubstitution"));

var isTextInstance = R.propEq('type', P.TextInstance);
var engines = {
  linebreaker: _linebreaker.default,
  justification: _justification.default,
  scriptItemizer: _scriptItemizer.default,
  wordHyphenation: _wordHyphenation.default,
  fontSubstitution: _fontSubstitution.default,
  textDecoration: _textDecoration.default
};
var engine = (0, _layout.default)(engines);

var getFragments = function getFragments(fontStore, instance) {
  if (!instance) return [{
    string: ''
  }];
  var fragments = [];
  var _instance$props = instance.props,
      _instance$props$fill = _instance$props.fill,
      fill = _instance$props$fill === void 0 ? 'black' : _instance$props$fill,
      _instance$props$fontF = _instance$props.fontFamily,
      fontFamily = _instance$props$fontF === void 0 ? 'Helvetica' : _instance$props$fontF,
      fontWeight = _instance$props.fontWeight,
      fontStyle = _instance$props.fontStyle,
      _instance$props$fontS = _instance$props.fontSize,
      fontSize = _instance$props$fontS === void 0 ? 18 : _instance$props$fontS,
      textDecoration = _instance$props.textDecoration,
      textDecorationColor = _instance$props.textDecorationColor,
      textDecorationStyle = _instance$props.textDecorationStyle,
      textTransform = _instance$props.textTransform,
      opacity = _instance$props.opacity;
  var obj = fontStore ? fontStore.getFont({
    fontFamily: fontFamily,
    fontWeight: fontWeight,
    fontStyle: fontStyle
  }) : null;
  var font = obj ? obj.data : fontFamily;
  var attributes = {
    font: font,
    opacity: opacity,
    fontSize: fontSize,
    color: fill,
    underlineStyle: textDecorationStyle,
    underline: textDecoration === 'underline' || textDecoration === 'underline line-through' || textDecoration === 'line-through underline',
    underlineColor: textDecorationColor || fill,
    strike: textDecoration === 'line-through' || textDecoration === 'underline line-through' || textDecoration === 'line-through underline',
    strikeStyle: textDecorationStyle,
    strikeColor: textDecorationColor || fill
  };

  for (var i = 0; i < instance.children.length; i += 1) {
    var child = instance.children[i];

    if (isTextInstance(child)) {
      fragments.push({
        string: (0, _transformText.default)(child.value, textTransform),
        attributes: attributes
      });
    } else if (child) {
      fragments.push.apply(fragments, getFragments(child));
    }
  }

  return fragments;
};

var getAttributedString = function getAttributedString(fontStore, instance) {
  return _attributedString.default.fromFragments(getFragments(fontStore, instance));
};

var AlmostInfinity = 999999999999;
var shrinkWhitespaceFactor = {
  before: -0.5,
  after: -0.5
};

var layoutTspan = function layoutTspan(fontStore) {
  return function (node) {
    var attributedString = getAttributedString(fontStore, node);
    var x = R.pathOr(0, ['props', 'x'], node);
    var y = R.pathOr(0, ['props', 'y'], node);
    var container = {
      x: x,
      y: y,
      width: AlmostInfinity,
      height: AlmostInfinity
    };
    var hyphenationCallback = node.props.hyphenationCallback || (fontStore === null || fontStore === void 0 ? void 0 : fontStore.getHyphenationCallback()) || null;
    var layoutOptions = {
      hyphenationCallback: hyphenationCallback,
      shrinkWhitespaceFactor: shrinkWhitespaceFactor
    };
    var lines = R.compose(R.reduce(R.concat, []), engine)(attributedString, container, layoutOptions);
    return R.assoc('lines', lines, node);
  };
};

var layoutText = function layoutText(fontStore, node) {
  return R.evolve({
    children: R.map(layoutTspan(fontStore))
  })(node);
};

var _default = R.curryN(2, layoutText);

exports.default = _default;