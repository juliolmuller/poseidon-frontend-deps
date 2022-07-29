import {
  useRadioGroup
} from "./chunk-QQ5B2PFE.js";
import {
  SwitchBase_default
} from "./chunk-35PKBI75.js";
import {
  createChainedFunction_default,
  init_createChainedFunction
} from "./chunk-5HNS3KTZ.js";
import {
  createSvgIcon,
  init_createSvgIcon
} from "./chunk-2MHDOXQ5.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-KV3SHR4W.js";
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
  useThemeProps2 as useThemeProps
} from "./chunk-EKRTOSW6.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_esm,
  refType_default,
  require_jsx_runtime
} from "./chunk-SGACJTM6.js";
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

// node_modules/@mui/material/Radio/radioClasses.js
init_base();
function getRadioUtilityClass(slot) {
  return generateUtilityClass("MuiRadio", slot);
}
var radioClasses = generateUtilityClasses("MuiRadio", ["root", "checked", "disabled", "colorPrimary", "colorSecondary"]);
var radioClasses_default = radioClasses;

// node_modules/@mui/material/Radio/Radio.js
init_objectWithoutPropertiesLoose();
init_extends();
var React4 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
init_esm();
init_base();
init_esm2();
init_useThemeProps();

// node_modules/@mui/material/Radio/RadioButtonIcon.js
init_extends();
var React3 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/internal/svg-icons/RadioButtonUnchecked.js
var React = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var RadioButtonUnchecked_default = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "RadioButtonUnchecked");

// node_modules/@mui/material/internal/svg-icons/RadioButtonChecked.js
var React2 = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var RadioButtonChecked_default = createSvgIcon((0, import_jsx_runtime2.jsx)("path", {
  d: "M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
}), "RadioButtonChecked");

// node_modules/@mui/material/Radio/RadioButtonIcon.js
init_styled();
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var RadioButtonIconRoot = styled_default("span")({
  position: "relative",
  display: "flex"
});
var RadioButtonIconBackground = styled_default(RadioButtonUnchecked_default)({
  transform: "scale(1)"
});
var RadioButtonIconDot = styled_default(RadioButtonChecked_default)(({
  theme,
  ownerState
}) => _extends({
  left: 0,
  position: "absolute",
  transform: "scale(0)",
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.shortest
  })
}, ownerState.checked && {
  transform: "scale(1)",
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.shortest
  })
}));
function RadioButtonIcon(props) {
  const {
    checked = false,
    classes = {},
    fontSize
  } = props;
  const ownerState = _extends({}, props, {
    checked
  });
  return (0, import_jsx_runtime4.jsxs)(RadioButtonIconRoot, {
    className: classes.root,
    ownerState,
    children: [(0, import_jsx_runtime3.jsx)(RadioButtonIconBackground, {
      fontSize,
      className: classes.background,
      ownerState
    }), (0, import_jsx_runtime3.jsx)(RadioButtonIconDot, {
      fontSize,
      className: classes.dot,
      ownerState
    })]
  });
}
true ? RadioButtonIcon.propTypes = {
  checked: import_prop_types.default.bool,
  classes: import_prop_types.default.object,
  fontSize: import_prop_types.default.oneOf(["small", "medium"])
} : void 0;
var RadioButtonIcon_default = RadioButtonIcon;

// node_modules/@mui/material/Radio/Radio.js
init_capitalize();
init_createChainedFunction();
init_styled();
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var _excluded = ["checked", "checkedIcon", "color", "icon", "name", "onChange", "size"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    color
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize_default(color)}`]
  };
  return _extends({}, classes, composeClasses(slots, getRadioUtilityClass, classes));
};
var RadioRoot = styled_default(SwitchBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiRadio",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`color${capitalize_default(ownerState.color)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: (theme.vars || theme).palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.vars ? `rgba(${ownerState.color === "default" ? theme.vars.palette.action.activeChannel : theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(ownerState.color === "default" ? theme.palette.action.active : theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.color !== "default" && {
  [`&.${radioClasses_default.checked}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main
  }
}, {
  [`&.${radioClasses_default.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  }
}));
function areEqualValues(a, b) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }
  return String(a) === String(b);
}
var defaultCheckedIcon = (0, import_jsx_runtime5.jsx)(RadioButtonIcon_default, {
  checked: true
});
var defaultIcon = (0, import_jsx_runtime5.jsx)(RadioButtonIcon_default, {});
var Radio = React4.forwardRef(function Radio2(inProps, ref) {
  var _defaultIcon$props$fo, _defaultCheckedIcon$p;
  const props = useThemeProps({
    props: inProps,
    name: "MuiRadio"
  });
  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    color = "primary",
    icon = defaultIcon,
    name: nameProp,
    onChange: onChangeProp,
    size = "medium"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    color,
    size
  });
  const classes = useUtilityClasses(ownerState);
  const radioGroup = useRadioGroup();
  let checked = checkedProp;
  const onChange = createChainedFunction_default(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;
  if (radioGroup) {
    if (typeof checked === "undefined") {
      checked = areEqualValues(radioGroup.value, props.value);
    }
    if (typeof name === "undefined") {
      name = radioGroup.name;
    }
  }
  return (0, import_jsx_runtime5.jsx)(RadioRoot, _extends({
    type: "radio",
    icon: React4.cloneElement(icon, {
      fontSize: (_defaultIcon$props$fo = defaultIcon.props.fontSize) != null ? _defaultIcon$props$fo : size
    }),
    checkedIcon: React4.cloneElement(checkedIcon, {
      fontSize: (_defaultCheckedIcon$p = defaultCheckedIcon.props.fontSize) != null ? _defaultCheckedIcon$p : size
    }),
    ownerState,
    classes,
    name,
    checked,
    onChange,
    ref
  }, other));
});
true ? Radio.propTypes = {
  checked: import_prop_types2.default.bool,
  checkedIcon: import_prop_types2.default.node,
  classes: import_prop_types2.default.object,
  color: import_prop_types2.default.oneOfType([import_prop_types2.default.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types2.default.string]),
  disabled: import_prop_types2.default.bool,
  disableRipple: import_prop_types2.default.bool,
  icon: import_prop_types2.default.node,
  id: import_prop_types2.default.string,
  inputProps: import_prop_types2.default.object,
  inputRef: refType_default,
  name: import_prop_types2.default.string,
  onChange: import_prop_types2.default.func,
  required: import_prop_types2.default.bool,
  size: import_prop_types2.default.oneOfType([import_prop_types2.default.oneOf(["medium", "small"]), import_prop_types2.default.string]),
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  value: import_prop_types2.default.any
} : void 0;
var Radio_default = Radio;

export {
  getRadioUtilityClass,
  radioClasses_default,
  Radio_default
};
//# sourceMappingURL=chunk-USVXTBTG.js.map
