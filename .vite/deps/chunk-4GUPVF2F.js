import {
  ListContext_default
} from "./chunk-G4U26BUL.js";
import {
  ButtonBase_default
} from "./chunk-UJUHTVK6.js";
import {
  init_isMuiElement,
  isMuiElement_default
} from "./chunk-PPF6QJAC.js";
import {
  init_useEnhancedEffect,
  useEnhancedEffect_default
} from "./chunk-XO64YROO.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-JGER3LXG.js";
import {
  init_styled,
  rootShouldForwardProp,
  styled_default
} from "./chunk-O5ZCJ6AR.js";
import {
  alpha,
  init_base,
  init_esm as init_esm2,
  init_useThemeProps,
  isHostComponent_default,
  useThemeProps2 as useThemeProps
} from "./chunk-EKRTOSW6.js";
import {
  chainPropTypes,
  composeClasses,
  elementTypeAcceptingRef_default,
  generateUtilityClass,
  generateUtilityClasses,
  init_esm,
  require_jsx_runtime
} from "./chunk-SGACJTM6.js";
import {
  clsx_m_default,
  init_clsx_m
} from "./chunk-6CPOZ5NC.js";
import {
  require_prop_types
} from "./chunk-25QP6ADL.js";
import {
  _objectWithoutPropertiesLoose,
  init_objectWithoutPropertiesLoose
} from "./chunk-2CJRPHYX.js";
import {
  _extends,
  init_extends
} from "./chunk-FFNBZMHM.js";
import {
  require_react
} from "./chunk-ANJDCHW7.js";
import {
  __toESM
} from "./chunk-5537U2Q2.js";

// node_modules/@mui/material/ListItem/listItemClasses.js
init_base();
function getListItemUtilityClass(slot) {
  return generateUtilityClass("MuiListItem", slot);
}
var listItemClasses = generateUtilityClasses("MuiListItem", ["root", "container", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "padding", "button", "secondaryAction", "selected"]);
var listItemClasses_default = listItemClasses;

// node_modules/@mui/material/ListItemButton/listItemButtonClasses.js
init_base();
function getListItemButtonUtilityClass(slot) {
  return generateUtilityClass("MuiListItemButton", slot);
}
var listItemButtonClasses = generateUtilityClasses("MuiListItemButton", ["root", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "selected"]);
var listItemButtonClasses_default = listItemButtonClasses;

