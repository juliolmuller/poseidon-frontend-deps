import {
  TableContext_default
} from "./chunk-GWSIX34M.js";
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

// node_modules/@mui/material/Table/tableClasses.js
init_base();
function getTableUtilityClass(slot) {
  return generateUtilityClass("MuiTable", slot);
}
var tableClasses = generateUtilityClasses("MuiTable", ["root", "stickyHeader"]);
var tableClasses_default = tableClasses;

// node_modules/@mui/material/Table/Table.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_useThemeProps();
init_styled();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className", "component", "padding", "size", "stickyHeader"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    stickyHeader
  } = ownerState;
  const slots = {
    root: ["root", stickyHeader && "stickyHeader"]
  };
  return composeClasses(slots, getTableUtilityClass, classes);
};
var TableRoot = styled_default("table", {
  name: "MuiTable",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.stickyHeader && styles.stickyHeader];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: "table",
  width: "100%",
  borderCollapse: "collapse",
  borderSpacing: 0,
  "& caption": _extends({}, theme.typography.body2, {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: "left",
    captionSide: "bottom"
  })
}, ownerState.stickyHeader && {
  borderCollapse: "separate"
}));
var defaultComponent = "table";
var Table = React.forwardRef(function Table2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTable"
  });
  const {
    className,
    component = defaultComponent,
    padding = "normal",
    size = "medium",
    stickyHeader = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    component,
    padding,
    size,
    stickyHeader
  });
  const classes = useUtilityClasses(ownerState);
  const table = React.useMemo(() => ({
    padding,
    size,
    stickyHeader
  }), [padding, size, stickyHeader]);
  return (0, import_jsx_runtime.jsx)(TableContext_default.Provider, {
    value: table,
    children: (0, import_jsx_runtime.jsx)(TableRoot, _extends({
      as: component,
      role: component === defaultComponent ? null : "table",
      ref,
      className: clsx_m_default(classes.root, className),
      ownerState
    }, other))
  });
});
true ? Table.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  component: import_prop_types.default.elementType,
  padding: import_prop_types.default.oneOf(["checkbox", "none", "normal"]),
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
  stickyHeader: import_prop_types.default.bool,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Table_default = Table;

export {
  getTableUtilityClass,
  tableClasses_default,
  Table_default
};
//# sourceMappingURL=chunk-G4FDWT26.js.map