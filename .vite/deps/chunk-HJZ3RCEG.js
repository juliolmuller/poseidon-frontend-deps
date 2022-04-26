import {
  init_className
} from "./chunk-XABDZFTA.js";
import {
  ClassNameGenerator_default,
  createBox,
  createTheme_default,
  init_esm
} from "./chunk-YS5JJ7Y4.js";
import {
  require_prop_types
} from "./chunk-NKGPPEK6.js";
import {
  __toESM
} from "./chunk-JGDUASYK.js";

// node_modules/@mui/material/Box/Box.js
var import_prop_types = __toESM(require_prop_types());
init_esm();

// node_modules/@mui/material/className/index.js
init_className();

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
//# sourceMappingURL=chunk-HJZ3RCEG.js.map
