import {
  SwitchBase_default
} from "./chunk-YYTMXQLW.js";
import {
  createSvgIcon,
  init_createSvgIcon
} from "./chunk-S6UPI3WM.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-KBWM75BF.js";
import {
  init_styled,
  rootShouldForwardProp,
  styled_default
} from "./chunk-PCUTBLVA.js";
import {
  alpha,
  init_base,
  init_esm as init_esm2,
  init_useThemeProps,
  useThemeProps2 as useThemeProps
} from "./chunk-RSSPYCFY.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_esm,
  refType_default,
  require_jsx_runtime
} from "./chunk-MPSMHG7B.js";
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

// node_modules/@mui/material/Checkbox/checkboxClasses.js
init_base();
function getCheckboxUtilityClass(slot) {
  return generateUtilityClass("MuiCheckbox", slot);
}
var checkboxClasses = generateUtilityClasses("MuiCheckbox", ["root", "checked", "disabled", "indeterminate", "colorPrimary", "colorSecondary"]);
var checkboxClasses_default = checkboxClasses;

// node_modules/@mui/material/Checkbox/Checkbox.js
init_objectWithoutPropertiesLoose();
init_extends();
var React4 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_esm();
init_base();
init_esm2();

// node_modules/@mui/material/internal/svg-icons/CheckBoxOutlineBlank.js
var React = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var CheckBoxOutlineBlank_default = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), "CheckBoxOutlineBlank");

// node_modules/@mui/material/internal/svg-icons/CheckBox.js
var React2 = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var CheckBox_default = createSvgIcon((0, import_jsx_runtime2.jsx)("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), "CheckBox");

// node_modules/@mui/material/internal/svg-icons/IndeterminateCheckBox.js
var React3 = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var IndeterminateCheckBox_default = createSvgIcon((0, import_jsx_runtime3.jsx)("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), "IndeterminateCheckBox");

// node_modules/@mui/material/Checkbox/Checkbox.js
init_capitalize();
init_useThemeProps();
init_styled();
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var _excluded = ["checkedIcon", "color", "icon", "indeterminate", "indeterminateIcon", "inputProps", "size"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    indeterminate,
    color
  } = ownerState;
  const slots = {
    root: ["root", indeterminate && "indeterminate", `color${capitalize_default(color)}`]
  };
  const composedClasses = composeClasses(slots, getCheckboxUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var CheckboxRoot = styled_default(SwitchBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiCheckbox",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.indeterminate && styles.indeterminate, ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: (theme.vars || theme).palette.text.secondary
}, !ownerState.disableRipple && {
  "&:hover": {
    backgroundColor: theme.vars ? `rgba(${ownerState.color === "default" ? theme.vars.palette.action.activeChannel : theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(ownerState.color === "default" ? theme.palette.action.active : theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.color !== "default" && {
  [`&.${checkboxClasses_default.checked}, &.${checkboxClasses_default.indeterminate}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main
  },
  [`&.${checkboxClasses_default.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  }
}));
var defaultCheckedIcon = (0, import_jsx_runtime4.jsx)(CheckBox_default, {});
var defaultIcon = (0, import_jsx_runtime4.jsx)(CheckBoxOutlineBlank_default, {});
var defaultIndeterminateIcon = (0, import_jsx_runtime4.jsx)(IndeterminateCheckBox_default, {});
var Checkbox = React4.forwardRef(function Checkbox2(inProps, ref) {
  var _icon$props$fontSize, _indeterminateIcon$pr;
  const props = useThemeProps({
    props: inProps,
    name: "MuiCheckbox"
  });
  const {
    checkedIcon = defaultCheckedIcon,
    color = "primary",
    icon: iconProp = defaultIcon,
    indeterminate = false,
    indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
    inputProps,
    size = "medium"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;
  const ownerState = _extends({}, props, {
    color,
    indeterminate,
    size
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime4.jsx)(CheckboxRoot, _extends({
    type: "checkbox",
    inputProps: _extends({
      "data-indeterminate": indeterminate
    }, inputProps),
    icon: React4.cloneElement(icon, {
      fontSize: (_icon$props$fontSize = icon.props.fontSize) != null ? _icon$props$fontSize : size
    }),
    checkedIcon: React4.cloneElement(indeterminateIcon, {
      fontSize: (_indeterminateIcon$pr = indeterminateIcon.props.fontSize) != null ? _indeterminateIcon$pr : size
    }),
    ownerState,
    ref
  }, other, {
    classes
  }));
});
true ? Checkbox.propTypes = {
  checked: import_prop_types.default.bool,
  checkedIcon: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  defaultChecked: import_prop_types.default.bool,
  disabled: import_prop_types.default.bool,
  disableRipple: import_prop_types.default.bool,
  icon: import_prop_types.default.node,
  id: import_prop_types.default.string,
  indeterminate: import_prop_types.default.bool,
  indeterminateIcon: import_prop_types.default.node,
  inputProps: import_prop_types.default.object,
  inputRef: refType_default,
  onChange: import_prop_types.default.func,
  required: import_prop_types.default.bool,
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  value: import_prop_types.default.any
} : void 0;
var Checkbox_default = Checkbox;

export {
  getCheckboxUtilityClass,
  checkboxClasses_default,
  Checkbox_default
};
//# sourceMappingURL=chunk-GSNWY3E5.js.map
