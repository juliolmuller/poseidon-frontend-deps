import {
  listItemIconClasses_default
} from "./chunk-DU4XQMWS.js";
import {
  ListContext_default
} from "./chunk-MWA5M5GK.js";
import {
  dividerClasses_default
} from "./chunk-2JGYKXS2.js";
import {
  Typography_default
} from "./chunk-ZKBEAABB.js";
import {
  ButtonBase_default
} from "./chunk-Y2BG3WZF.js";
import {
  init_useEnhancedEffect,
  useEnhancedEffect_default
} from "./chunk-TPIXBI6B.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-4FTVIYDD.js";
import {
  init_styled,
  rootShouldForwardProp,
  styled_default
} from "./chunk-MXBE4YKL.js";
import {
  alpha,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_base,
  init_esm,
  init_useThemeProps,
  useThemeProps2 as useThemeProps
} from "./chunk-YS5JJ7Y4.js";
import {
  require_jsx_runtime
} from "./chunk-JVY65Q2O.js";
import {
  require_prop_types
} from "./chunk-NKGPPEK6.js";
import {
  _objectWithoutPropertiesLoose,
  init_objectWithoutPropertiesLoose
} from "./chunk-AFXZRBJG.js";
import {
  _extends,
  init_extends
} from "./chunk-FKZ4BTUC.js";
import {
  clsx_m_default,
  init_clsx_m
} from "./chunk-QDNYMIU6.js";
import {
  require_react
} from "./chunk-OIOKTTU3.js";
import {
  __toESM
} from "./chunk-JGDUASYK.js";

