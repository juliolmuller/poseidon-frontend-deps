"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _attributedString = _interopRequireDefault(require("@react-pdf/textkit/lib/attributedString"));

var _emoji = require("./emoji");

var _ignoreChars = _interopRequireDefault(require("./ignoreChars"));

var _transformText = _interopRequireDefault(require("./transformText"));

var PREPROCESSORS = [_ignoreChars.default, _emoji.embedEmojis];
var isType = R.propEq('type');
var isImage = isType(P.Image);
var isTextInstance = isType(P.TextInstance);
/**
 * Get textkit fragments of given node object
 *
 * @param {Object} font store
 * @param {Object} instance node
 * @returns {Array} text fragments
 */

var getFragments = function getFragments(fontStore, instance, parentLink, level) {
  var _instance$props, _instance$props2;

  if (level === void 0) {
    level = 0;
  }

  if (!instance) return [{
    string: ''
  }];
  var fragments = [];
  var _instance$style = instance.style,
      _instance$style$color = _instance$style.color,
      color = _instance$style$color === void 0 ? 'black' : _instance$style$color,
      _instance$style$fontF = _instance$style.fontFamily,
      fontFamily = _instance$style$fontF === void 0 ? 'Helvetica' : _instance$style$fontF,
      fontWeight = _instance$style.fontWeight,
      fontStyle = _instance$style.fontStyle,
      _instance$style$fontS = _instance$style.fontSize,
      fontSize = _instance$style$fontS === void 0 ? 18 : _instance$style$fontS,
      _instance$style$textA = _instance$style.textAlign,
      textAlign = _instance$style$textA === void 0 ? 'left' : _instance$style$textA,
      lineHeight = _instance$style.lineHeight,
      textDecoration = _instance$style.textDecoration,
      textDecorationColor = _instance$style.textDecorationColor,
      textDecorationStyle = _instance$style.textDecorationStyle,
      textTransform = _instance$style.textTransform,
      letterSpacing = _instance$style.letterSpacing,
      textIndent = _instance$style.textIndent,
      opacity = _instance$style.opacity;
  var opts = {
    fontFamily: fontFamily,
    fontWeight: fontWeight,
    fontStyle: fontStyle
  };
  var obj = fontStore ? fontStore.getFont(opts) : null;
  var font = obj ? obj.data : fontFamily; // Don't pass main background color to textkit. Will be rendered by the render package instead

  var backgroundColor = level === 0 ? null : instance.style.backgroundColor;
  var attributes = {
    font: font,
    color: color,
    opacity: opacity,
    fontSize: fontSize,
    backgroundColor: backgroundColor,
    align: textAlign,
    indent: textIndent,
    characterSpacing: letterSpacing,
    strikeStyle: textDecorationStyle,
    underlineStyle: textDecorationStyle,
    underline: textDecoration === 'underline' || textDecoration === 'underline line-through' || textDecoration === 'line-through underline',
    strike: textDecoration === 'line-through' || textDecoration === 'underline line-through' || textDecoration === 'line-through underline',
    strikeColor: textDecorationColor || color,
    underlineColor: textDecorationColor || color,
    link: parentLink || ((_instance$props = instance.props) === null || _instance$props === void 0 ? void 0 : _instance$props.src) || ((_instance$props2 = instance.props) === null || _instance$props2 === void 0 ? void 0 : _instance$props2.href),
    lineHeight: lineHeight ? lineHeight * fontSize : null
  };

  for (var i = 0; i < instance.children.length; i += 1) {
    var child = instance.children[i];

    if (isImage(child)) {
      fragments.push({
        string: String.fromCharCode(0xfffc),
        attributes: (0, _extends2.default)({}, attributes, {
          attachment: {
            width: child.style.width || fontSize,
            height: child.style.height || fontSize,
            image: child.image.data
          }
        })
      });
    } else if (isTextInstance(child)) {
      fragments.push({
        string: (0, _transformText.default)(child.value, textTransform),
        attributes: attributes
      });
    } else if (child) {
      var _fragments;

      (_fragments = fragments).push.apply(_fragments, getFragments(fontStore, child, attributes.link, level + 1));
    }
  }

  for (var _i = 0; _i < PREPROCESSORS.length; _i += 1) {
    var preprocessor = PREPROCESSORS[_i];
    fragments = preprocessor(fragments);
  }

  return fragments;
};
/**
 * Get textkit attributed string from text node
 *
 * @param {Object} font store
 * @param {Object} instance node
 * @returns {Object} attributed string
 */


var getAttributedString = function getAttributedString(fontStore, instance) {
  var fragments = getFragments(fontStore, instance);
  return _attributedString.default.fromFragments(fragments);
};

var _default = R.curryN(2, getAttributedString);

exports.default = _default;