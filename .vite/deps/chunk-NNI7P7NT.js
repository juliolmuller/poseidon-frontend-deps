import {
  capitalize_default,
  init_capitalize
} from "./chunk-KV3SHR4W.js";
import {
  init_styled,
  styled_default
} from "./chunk-O5ZCJ6AR.js";
import {
  createContainer,
  init_base,
  init_esm,
  init_useThemeProps,
  useThemeProps2 as useThemeProps
} from "./chunk-EKRTOSW6.js";
import {
  generateUtilityClass,
  generateUtilityClasses
} from "./chunk-SGACJTM6.js";
import {
  require_prop_types
} from "./chunk-25QP6ADL.js";
import {
  __toESM
} from "./chunk-5537U2Q2.js";

// node_modules/@mui/material/Container/Container.js
var import_prop_types = __toESM(require_prop_types());
init_esm();
init_capitalize();
init_styled();
init_useThemeProps();
var Container = createContainer({
  createStyledComponent: styled_default("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (props, styles) => {
      const {
        ownerState
      } = props;
      return [styles.root, styles[`maxWidth${capitalize_default(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
    }
  }),
  useThemeProps: (inProps) => useThemeProps({
    props: inProps,
    name: "MuiContainer"
  })
});
true ? Container.propTypes = {
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  component: import_prop_types.default.elementType,
  disableGutters: import_prop_types.default.bool,
  fixed: import_prop_types.default.bool,
  maxWidth: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types.default.string]),
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Container_default = Container;

// node_modules/@mui/material/Container/containerClasses.js
init_base();
function getContainerUtilityClass(slot) {
  return generateUtilityClass("MuiContainer", slot);
}
var containerClasses = generateUtilityClasses("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
var containerClasses_default = containerClasses;

export {
  Container_default,
  getContainerUtilityClass,
  containerClasses_default
};
//# sourceMappingURL=chunk-NNI7P7NT.js.map
