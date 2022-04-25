import {
  styled_default
} from "./chunk-MXBE4YKL.js";
import {
  PopperUnstyled_default,
  init_PopperUnstyled,
  init_esm as init_esm2,
  useThemeProps2 as useThemeProps,
  useThemeWithoutDefault_default
} from "./chunk-YS5JJ7Y4.js";
import {
  HTMLElementType,
  init_esm,
  refType_default,
  require_jsx_runtime
} from "./chunk-JVY65Q2O.js";
import {
  require_prop_types
} from "./chunk-NKGPPEK6.js";
import {
  _extends,
  init_extends
} from "./chunk-FKZ4BTUC.js";
import {
  require_react
} from "./chunk-OIOKTTU3.js";
import {
  __toESM
} from "./chunk-JGDUASYK.js";

// node_modules/@mui/material/Popper/Popper.js
init_extends();
init_PopperUnstyled();
init_esm2();
init_esm();
var import_prop_types = __toESM(require_prop_types());
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var PopperRoot = styled_default(PopperUnstyled_default, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({});
var Popper = React.forwardRef(function Popper2(inProps, ref) {
  const theme = useThemeWithoutDefault_default();
  const props = useThemeProps({
    props: inProps,
    name: "MuiPopper"
  });
  return (0, import_jsx_runtime.jsx)(PopperRoot, _extends({
    direction: theme == null ? void 0 : theme.direction
  }, props, {
    ref
  }));
});
true ? Popper.propTypes = {
  anchorEl: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.object, import_prop_types.default.func]),
  children: import_prop_types.default.oneOfType([import_prop_types.default.node, import_prop_types.default.func]),
  container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
  disablePortal: import_prop_types.default.bool,
  keepMounted: import_prop_types.default.bool,
  modifiers: import_prop_types.default.arrayOf(import_prop_types.default.shape({
    data: import_prop_types.default.object,
    effect: import_prop_types.default.func,
    enabled: import_prop_types.default.bool,
    fn: import_prop_types.default.func,
    name: import_prop_types.default.any,
    options: import_prop_types.default.object,
    phase: import_prop_types.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: import_prop_types.default.arrayOf(import_prop_types.default.string),
    requiresIfExists: import_prop_types.default.arrayOf(import_prop_types.default.string)
  })),
  open: import_prop_types.default.bool.isRequired,
  placement: import_prop_types.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  popperOptions: import_prop_types.default.shape({
    modifiers: import_prop_types.default.array,
    onFirstUpdate: import_prop_types.default.func,
    placement: import_prop_types.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: import_prop_types.default.oneOf(["absolute", "fixed"])
  }),
  popperRef: refType_default,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  transition: import_prop_types.default.bool
} : void 0;
var Popper_default = Popper;

export {
  Popper_default
};
//# sourceMappingURL=chunk-JOPNOT2I.js.map
