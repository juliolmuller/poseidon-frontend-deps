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

// node_modules/@mui/material/Container/containerClasses.js
init_base();
function getContainerUtilityClass(slot) {
  return generateUtilityClass("MuiContainer", slot);
}
var containerClasses = generateUtilityClasses("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
var containerClasses_default = containerClasses;

// node_modules/@mui/material/Container/Container.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_useThemeProps();
init_styled();
init_capitalize();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className", "component", "disableGutters", "fixed", "maxWidth"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    fixed,
    disableGutters,
    maxWidth
  } = ownerState;
  const slots = {
    root: ["root", maxWidth && `maxWidth${capitalize_default(String(maxWidth))}`, fixed && "fixed", disableGutters && "disableGutters"]
  };
  return composeClasses(slots, getContainerUtilityClass, classes);
};
var ContainerRoot = styled_default("div", {
  name: "MuiContainer",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`maxWidth${capitalize_default(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
  }
})(({
  theme,
  ownerState
}) => _extends({
  width: "100%",
  marginLeft: "auto",
  boxSizing: "border-box",
  marginRight: "auto",
  display: "block"
}, !ownerState.disableGutters && {
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}), ({
  theme,
  ownerState
}) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
  const value = theme.breakpoints.values[breakpoint];
  if (value !== 0) {
    acc[theme.breakpoints.up(breakpoint)] = {
      maxWidth: `${value}${theme.breakpoints.unit}`
    };
  }
  return acc;
}, {}), ({
  theme,
  ownerState
}) => _extends({}, ownerState.maxWidth === "xs" && {
  [theme.breakpoints.up("xs")]: {
    maxWidth: Math.max(theme.breakpoints.values.xs, 444)
  }
}, ownerState.maxWidth && ownerState.maxWidth !== "xs" && {
  [theme.breakpoints.up(ownerState.maxWidth)]: {
    maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`
  }
}));
var Container = React.forwardRef(function Container2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiContainer"
  });
  const {
    className,
    component = "div",
    disableGutters = false,
    fixed = false,
    maxWidth = "lg"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    component,
    disableGutters,
    fixed,
    maxWidth
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(ContainerRoot, _extends({
    as: component,
    ownerState,
    className: clsx_m_default(classes.root, className),
    ref
  }, other));
});
true ? Container.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  component: import_prop_types.default.elementType,
  disableGutters: import_prop_types.default.bool,
  fixed: import_prop_types.default.bool,
  maxWidth: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types.default.string]),
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Container_default = Container;

export {
  getContainerUtilityClass,
  containerClasses_default,
  Container_default
};
//# sourceMappingURL=chunk-5H34B3HI.js.map
