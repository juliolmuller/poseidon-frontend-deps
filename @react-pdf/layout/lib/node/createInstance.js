"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var R = _interopRequireWildcard(require("ramda"));

var _primitives = require("@react-pdf/primitives");

var _castArray = _interopRequireDefault(require("../utils/castArray"));

var _excluded = ["style", "children"];
var isString = R.is(String);
var isNumber = R.is(Number);
var isNotString = R.complement(isString);
/**
 * Transforms a react element instance to internal element format
 *
 * @param {Object} React element
 * @returns {Object} parsed react element
 */

var createInstance = function createInstance(element) {
  if (!element) return null;
  if (isString(element) || isNumber(element)) return {
    type: _primitives.TextInstance,
    value: "" + element
  };
  if (isNotString(element.type)) return createInstance(element.type(element.props));
  var type = element.type,
      _element$props = element.props,
      _element$props$style = _element$props.style,
      style = _element$props$style === void 0 ? {} : _element$props$style,
      _element$props$childr = _element$props.children,
      children = _element$props$childr === void 0 ? [] : _element$props$childr,
      props = (0, _objectWithoutPropertiesLoose2.default)(_element$props, _excluded);
  var nextChildren = R.compose(R.map(createInstance), _castArray.default)(children);
  return {
    type: type,
    style: style,
    props: props,
    box: {},
    children: nextChildren
  };
};

var _default = createInstance;
exports.default = _default;