// node_modules/@mui/material/ListItemButton/ListItemButton.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_esm2();
init_styled();
init_useThemeProps();
init_useEnhancedEffect();
init_useForkRef();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["alignItems", "autoFocus", "component", "children", "dense", "disableGutters", "divider", "focusVisibleClassName", "selected"];
var overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, ownerState.dense && styles.dense, ownerState.alignItems === "flex-start" && styles.alignItemsFlexStart, ownerState.divider && styles.divider, !ownerState.disableGutters && styles.gutters];
};
var useUtilityClasses = (ownerState) => {
  const {
    alignItems,
    classes,
    dense,
    disabled,
    disableGutters,
    divider,
    selected
  } = ownerState;
  const slots = {
    root: ["root", dense && "dense", !disableGutters && "gutters", divider && "divider", disabled && "disabled", alignItems === "flex-start" && "alignItemsFlexStart", selected && "selected"]
  };
  const composedClasses = composeClasses(slots, getListItemButtonUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var ListItemButtonRoot = styled_default(ButtonBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiListItemButton",
  slot: "Root",
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends({
  display: "flex",
  flexGrow: 1,
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minWidth: 0,
  boxSizing: "border-box",
  textAlign: "left",
  paddingTop: 8,
  paddingBottom: 8,
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.shortest
  }),
  "&:hover": {
    textDecoration: "none",
    backgroundColor: (theme.vars || theme).palette.action.hover,
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${listItemButtonClasses_default.selected}`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${listItemButtonClasses_default.focusVisible}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${listItemButtonClasses_default.selected}:hover`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  },
  [`&.${listItemButtonClasses_default.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  [`&.${listItemButtonClasses_default.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }
}, ownerState.divider && {
  borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
  backgroundClip: "padding-box"
}, ownerState.alignItems === "flex-start" && {
  alignItems: "flex-start"
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, ownerState.dense && {
  paddingTop: 4,
  paddingBottom: 4
}));
var ListItemButton = React.forwardRef(function ListItemButton2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiListItemButton"
  });
  const {
    alignItems = "center",
    autoFocus = false,
    component = "div",
    children,
    dense = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    selected = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const context = React.useContext(ListContext_default);
  const childContext = {
    dense: dense || context.dense || false,
    alignItems,
    disableGutters
  };
  const listItemRef = React.useRef(null);
  useEnhancedEffect_default(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (true) {
        console.error("MUI: Unable to set focus to a ListItemButton whose component has not been rendered.");
      }
    }
  }, [autoFocus]);
  const ownerState = _extends({}, props, {
    alignItems,
    dense: childContext.dense,
    disableGutters,
    divider,
    selected
  });
  const classes = useUtilityClasses(ownerState);
  const handleRef = useForkRef_default(listItemRef, ref);
  return (0, import_jsx_runtime.jsx)(ListContext_default.Provider, {
    value: childContext,
    children: (0, import_jsx_runtime.jsx)(ListItemButtonRoot, _extends({
      ref: handleRef,
      href: other.href || other.to,
      component: (other.href || other.to) && component === "div" ? "a" : component,
      focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
      ownerState
    }, other, {
      classes,
      children
    }))
  });
});
true ? ListItemButton.propTypes = {
  alignItems: import_prop_types.default.oneOf(["center", "flex-start"]),
  autoFocus: import_prop_types.default.bool,
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  component: import_prop_types.default.elementType,
  dense: import_prop_types.default.bool,
  disabled: import_prop_types.default.bool,
  disableGutters: import_prop_types.default.bool,
  divider: import_prop_types.default.bool,
  focusVisibleClassName: import_prop_types.default.string,
  href: import_prop_types.default.string,
  selected: import_prop_types.default.bool,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var ListItemButton_default = ListItemButton;

// node_modules/@mui/material/ListItemSecondaryAction/listItemSecondaryActionClasses.js
init_base();
function getListItemSecondaryActionClassesUtilityClass(slot) {
  return generateUtilityClass("MuiListItemSecondaryAction", slot);
}
var listItemSecondaryActionClasses = generateUtilityClasses("MuiListItemSecondaryAction", ["root", "disableGutters"]);
var listItemSecondaryActionClasses_default = listItemSecondaryActionClasses;

// node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.js
init_objectWithoutPropertiesLoose();
init_extends();
var React2 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_styled();
init_useThemeProps();
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded2 = ["className"];
var useUtilityClasses2 = (ownerState) => {
  const {
    disableGutters,
    classes
  } = ownerState;
  const slots = {
    root: ["root", disableGutters && "disableGutters"]
  };
  return composeClasses(slots, getListItemSecondaryActionClassesUtilityClass, classes);
};
var ListItemSecondaryActionRoot = styled_default("div", {
  name: "MuiListItemSecondaryAction",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.disableGutters && styles.disableGutters];
  }
})(({
  ownerState
}) => _extends({
  position: "absolute",
  right: 16,
  top: "50%",
  transform: "translateY(-50%)"
}, ownerState.disableGutters && {
  right: 0
}));
var ListItemSecondaryAction = React2.forwardRef(function ListItemSecondaryAction2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiListItemSecondaryAction"
  });
  const {
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const context = React2.useContext(ListContext_default);
  const ownerState = _extends({}, props, {
    disableGutters: context.disableGutters
  });
  const classes = useUtilityClasses2(ownerState);
  return (0, import_jsx_runtime2.jsx)(ListItemSecondaryActionRoot, _extends({
    className: clsx_m_default(classes.root, className),
    ownerState,
    ref
  }, other));
});
true ? ListItemSecondaryAction.propTypes = {
  children: import_prop_types2.default.node,
  classes: import_prop_types2.default.object,
  className: import_prop_types2.default.string,
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object])
} : void 0;
ListItemSecondaryAction.muiName = "ListItemSecondaryAction";
var ListItemSecondaryAction_default = ListItemSecondaryAction;

