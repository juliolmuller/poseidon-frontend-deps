import {
  Tablelvl2Context_default
} from "./chunk-7LV72JLA.js";
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

// node_modules/@mui/material/TableFooter/tableFooterClasses.js
init_base();
function getTableFooterUtilityClass(slot) {
  return generateUtilityClass("MuiTableFooter", slot);
}
var tableFooterClasses = generateUtilityClasses("MuiTableFooter", ["root"]);
var tableFooterClasses_default = tableFooterClasses;

// node_modules/@mui/material/TableFooter/TableFooter.js
init_extends();
init_objectWithoutPropertiesLoose();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_useThemeProps();
init_styled();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className", "component"];
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getTableFooterUtilityClass, classes);
};
var TableFooterRoot = styled_default("tfoot", {
  name: "MuiTableFooter",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  display: "table-footer-group"
});
var tablelvl2 = {
  variant: "footer"
};
var defaultComponent = "tfoot";
var TableFooter = React.forwardRef(function TableFooter2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTableFooter"
  });
  const {
    className,
    component = defaultComponent
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    component
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(Tablelvl2Context_default.Provider, {
    value: tablelvl2,
    children: (0, import_jsx_runtime.jsx)(TableFooterRoot, _extends({
      as: component,
      className: clsx_m_default(classes.root, className),
      ref,
      role: component === defaultComponent ? null : "rowgroup",
      ownerState
    }, other))
  });
});
true ? TableFooter.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  component: import_prop_types.default.elementType,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var TableFooter_default = TableFooter;

export {
  getTableFooterUtilityClass,
  tableFooterClasses_default,
  TableFooter_default
};
//# sourceMappingURL=chunk-DOBRMRK5.js.map
