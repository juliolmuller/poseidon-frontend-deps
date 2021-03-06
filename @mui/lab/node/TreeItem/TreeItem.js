"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@mui/utils");

var _Collapse = _interopRequireDefault(require("@mui/material/Collapse"));

var _styles = require("@mui/material/styles");

var _utils2 = require("@mui/material/utils");

var _base = require("@mui/base");

var _TreeViewContext = _interopRequireDefault(require("../TreeView/TreeViewContext"));

var _descendants = require("../TreeView/descendants");

var _TreeItemContent = _interopRequireDefault(require("./TreeItemContent"));

var _treeItemClasses = _interopRequireWildcard(require("./treeItemClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "collapseIcon", "ContentComponent", "ContentProps", "endIcon", "expandIcon", "disabled", "icon", "id", "label", "nodeId", "onClick", "onMouseDown", "TransitionComponent", "TransitionProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    content: ['content'],
    expanded: ['expanded'],
    selected: ['selected'],
    focused: ['focused'],
    disabled: ['disabled'],
    iconContainer: ['iconContainer'],
    label: ['label'],
    group: ['group']
  };
  return (0, _base.unstable_composeClasses)(slots, _treeItemClasses.getTreeItemUtilityClass, classes);
};

const TreeItemRoot = (0, _styles.styled)('li', {
  name: 'MuiTreeItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  outline: 0
});
const StyledTreeItemContent = (0, _styles.styled)(_TreeItemContent.default, {
  name: 'MuiTreeItem',
  slot: 'Content',
  overridesResolver: (props, styles) => {
    return [styles.content, styles.iconContainer && {
      [`& .${_treeItemClasses.default.iconContainer}`]: styles.iconContainer
    }, styles.label && {
      [`& .${_treeItemClasses.default.label}`]: styles.label
    }];
  }
})(({
  theme
}) => ({
  padding: '0 8px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${_treeItemClasses.default.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity,
    backgroundColor: 'transparent'
  },
  [`&.${_treeItemClasses.default.focused}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${_treeItemClasses.default.selected}`]: {
    backgroundColor: (0, _styles.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:hover': {
      backgroundColor: (0, _styles.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (0, _styles.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    },
    [`&.${_treeItemClasses.default.focused}`]: {
      backgroundColor: (0, _styles.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`& .${_treeItemClasses.default.iconContainer}`]: {
    marginRight: 4,
    width: 15,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    '& svg': {
      fontSize: 18
    }
  },
  [`& .${_treeItemClasses.default.label}`]: (0, _extends2.default)({
    width: '100%',
    // fixes overflow - see https://github.com/mui/material-ui/issues/27372
    minWidth: 0,
    paddingLeft: 4,
    position: 'relative'
  }, theme.typography.body1)
}));
const TreeItemGroup = (0, _styles.styled)(_Collapse.default, {
  name: 'MuiTreeItem',
  slot: 'Group',
  overridesResolver: (props, styles) => styles.group
})({
  margin: 0,
  padding: 0,
  marginLeft: 17
});
const TreeItem = /*#__PURE__*/React.forwardRef(function TreeItem(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiTreeItem'
  });
  const {
    children,
    className,
    collapseIcon,
    ContentComponent = _TreeItemContent.default,
    ContentProps,
    endIcon,
    expandIcon,
    disabled: disabledProp,
    icon,
    id: idProp,
    label,
    nodeId,
    onClick,
    onMouseDown,
    TransitionComponent = _Collapse.default,
    TransitionProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    icons: contextIcons = {},
    focus,
    isExpanded,
    isFocused,
    isSelected,
    isDisabled,
    multiSelect,
    disabledItemsFocusable,
    mapFirstChar,
    unMapFirstChar,
    registerNode,
    unregisterNode,
    treeId
  } = React.useContext(_TreeViewContext.default);
  let id = null;

  if (idProp != null) {
    id = idProp;
  } else if (treeId && nodeId) {
    id = `${treeId}-${nodeId}`;
  }

  const [treeitemElement, setTreeitemElement] = React.useState(null);
  const contentRef = React.useRef(null);
  const handleRef = (0, _utils2.useForkRef)(setTreeitemElement, ref);
  const descendant = React.useMemo(() => ({
    element: treeitemElement,
    id: nodeId
  }), [nodeId, treeitemElement]);
  const {
    index,
    parentId
  } = (0, _descendants.useDescendant)(descendant);
  const expandable = Boolean(Array.isArray(children) ? children.length : children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const disabled = isDisabled ? isDisabled(nodeId) : false;
  const ownerState = (0, _extends2.default)({}, props, {
    expanded,
    focused,
    selected,
    disabled
  });
  const classes = useUtilityClasses(ownerState);
  let displayIcon;
  let expansionIcon;

  if (expandable) {
    if (!expanded) {
      expansionIcon = expandIcon || contextIcons.defaultExpandIcon;
    } else {
      expansionIcon = collapseIcon || contextIcons.defaultCollapseIcon;
    }
  }

  if (expandable) {
    displayIcon = contextIcons.defaultParentIcon;
  } else {
    displayIcon = endIcon || contextIcons.defaultEndIcon;
  }

  React.useEffect(() => {
    // On the first render a node's index will be -1. We want to wait for the real index.
    if (registerNode && unregisterNode && index !== -1) {
      registerNode({
        id: nodeId,
        idAttribute: id,
        index,
        parentId,
        expandable,
        disabled: disabledProp
      });
      return () => {
        unregisterNode(nodeId);
      };
    }

    return undefined;
  }, [registerNode, unregisterNode, parentId, index, nodeId, expandable, disabledProp, id]);
  React.useEffect(() => {
    if (mapFirstChar && unMapFirstChar && label) {
      mapFirstChar(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());
      return () => {
        unMapFirstChar(nodeId);
      };
    }

    return undefined;
  }, [mapFirstChar, unMapFirstChar, nodeId, label]);
  let ariaSelected;

  if (multiSelect) {
    ariaSelected = selected;
  } else if (selected) {
    /* single-selection trees unset aria-selected on un-selected items.
     *
     * If the tree does not support multiple selection, aria-selected
     * is set to true for the selected node and it is not present on any other node in the tree.
     * Source: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
     */
    ariaSelected = true;
  }

  function handleFocus(event) {
    // DOM focus stays on the tree which manages focus with aria-activedescendant
    if (event.target === event.currentTarget) {
      (0, _utils2.ownerDocument)(event.target).getElementById(treeId).focus({
        preventScroll: true
      });
    }

    const unfocusable = !disabledItemsFocusable && disabled;

    if (!focused && event.currentTarget === event.target && !unfocusable) {
      focus(event, nodeId);
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(TreeItemRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    role: "treeitem",
    "aria-expanded": expandable ? expanded : null,
    "aria-selected": ariaSelected,
    "aria-disabled": disabled || null,
    ref: handleRef,
    id: id,
    tabIndex: -1
  }, other, {
    ownerState: ownerState,
    onFocus: handleFocus,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(StyledTreeItemContent, (0, _extends2.default)({
      as: ContentComponent,
      ref: contentRef,
      classes: {
        root: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        focused: classes.focused,
        disabled: classes.disabled,
        iconContainer: classes.iconContainer,
        label: classes.label
      },
      label: label,
      nodeId: nodeId,
      onClick: onClick,
      onMouseDown: onMouseDown,
      icon: icon,
      expansionIcon: expansionIcon,
      displayIcon: displayIcon,
      ownerState: ownerState
    }, ContentProps)), children && /*#__PURE__*/(0, _jsxRuntime.jsx)(_descendants.DescendantProvider, {
      id: nodeId,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(TreeItemGroup, (0, _extends2.default)({
        as: TransitionComponent,
        unmountOnExit: true,
        className: classes.group,
        in: expanded,
        component: "ul",
        role: "group"
      }, TransitionProps, {
        children: children
      }))
    })]
  }));
});
process.env.NODE_ENV !== "production" ? TreeItem.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The icon used to collapse the node.
   */
  collapseIcon: _propTypes.default.node,

  /**
   * The component used for the content node.
   * @default TreeItemContent
   */
  ContentComponent: _utils.elementTypeAcceptingRef,

  /**
   * Props applied to ContentComponent
   */
  ContentProps: _propTypes.default.object,

  /**
   * If `true`, the node is disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * The icon displayed next to a end node.
   */
  endIcon: _propTypes.default.node,

  /**
   * The icon used to expand the node.
   */
  expandIcon: _propTypes.default.node,

  /**
   * The icon to display next to the tree node's label.
   */
  icon: _propTypes.default.node,

  /**
   * @ignore
   */
  id: _propTypes.default.string,

  /**
   * The tree node label.
   */
  label: _propTypes.default.node,

  /**
   * The id of the node.
   */
  nodeId: _propTypes.default.string.isRequired,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * This prop isn't supported.
   * Use the `onNodeFocus` callback on the tree if you need to monitor a node's focus.
   */
  onFocus: _utils2.unsupportedProp,

  /**
   * @ignore
   */
  onMouseDown: _propTypes.default.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),

  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: _propTypes.default.object
} : void 0;
var _default = TreeItem;
exports.default = _default;