// node_modules/@mui/material/ListItemText/listItemTextClasses.js
init_base();
function getListItemTextUtilityClass(slot) {
  return generateUtilityClass("MuiListItemText", slot);
}
var listItemTextClasses = generateUtilityClasses("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]);
var listItemTextClasses_default = listItemTextClasses;

// node_modules/@mui/material/ListItemText/ListItemText.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_useThemeProps();
init_styled();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "disableTypography", "inset", "primary", "primaryTypographyProps", "secondary", "secondaryTypographyProps"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    inset,
    primary,
    secondary,
    dense
  } = ownerState;
  const slots = {
    root: ["root", inset && "inset", dense && "dense", primary && secondary && "multiline"],
    primary: ["primary"],
    secondary: ["secondary"]
  };
  return composeClasses(slots, getListItemTextUtilityClass, classes);
};
var ListItemTextRoot = styled_default("div", {
  name: "MuiListItemText",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${listItemTextClasses_default.primary}`]: styles.primary
    }, {
      [`& .${listItemTextClasses_default.secondary}`]: styles.secondary
    }, styles.root, ownerState.inset && styles.inset, ownerState.primary && ownerState.secondary && styles.multiline, ownerState.dense && styles.dense];
  }
})(({
  ownerState
}) => _extends({
  flex: "1 1 auto",
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4
}, ownerState.primary && ownerState.secondary && {
  marginTop: 6,
  marginBottom: 6
}, ownerState.inset && {
  paddingLeft: 56
}));
var ListItemText = React.forwardRef(function ListItemText2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiListItemText"
  });
  const {
    children,
    className,
    disableTypography = false,
    inset = false,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    dense
  } = React.useContext(ListContext_default);
  let primary = primaryProp != null ? primaryProp : children;
  let secondary = secondaryProp;
  const ownerState = _extends({}, props, {
    disableTypography,
    inset,
    primary: !!primary,
    secondary: !!secondary,
    dense
  });
  const classes = useUtilityClasses(ownerState);
  if (primary != null && primary.type !== Typography_default && !disableTypography) {
    primary = (0, import_jsx_runtime.jsx)(Typography_default, _extends({
      variant: dense ? "body2" : "body1",
      className: classes.primary,
      component: "span",
      display: "block"
    }, primaryTypographyProps, {
      children: primary
    }));
  }
  if (secondary != null && secondary.type !== Typography_default && !disableTypography) {
    secondary = (0, import_jsx_runtime.jsx)(Typography_default, _extends({
      variant: "body2",
      className: classes.secondary,
      color: "text.secondary",
      display: "block"
    }, secondaryTypographyProps, {
      children: secondary
    }));
  }
  return (0, import_jsx_runtime2.jsxs)(ListItemTextRoot, _extends({
    className: clsx_m_default(classes.root, className),
    ownerState,
    ref
  }, other, {
    children: [primary, secondary]
  }));
});
true ? ListItemText.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  disableTypography: import_prop_types.default.bool,
  inset: import_prop_types.default.bool,
  primary: import_prop_types.default.node,
  primaryTypographyProps: import_prop_types.default.object,
  secondary: import_prop_types.default.node,
  secondaryTypographyProps: import_prop_types.default.object,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var ListItemText_default = ListItemText;

// node_modules/@mui/material/MenuItem/menuItemClasses.js
init_base();
function getMenuItemUtilityClass(slot) {
  return generateUtilityClass("MuiMenuItem", slot);
}
var menuItemClasses = generateUtilityClasses("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]);
var menuItemClasses_default = menuItemClasses;

// node_modules/@mui/material/MenuItem/MenuItem.js
init_objectWithoutPropertiesLoose();
init_extends();
var React2 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_esm();
init_styled();
init_useThemeProps();
init_useEnhancedEffect();
init_useForkRef();
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded2 = ["autoFocus", "component", "dense", "divider", "disableGutters", "focusVisibleClassName", "role", "tabIndex"];
var overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, ownerState.dense && styles.dense, ownerState.divider && styles.divider, !ownerState.disableGutters && styles.gutters];
};
var useUtilityClasses2 = (ownerState) => {
  const {
    disabled,
    dense,
    divider,
    disableGutters,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ["root", dense && "dense", disabled && "disabled", !disableGutters && "gutters", divider && "divider", selected && "selected"]
  };
  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var MenuItemRoot = styled_default(ButtonBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.body1, {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: "border-box",
  whiteSpace: "nowrap"
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, ownerState.divider && {
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundClip: "padding-box"
}, {
  "&:hover": {
    textDecoration: "none",
    backgroundColor: theme.palette.action.hover,
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${menuItemClasses_default.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${menuItemClasses_default.focusVisible}`]: {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${menuItemClasses_default.selected}:hover`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  },
  [`&.${menuItemClasses_default.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${menuItemClasses_default.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity
  },
  [`& + .${dividerClasses_default.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  [`& + .${dividerClasses_default.inset}`]: {
    marginLeft: 52
  },
  [`& .${listItemTextClasses_default.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${listItemTextClasses_default.inset}`]: {
    paddingLeft: 36
  },
  [`& .${listItemIconClasses_default.root}`]: {
    minWidth: 36
  }
}, !ownerState.dense && {
  [theme.breakpoints.up("sm")]: {
    minHeight: "auto"
  }
}, ownerState.dense && _extends({
  minHeight: 32,
  paddingTop: 4,
  paddingBottom: 4
}, theme.typography.body2, {
  [`& .${listItemIconClasses_default.root} svg`]: {
    fontSize: "1.25rem"
  }
})));
var MenuItem = React2.forwardRef(function MenuItem2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiMenuItem"
  });
  const {
    autoFocus = false,
    component = "li",
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = "menuitem",
    tabIndex: tabIndexProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const context = React2.useContext(ListContext_default);
  const childContext = {
    dense: dense || context.dense || false,
    disableGutters
  };
  const menuItemRef = React2.useRef(null);
  useEnhancedEffect_default(() => {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      } else if (true) {
        console.error("MUI: Unable to set focus to a MenuItem whose component has not been rendered.");
      }
    }
  }, [autoFocus]);
  const ownerState = _extends({}, props, {
    dense: childContext.dense,
    divider,
    disableGutters
  });
  const classes = useUtilityClasses2(props);
  const handleRef = useForkRef_default(menuItemRef, ref);
  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== void 0 ? tabIndexProp : -1;
  }
  return (0, import_jsx_runtime3.jsx)(ListContext_default.Provider, {
    value: childContext,
    children: (0, import_jsx_runtime3.jsx)(MenuItemRoot, _extends({
      ref: handleRef,
      role,
      tabIndex,
      component,
      focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName)
    }, other, {
      ownerState,
      classes
    }))
  });
});
true ? MenuItem.propTypes = {
  autoFocus: import_prop_types2.default.bool,
  children: import_prop_types2.default.node,
  classes: import_prop_types2.default.object,
  component: import_prop_types2.default.elementType,
  dense: import_prop_types2.default.bool,
  disabled: import_prop_types2.default.bool,
  disableGutters: import_prop_types2.default.bool,
  divider: import_prop_types2.default.bool,
  focusVisibleClassName: import_prop_types2.default.string,
  role: import_prop_types2.default.string,
  selected: import_prop_types2.default.bool,
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  tabIndex: import_prop_types2.default.number
} : void 0;
var MenuItem_default = MenuItem;

export {
  getListItemTextUtilityClass,
  listItemTextClasses_default,
  ListItemText_default,
  getMenuItemUtilityClass,
  menuItemClasses_default,
  MenuItem_default
};
//# sourceMappingURL=chunk-DRMQPD6D.js.map
