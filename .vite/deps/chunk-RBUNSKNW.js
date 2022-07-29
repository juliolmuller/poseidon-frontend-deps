import {
  formControlState
} from "./chunk-RQZUKIRS.js";
import {
  useFormControl
} from "./chunk-4C7LM5TJ.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-KV3SHR4W.js";
import {
  init_styled,
  styled_default
} from "./chunk-O5ZCJ6AR.js";
import {
  init_base,
  init_useThemeProps,
  useThemeProps2 as useThemeProps
} from "./chunk-EKRTOSW6.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
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

// node_modules/@mui/material/FormLabel/formLabelClasses.js
init_base();
function getFormLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormLabel", slot);
}
var formLabelClasses = generateUtilityClasses("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]);
var formLabelClasses_default = formLabelClasses;

// node_modules/@mui/material/FormLabel/FormLabel.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_capitalize();
init_useThemeProps();
init_styled();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "color", "component", "disabled", "error", "filled", "focused", "required"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    color,
    focused,
    disabled,
    error,
    filled,
    required
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize_default(color)}`, disabled && "disabled", error && "error", filled && "filled", focused && "focused", required && "required"],
    asterisk: ["asterisk", error && "error"]
  };
  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};
var FormLabelRoot = styled_default("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: ({
    ownerState
  }, styles) => {
    return _extends({}, styles.root, ownerState.color === "secondary" && styles.colorSecondary, ownerState.filled && styles.filled);
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: (theme.vars || theme).palette.text.secondary
}, theme.typography.body1, {
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  [`&.${formLabelClasses_default.focused}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main
  },
  [`&.${formLabelClasses_default.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled
  },
  [`&.${formLabelClasses_default.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));
var AsteriskComponent = styled_default("span", {
  name: "MuiFormLabel",
  slot: "Asterisk",
  overridesResolver: (props, styles) => styles.asterisk
})(({
  theme
}) => ({
  [`&.${formLabelClasses_default.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));
var FormLabel = React.forwardRef(function FormLabel2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormLabel"
  });
  const {
    children,
    className,
    component = "label"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
  });
  const ownerState = _extends({}, props, {
    color: fcs.color || "primary",
    component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsxs)(FormLabelRoot, _extends({
    as: component,
    ownerState,
    className: clsx_m_default(classes.root, className),
    ref
  }, other, {
    children: [children, fcs.required && (0, import_jsx_runtime.jsxs)(AsteriskComponent, {
      ownerState,
      "aria-hidden": true,
      className: classes.asterisk,
      children: ["\u2009", "*"]
    })]
  }));
});
true ? FormLabel.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), import_prop_types.default.string]),
  component: import_prop_types.default.elementType,
  disabled: import_prop_types.default.bool,
  error: import_prop_types.default.bool,
  filled: import_prop_types.default.bool,
  focused: import_prop_types.default.bool,
  required: import_prop_types.default.bool,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var FormLabel_default = FormLabel;

export {
  getFormLabelUtilityClasses,
  formLabelClasses_default,
  FormLabelRoot,
  FormLabel_default
};
//# sourceMappingURL=chunk-RBUNSKNW.js.map
