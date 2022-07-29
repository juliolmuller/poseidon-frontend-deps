import {
  ButtonGroupContext_default
} from "./chunk-ESJUAMIR.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-KBWM75BF.js";
import {
  init_styled,
  styled_default
} from "./chunk-PCUTBLVA.js";
import {
  alpha,
  init_base,
  init_esm,
  init_useThemeProps,
  useThemeProps2 as useThemeProps
} from "./chunk-RSSPYCFY.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_jsx_runtime
} from "./chunk-MPSMHG7B.js";
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

// node_modules/@mui/material/ButtonGroup/buttonGroupClasses.js
init_base();
function getButtonGroupUtilityClass(slot) {
  return generateUtilityClass("MuiButtonGroup", slot);
}
var buttonGroupClasses = generateUtilityClasses("MuiButtonGroup", ["root", "contained", "outlined", "text", "disableElevation", "disabled", "fullWidth", "vertical", "grouped", "groupedHorizontal", "groupedVertical", "groupedText", "groupedTextHorizontal", "groupedTextVertical", "groupedTextPrimary", "groupedTextSecondary", "groupedOutlined", "groupedOutlinedHorizontal", "groupedOutlinedVertical", "groupedOutlinedPrimary", "groupedOutlinedSecondary", "groupedContained", "groupedContainedHorizontal", "groupedContainedVertical", "groupedContainedPrimary", "groupedContainedSecondary"]);
var buttonGroupClasses_default = buttonGroupClasses;

// node_modules/@mui/material/ButtonGroup/ButtonGroup.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_esm();
init_capitalize();
init_styled();
init_useThemeProps();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "disableRipple", "fullWidth", "orientation", "size", "variant"];
var overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [{
    [`& .${buttonGroupClasses_default.grouped}`]: styles.grouped
  }, {
    [`& .${buttonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.orientation)}`]
  }, {
    [`& .${buttonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.variant)}`]
  }, {
    [`& .${buttonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.variant)}${capitalize_default(ownerState.orientation)}`]
  }, {
    [`& .${buttonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.variant)}${capitalize_default(ownerState.color)}`]
  }, styles.root, styles[ownerState.variant], ownerState.disableElevation === true && styles.disableElevation, ownerState.fullWidth && styles.fullWidth, ownerState.orientation === "vertical" && styles.vertical];
};
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    color,
    disabled,
    disableElevation,
    fullWidth,
    orientation,
    variant
  } = ownerState;
  const slots = {
    root: ["root", variant, orientation === "vertical" && "vertical", fullWidth && "fullWidth", disableElevation && "disableElevation"],
    grouped: ["grouped", `grouped${capitalize_default(orientation)}`, `grouped${capitalize_default(variant)}`, `grouped${capitalize_default(variant)}${capitalize_default(orientation)}`, `grouped${capitalize_default(variant)}${capitalize_default(color)}`, disabled && "disabled"]
  };
  return composeClasses(slots, getButtonGroupUtilityClass, classes);
};
var ButtonGroupRoot = styled_default("div", {
  name: "MuiButtonGroup",
  slot: "Root",
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends({
  display: "inline-flex",
  borderRadius: (theme.vars || theme).shape.borderRadius
}, ownerState.variant === "contained" && {
  boxShadow: (theme.vars || theme).shadows[2]
}, ownerState.disableElevation && {
  boxShadow: "none"
}, ownerState.fullWidth && {
  width: "100%"
}, ownerState.orientation === "vertical" && {
  flexDirection: "column"
}, {
  [`& .${buttonGroupClasses_default.grouped}`]: _extends({
    minWidth: 40,
    "&:not(:first-of-type)": _extends({}, ownerState.orientation === "horizontal" && {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    }, ownerState.orientation === "vertical" && {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0
    }, ownerState.variant === "outlined" && ownerState.orientation === "horizontal" && {
      marginLeft: -1
    }, ownerState.variant === "outlined" && ownerState.orientation === "vertical" && {
      marginTop: -1
    }),
    "&:not(:last-of-type)": _extends({}, ownerState.orientation === "horizontal" && {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    }, ownerState.orientation === "vertical" && {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0
    }, ownerState.variant === "text" && ownerState.orientation === "horizontal" && {
      borderRight: theme.vars ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`
    }, ownerState.variant === "text" && ownerState.orientation === "vertical" && {
      borderBottom: theme.vars ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`
    }, ownerState.variant === "text" && ownerState.color !== "inherit" && {
      borderColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)` : alpha(theme.palette[ownerState.color].main, 0.5)
    }, ownerState.variant === "outlined" && ownerState.orientation === "horizontal" && {
      borderRightColor: "transparent"
    }, ownerState.variant === "outlined" && ownerState.orientation === "vertical" && {
      borderBottomColor: "transparent"
    }, ownerState.variant === "contained" && ownerState.orientation === "horizontal" && {
      borderRight: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
      [`&.${buttonGroupClasses_default.disabled}`]: {
        borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`
      }
    }, ownerState.variant === "contained" && ownerState.orientation === "vertical" && {
      borderBottom: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
      [`&.${buttonGroupClasses_default.disabled}`]: {
        borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`
      }
    }, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
      borderColor: (theme.vars || theme).palette[ownerState.color].dark
    }, {
      "&:hover": _extends({}, ownerState.variant === "outlined" && ownerState.orientation === "horizontal" && {
        borderRightColor: "currentColor"
      }, ownerState.variant === "outlined" && ownerState.orientation === "vertical" && {
        borderBottomColor: "currentColor"
      })
    }),
    "&:hover": _extends({}, ownerState.variant === "contained" && {
      boxShadow: "none"
    })
  }, ownerState.variant === "contained" && {
    boxShadow: "none"
  })
}));
var ButtonGroup = React.forwardRef(function ButtonGroup2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiButtonGroup"
  });
  const {
    children,
    className,
    color = "primary",
    component = "div",
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth = false,
    orientation = "horizontal",
    size = "medium",
    variant = "outlined"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    orientation,
    size,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const context = React.useMemo(() => ({
    className: classes.grouped,
    color,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    size,
    variant
  }), [color, disabled, disableElevation, disableFocusRipple, disableRipple, fullWidth, size, variant, classes.grouped]);
  return (0, import_jsx_runtime.jsx)(ButtonGroupRoot, _extends({
    as: component,
    role: "group",
    className: clsx_m_default(classes.root, className),
    ref,
    ownerState
  }, other, {
    children: (0, import_jsx_runtime.jsx)(ButtonGroupContext_default.Provider, {
      value: context,
      children
    })
  }));
});
true ? ButtonGroup.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["inherit", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  component: import_prop_types.default.elementType,
  disabled: import_prop_types.default.bool,
  disableElevation: import_prop_types.default.bool,
  disableFocusRipple: import_prop_types.default.bool,
  disableRipple: import_prop_types.default.bool,
  fullWidth: import_prop_types.default.bool,
  orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["small", "medium", "large"]), import_prop_types.default.string]),
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["contained", "outlined", "text"]), import_prop_types.default.string])
} : void 0;
var ButtonGroup_default = ButtonGroup;

export {
  getButtonGroupUtilityClass,
  buttonGroupClasses_default,
  ButtonGroup_default
};
//# sourceMappingURL=chunk-AWHP2THK.js.map
