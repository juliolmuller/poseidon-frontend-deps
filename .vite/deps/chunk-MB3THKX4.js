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

// node_modules/@mui/material/CardActions/cardActionsClasses.js
init_base();
function getCardActionsUtilityClass(slot) {
  return generateUtilityClass("MuiCardActions", slot);
}
var cardActionsClasses = generateUtilityClasses("MuiCardActions", ["root", "spacing"]);
var cardActionsClasses_default = cardActionsClasses;

// node_modules/@mui/material/CardActions/CardActions.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_styled();
init_useThemeProps();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["disableSpacing", "className"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    disableSpacing
  } = ownerState;
  const slots = {
    root: ["root", !disableSpacing && "spacing"]
  };
  return composeClasses(slots, getCardActionsUtilityClass, classes);
};
var CardActionsRoot = styled_default("div", {
  name: "MuiCardActions",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.disableSpacing && styles.spacing];
  }
})(({
  ownerState
}) => _extends({
  display: "flex",
  alignItems: "center",
  padding: 8
}, !ownerState.disableSpacing && {
  "& > :not(:first-of-type)": {
    marginLeft: 8
  }
}));
var CardActions = React.forwardRef(function CardActions2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCardActions"
  });
  const {
    disableSpacing = false,
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    disableSpacing
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(CardActionsRoot, _extends({
    className: clsx_m_default(classes.root, className),
    ownerState,
    ref
  }, other));
});
true ? CardActions.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  disableSpacing: import_prop_types.default.bool,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var CardActions_default = CardActions;

export {
  getCardActionsUtilityClass,
  cardActionsClasses_default,
  CardActions_default
};
//# sourceMappingURL=chunk-MB3THKX4.js.map