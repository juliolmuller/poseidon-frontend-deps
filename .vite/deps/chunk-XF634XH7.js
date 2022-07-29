import {
  createBox,
  createTheme_default,
  init_esm as init_esm2
} from "./chunk-RSSPYCFY.js";
import {
  ClassNameGenerator_default,
  init_esm
} from "./chunk-MPSMHG7B.js";
import {
  require_prop_types
} from "./chunk-25QP6ADL.js";
import {
  __toESM
} from "./chunk-5537U2Q2.js";

// node_modules/@mui/material/Box/Box.js
init_esm2();
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/className/index.js
init_esm();

// node_modules/@mui/material/Box/Box.js
var defaultTheme = createTheme_default();
var Box = createBox({
  defaultTheme,
  defaultClassName: "MuiBox-root",
  generateClassName: ClassNameGenerator_default.generate
});
true ? Box.propTypes = {
  children: import_prop_types.default.node,
  component: import_prop_types.default.elementType,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Box_default = Box;

export {
  Box_default
};
//# sourceMappingURL=chunk-XF634XH7.js.map
