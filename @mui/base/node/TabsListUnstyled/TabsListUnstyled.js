"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _composeClasses = _interopRequireDefault(require("../composeClasses"));

var _utils = require("../utils");

var _tabsListUnstyledClasses = require("./tabsListUnstyledClasses");

var _useTabsList = _interopRequireDefault(require("./useTabsList"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "children", "component", "components", "componentsProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ['root', orientation]
  };
  return (0, _composeClasses.default)(slots, _tabsListUnstyledClasses.getTabsListUnstyledUtilityClass, {});
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabsListUnstyled API](https://mui.com/api/tabs-list-unstyled/)
 */


const TabsListUnstyled = /*#__PURE__*/React.forwardRef((props, ref) => {
  var _ref, _componentsProps$root;

  const {
    className,
    component,
    components = {},
    componentsProps = {}
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    isRtl,
    orientation,
    getRootProps,
    processChildren
  } = (0, _useTabsList.default)((0, _extends2.default)({}, props, {
    ref
  }));
  const ownerState = (0, _extends2.default)({}, props, {
    isRtl,
    orientation
  });
  const classes = useUtilityClasses(ownerState);
  const TabsListRoot = (_ref = component != null ? component : components.Root) != null ? _ref : 'div';
  const tabsListRootProps = (0, _utils.appendOwnerState)(TabsListRoot, (0, _extends2.default)({}, other, componentsProps.root), ownerState);
  const processedChildren = processChildren();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TabsListRoot, (0, _extends2.default)({}, getRootProps(), tabsListRootProps, {
    className: (0, _clsx.default)(className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, classes.root),
    children: processedChildren
  }));
});
process.env.NODE_ENV !== "production" ? TabsListUnstyled.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: _propTypes.default.shape({
    Root: _propTypes.default.elementType
  }),

  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  componentsProps: _propTypes.default.shape({
    root: _propTypes.default.object
  })
} : void 0;
var _default = TabsListUnstyled;
exports.default = _default;