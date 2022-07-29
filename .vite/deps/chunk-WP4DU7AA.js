import {
  formControlState
} from "./chunk-RQZUKIRS.js";
import {
  useFormControl
} from "./chunk-4C7LM5TJ.js";
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

// node_modules/@mui/material/FormGroup/formGroupClasses.js
init_base();
function getFormGroupUtilityClass(slot) {
  return generateUtilityClass("MuiFormGroup", slot);
}
var formGroupClasses = generateUtilityClasses("MuiFormGroup", ["root", "row", "error"]);
var formGroupClasses_default = formGroupClasses;

// node_modules/@mui/material/FormGroup/FormGroup.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_styled();
init_useThemeProps();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className", "row"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    row,
    error
  } = ownerState;
  const slots = {
    root: ["root", row && "row", error && "error"]
  };
  return composeClasses(slots, getFormGroupUtilityClass, classes);
};
var FormGroupRoot = styled_default("div", {
  name: "MuiFormGroup",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.row && styles.row];
  }
})(({
  ownerState
}) => _extends({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap"
}, ownerState.row && {
  flexDirection: "row"
}));
var FormGroup = React.forwardRef(function FormGroup2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormGroup"
  });
  const {
    className,
    row = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["error"]
  });
  const ownerState = _extends({}, props, {
    row,
    error: fcs.error
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(FormGroupRoot, _extends({
    className: clsx_m_default(classes.root, className),
    ownerState,
    ref
  }, other));
});
true ? FormGroup.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  row: import_prop_types.default.bool,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var FormGroup_default = FormGroup;

export {
  getFormGroupUtilityClass,
  formGroupClasses_default,
  FormGroup_default
};
//# sourceMappingURL=chunk-WP4DU7AA.js.map