// node_modules/@mui/material/ListItem/ListItem.js
init_objectWithoutPropertiesLoose();
init_extends();
var React3 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_esm();
init_esm2();
init_styled();
init_useThemeProps();
init_isMuiElement();
init_useEnhancedEffect();
init_useForkRef();
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var _excluded3 = ["className"];
var _excluded22 = ["alignItems", "autoFocus", "button", "children", "className", "component", "components", "componentsProps", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "disablePadding", "divider", "focusVisibleClassName", "secondaryAction", "selected"];
var overridesResolver2 = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, ownerState.dense && styles.dense, ownerState.alignItems === "flex-start" && styles.alignItemsFlexStart, ownerState.divider && styles.divider, !ownerState.disableGutters && styles.gutters, !ownerState.disablePadding && styles.padding, ownerState.button && styles.button, ownerState.hasSecondaryAction && styles.secondaryAction];
};
var useUtilityClasses3 = (ownerState) => {
  const {
    alignItems,
    button,
    classes,
    dense,
    disabled,
    disableGutters,
    disablePadding,
    divider,
    hasSecondaryAction,
    selected
  } = ownerState;
  const slots = {
    root: ["root", dense && "dense", !disableGutters && "gutters", !disablePadding && "padding", divider && "divider", disabled && "disabled", button && "button", alignItems === "flex-start" && "alignItemsFlexStart", hasSecondaryAction && "secondaryAction", selected && "selected"],
    container: ["container"]
  };
  return composeClasses(slots, getListItemUtilityClass, classes);
};
var ListItemRoot = styled_default("div", {
  name: "MuiListItem",
  slot: "Root",
  overridesResolver: overridesResolver2
})(({
  theme,
  ownerState
}) => _extends({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "left"
}, !ownerState.disablePadding && _extends({
  paddingTop: 8,
  paddingBottom: 8
}, ownerState.dense && {
  paddingTop: 4,
  paddingBottom: 4
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, !!ownerState.secondaryAction && {
  paddingRight: 48
}), !!ownerState.secondaryAction && {
  [`& > .${listItemButtonClasses_default.root}`]: {
    paddingRight: 48
  }
}, {
  [`&.${listItemClasses_default.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  [`&.${listItemClasses_default.selected}`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${listItemClasses_default.focusVisible}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${listItemClasses_default.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }
}, ownerState.alignItems === "flex-start" && {
  alignItems: "flex-start"
}, ownerState.divider && {
  borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
  backgroundClip: "padding-box"
}, ownerState.button && {
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.shortest
  }),
  "&:hover": {
    textDecoration: "none",
    backgroundColor: (theme.vars || theme).palette.action.hover,
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${listItemClasses_default.selected}:hover`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  }
}, ownerState.hasSecondaryAction && {
  paddingRight: 48
}));
var ListItemContainer = styled_default("li", {
  name: "MuiListItem",
  slot: "Container",
  overridesResolver: (props, styles) => styles.container
})({
  position: "relative"
});
var ListItem = React3.forwardRef(function ListItem2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiListItem"
  });
  const {
    alignItems = "center",
    autoFocus = false,
    button = false,
    children: childrenProp,
    className,
    component: componentProp,
    components = {},
    componentsProps = {},
    ContainerComponent = "li",
    ContainerProps: {
      className: ContainerClassName
    } = {},
    dense = false,
    disabled = false,
    disableGutters = false,
    disablePadding = false,
    divider = false,
    focusVisibleClassName,
    secondaryAction,
    selected = false
  } = props, ContainerProps = _objectWithoutPropertiesLoose(props.ContainerProps, _excluded3), other = _objectWithoutPropertiesLoose(props, _excluded22);
  const context = React3.useContext(ListContext_default);
  const childContext = {
    dense: dense || context.dense || false,
    alignItems,
    disableGutters
  };
  const listItemRef = React3.useRef(null);
  useEnhancedEffect_default(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (true) {
        console.error("MUI: Unable to set focus to a ListItem whose component has not been rendered.");
      }
    }
  }, [autoFocus]);
  const children = React3.Children.toArray(childrenProp);
  const hasSecondaryAction = children.length && isMuiElement_default(children[children.length - 1], ["ListItemSecondaryAction"]);
  const ownerState = _extends({}, props, {
    alignItems,
    autoFocus,
    button,
    dense: childContext.dense,
    disabled,
    disableGutters,
    disablePadding,
    divider,
    hasSecondaryAction,
    selected
  });
  const classes = useUtilityClasses3(ownerState);
  const handleRef = useForkRef_default(listItemRef, ref);
  const Root = components.Root || ListItemRoot;
  const rootProps = componentsProps.root || {};
  const componentProps = _extends({
    className: clsx_m_default(classes.root, rootProps.className, className),
    disabled
  }, other);
  let Component = componentProp || "li";
  if (button) {
    componentProps.component = componentProp || "div";
    componentProps.focusVisibleClassName = clsx_m_default(listItemClasses_default.focusVisible, focusVisibleClassName);
    Component = ButtonBase_default;
  }
  if (hasSecondaryAction) {
    Component = !componentProps.component && !componentProp ? "div" : Component;
    if (ContainerComponent === "li") {
      if (Component === "li") {
        Component = "div";
      } else if (componentProps.component === "li") {
        componentProps.component = "div";
      }
    }
    return (0, import_jsx_runtime3.jsx)(ListContext_default.Provider, {
      value: childContext,
      children: (0, import_jsx_runtime4.jsxs)(ListItemContainer, _extends({
        as: ContainerComponent,
        className: clsx_m_default(classes.container, ContainerClassName),
        ref: handleRef,
        ownerState
      }, ContainerProps, {
        children: [(0, import_jsx_runtime3.jsx)(Root, _extends({}, rootProps, !isHostComponent_default(Root) && {
          as: Component,
          ownerState: _extends({}, ownerState, rootProps.ownerState)
        }, componentProps, {
          children
        })), children.pop()]
      }))
    });
  }
  return (0, import_jsx_runtime3.jsx)(ListContext_default.Provider, {
    value: childContext,
    children: (0, import_jsx_runtime4.jsxs)(Root, _extends({}, rootProps, {
      as: Component,
      ref: handleRef,
      ownerState
    }, !isHostComponent_default(Root) && {
      ownerState: _extends({}, ownerState, rootProps.ownerState)
    }, componentProps, {
      children: [children, secondaryAction && (0, import_jsx_runtime3.jsx)(ListItemSecondaryAction_default, {
        children: secondaryAction
      })]
    }))
  });
});
true ? ListItem.propTypes = {
  alignItems: import_prop_types3.default.oneOf(["center", "flex-start"]),
  autoFocus: import_prop_types3.default.bool,
  button: import_prop_types3.default.bool,
  children: chainPropTypes(import_prop_types3.default.node, (props) => {
    const children = React3.Children.toArray(props.children);
    let secondaryActionIndex = -1;
    for (let i = children.length - 1; i >= 0; i -= 1) {
      const child = children[i];
      if (isMuiElement_default(child, ["ListItemSecondaryAction"])) {
        secondaryActionIndex = i;
        break;
      }
    }
    if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) {
      return new Error("MUI: You used an element after ListItemSecondaryAction. For ListItem to detect that it has a secondary action you must pass it as the last child to ListItem.");
    }
    return null;
  }),
  classes: import_prop_types3.default.object,
  className: import_prop_types3.default.string,
  component: import_prop_types3.default.elementType,
  components: import_prop_types3.default.shape({
    Root: import_prop_types3.default.elementType
  }),
  componentsProps: import_prop_types3.default.shape({
    root: import_prop_types3.default.object
  }),
  ContainerComponent: elementTypeAcceptingRef_default,
  ContainerProps: import_prop_types3.default.object,
  dense: import_prop_types3.default.bool,
  disabled: import_prop_types3.default.bool,
  disableGutters: import_prop_types3.default.bool,
  disablePadding: import_prop_types3.default.bool,
  divider: import_prop_types3.default.bool,
  focusVisibleClassName: import_prop_types3.default.string,
  secondaryAction: import_prop_types3.default.node,
  selected: import_prop_types3.default.bool,
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object])
} : void 0;
var ListItem_default = ListItem;

export {
  getListItemUtilityClass,
  listItemClasses_default,
  getListItemButtonUtilityClass,
  listItemButtonClasses_default,
  ListItemButton_default,
  getListItemSecondaryActionClassesUtilityClass,
  listItemSecondaryActionClasses_default,
  ListItemSecondaryAction_default,
  ListItem_default
};
//# sourceMappingURL=chunk-4GUPVF2F.js.map
