import {
  SwitchBase_default
} from "./chunk-UT66GUPH.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-ODWOOURY.js";
import {
  init_styled,
  styled_default
} from "./chunk-MXBE4YKL.js";
import {
  alpha,
  composeClasses,
  darken,
  generateUtilityClass,
  generateUtilityClasses,
  init_base,
  init_esm as init_esm2,
  init_useThemeProps,
  lighten,
  useThemeProps2 as useThemeProps
} from "./chunk-YS5JJ7Y4.js";
import {
  init_esm,
  refType_default,
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

// node_modules/@mui/material/Switch/switchClasses.js
init_base();
function getSwitchUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
var switchClasses = generateUtilityClasses("MuiSwitch", ["root", "edgeStart", "edgeEnd", "switchBase", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium", "checked", "disabled", "input", "thumb", "track"]);
var switchClasses_default = switchClasses;

// node_modules/@mui/material/Switch/Switch.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_esm();
init_base();
init_esm2();
init_capitalize();
init_useThemeProps();
init_styled();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["className", "color", "edge", "size", "sx"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    edge,
    size,
    color,
    checked,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", edge && `edge${capitalize_default(edge)}`, `size${capitalize_default(size)}`],
    switchBase: ["switchBase", `color${capitalize_default(color)}`, checked && "checked", disabled && "disabled"],
    thumb: ["thumb"],
    track: ["track"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var SwitchRoot = styled_default("span", {
  name: "MuiSwitch",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.edge && styles[`edge${capitalize_default(ownerState.edge)}`], styles[`size${capitalize_default(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends({
  display: "inline-flex",
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: "hidden",
  padding: 12,
  boxSizing: "border-box",
  position: "relative",
  flexShrink: 0,
  zIndex: 0,
  verticalAlign: "middle",
  "@media print": {
    colorAdjust: "exact"
  }
}, ownerState.edge === "start" && {
  marginLeft: -8
}, ownerState.edge === "end" && {
  marginRight: -8
}, ownerState.size === "small" && {
  width: 40,
  height: 24,
  padding: 7,
  [`& .${switchClasses_default.thumb}`]: {
    width: 16,
    height: 16
  },
  [`& .${switchClasses_default.switchBase}`]: {
    padding: 4,
    [`&.${switchClasses_default.checked}`]: {
      transform: "translateX(16px)"
    }
  }
}));
var SwitchSwitchBase = styled_default(SwitchBase_default, {
  name: "MuiSwitch",
  slot: "SwitchBase",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.switchBase, {
      [`& .${switchClasses_default.input}`]: styles.input
    }, ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`]];
  }
})(({
  theme
}) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
  color: theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.grey[300],
  transition: theme.transitions.create(["left", "transform"], {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${switchClasses_default.checked}`]: {
    transform: "translateX(20px)"
  },
  [`&.${switchClasses_default.disabled}`]: {
    color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]
  },
  [`&.${switchClasses_default.checked} + .${switchClasses_default.track}`]: {
    opacity: 0.5
  },
  [`&.${switchClasses_default.disabled} + .${switchClasses_default.track}`]: {
    opacity: theme.palette.mode === "light" ? 0.12 : 0.2
  },
  [`& .${switchClasses_default.input}`]: {
    left: "-100%",
    width: "300%"
  }
}), ({
  theme,
  ownerState
}) => _extends({
  "&:hover": {
    backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.color !== "default" && {
  [`&.${switchClasses_default.checked}`]: {
    color: theme.palette[ownerState.color].main,
    "&:hover": {
      backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    [`&.${switchClasses_default.disabled}`]: {
      color: theme.palette.mode === "light" ? lighten(theme.palette[ownerState.color].main, 0.62) : darken(theme.palette[ownerState.color].main, 0.55)
    }
  },
  [`&.${switchClasses_default.checked} + .${switchClasses_default.track}`]: {
    backgroundColor: theme.palette[ownerState.color].main
  }
}));
var SwitchTrack = styled_default("span", {
  name: "MuiSwitch",
  slot: "Track",
  overridesResolver: (props, styles) => styles.track
})(({
  theme
}) => ({
  height: "100%",
  width: "100%",
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(["opacity", "background-color"], {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white,
  opacity: theme.palette.mode === "light" ? 0.38 : 0.3
}));
var SwitchThumb = styled_default("span", {
  name: "MuiSwitch",
  slot: "Thumb",
  overridesResolver: (props, styles) => styles.thumb
})(({
  theme
}) => ({
  boxShadow: theme.shadows[1],
  backgroundColor: "currentColor",
  width: 20,
  height: 20,
  borderRadius: "50%"
}));
var Switch = React.forwardRef(function Switch2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiSwitch"
  });
  const {
    className,
    color = "primary",
    edge = false,
    size = "medium",
    sx
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    color,
    edge,
    size
  });
  const classes = useUtilityClasses(ownerState);
  const icon = (0, import_jsx_runtime.jsx)(SwitchThumb, {
    className: classes.thumb,
    ownerState
  });
  return (0, import_jsx_runtime2.jsxs)(SwitchRoot, {
    className: clsx_m_default(classes.root, className),
    sx,
    ownerState,
    children: [(0, import_jsx_runtime.jsx)(SwitchSwitchBase, _extends({
      type: "checkbox",
      icon,
      checkedIcon: icon,
      ref,
      ownerState
    }, other, {
      classes: _extends({}, classes, {
        root: classes.switchBase
      })
    })), (0, import_jsx_runtime.jsx)(SwitchTrack, {
      className: classes.track,
      ownerState
    })]
  });
});
true ? Switch.propTypes = {
  checked: import_prop_types.default.bool,
  checkedIcon: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  defaultChecked: import_prop_types.default.bool,
  disabled: import_prop_types.default.bool,
  disableRipple: import_prop_types.default.bool,
  edge: import_prop_types.default.oneOf(["end", "start", false]),
  icon: import_prop_types.default.node,
  id: import_prop_types.default.string,
  inputProps: import_prop_types.default.object,
  inputRef: refType_default,
  onChange: import_prop_types.default.func,
  required: import_prop_types.default.bool,
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  value: import_prop_types.default.any
} : void 0;
var Switch_default = Switch;

export {
  getSwitchUtilityClass,
  switchClasses_default,
  Switch_default
};
//# sourceMappingURL=chunk-6TYFE57K.js.map
