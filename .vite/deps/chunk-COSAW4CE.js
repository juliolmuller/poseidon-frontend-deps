import {
  isAdornedStart,
  isFilled
} from "./chunk-2HECV7DU.js";
import {
  FormControlContext_default
} from "./chunk-MHJ7JZKQ.js";
import {
  init_isMuiElement,
  isMuiElement_default
} from "./chunk-HJAS7XV3.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-ODWOOURY.js";
import {
  init_styled,
  styled_default
} from "./chunk-MXBE4YKL.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_base,
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

// node_modules/@mui/material/FormControl/formControlClasses.js
init_base();
function getFormControlUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControl", slot);
}
var formControlClasses = generateUtilityClasses("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
var formControlClasses_default = formControlClasses;

// node_modules/@mui/material/FormControl/FormControl.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_useThemeProps();
init_styled();
init_capitalize();
init_isMuiElement();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "color", "component", "disabled", "error", "focused", "fullWidth", "hiddenLabel", "margin", "required", "size", "variant"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    margin,
    fullWidth
  } = ownerState;
  const slots = {
    root: ["root", margin !== "none" && `margin${capitalize_default(margin)}`, fullWidth && "fullWidth"]
  };
  return composeClasses(slots, getFormControlUtilityClasses, classes);
};
var FormControlRoot = styled_default("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: ({
    ownerState
  }, styles) => {
    return _extends({}, styles.root, styles[`margin${capitalize_default(ownerState.margin)}`], ownerState.fullWidth && styles.fullWidth);
  }
})(({
  ownerState
}) => _extends({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: "top"
}, ownerState.margin === "normal" && {
  marginTop: 16,
  marginBottom: 8
}, ownerState.margin === "dense" && {
  marginTop: 8,
  marginBottom: 4
}, ownerState.fullWidth && {
  width: "100%"
}));
var FormControl = React.forwardRef(function FormControl2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormControl"
  });
  const {
    children,
    className,
    color = "primary",
    component = "div",
    disabled = false,
    error = false,
    focused: visuallyFocused,
    fullWidth = false,
    hiddenLabel = false,
    margin = "none",
    required = false,
    size = "medium",
    variant = "outlined"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    color,
    component,
    disabled,
    error,
    fullWidth,
    hiddenLabel,
    margin,
    required,
    size,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const [adornedStart, setAdornedStart] = React.useState(() => {
    let initialAdornedStart = false;
    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement_default(child, ["Input", "Select"])) {
          return;
        }
        const input = isMuiElement_default(child, ["Select"]) ? child.props.input : child;
        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });
  const [filled, setFilled] = React.useState(() => {
    let initialFilled = false;
    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement_default(child, ["Input", "Select"])) {
          return;
        }
        if (isFilled(child.props, true)) {
          initialFilled = true;
        }
      });
    }
    return initialFilled;
  });
  const [focusedState, setFocused] = React.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }
  const focused = visuallyFocused !== void 0 && !disabled ? visuallyFocused : focusedState;
  let registerEffect;
  if (true) {
    const registeredInput = React.useRef(false);
    registerEffect = () => {
      if (registeredInput.current) {
        console.error(["MUI: There are multiple `InputBase` components inside a FormControl.", "This creates visual inconsistencies, only use one `InputBase`."].join("\n"));
      }
      registeredInput.current = true;
      return () => {
        registeredInput.current = false;
      };
    };
  }
  const onFilled = React.useCallback(() => {
    setFilled(true);
  }, []);
  const onEmpty = React.useCallback(() => {
    setFilled(false);
  }, []);
  const childContext = {
    adornedStart,
    setAdornedStart,
    color,
    disabled,
    error,
    filled,
    focused,
    fullWidth,
    hiddenLabel,
    size,
    onBlur: () => {
      setFocused(false);
    },
    onEmpty,
    onFilled,
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    variant
  };
  return (0, import_jsx_runtime.jsx)(FormControlContext_default.Provider, {
    value: childContext,
    children: (0, import_jsx_runtime.jsx)(FormControlRoot, _extends({
      as: component,
      ownerState,
      className: clsx_m_default(classes.root, className),
      ref
    }, other, {
      children
    }))
  });
});
true ? FormControl.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  component: import_prop_types.default.elementType,
  disabled: import_prop_types.default.bool,
  error: import_prop_types.default.bool,
  focused: import_prop_types.default.bool,
  fullWidth: import_prop_types.default.bool,
  hiddenLabel: import_prop_types.default.bool,
  margin: import_prop_types.default.oneOf(["dense", "none", "normal"]),
  required: import_prop_types.default.bool,
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  variant: import_prop_types.default.oneOf(["filled", "outlined", "standard"])
} : void 0;
var FormControl_default = FormControl;

export {
  getFormControlUtilityClasses,
  formControlClasses_default,
  FormControl_default
};
//# sourceMappingURL=chunk-COSAW4CE.js.map