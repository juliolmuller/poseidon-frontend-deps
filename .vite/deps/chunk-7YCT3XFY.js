import {
  createChainedFunction_default,
  init_createChainedFunction
} from "./chunk-5HNS3KTZ.js";
import {
  init_useId,
  useId_default
} from "./chunk-L52IZDPU.js";
import {
  debounce_default,
  init_debounce,
  init_ownerDocument,
  init_ownerWindow,
  ownerDocument_default,
  ownerWindow_default
} from "./chunk-LHGBEJIT.js";
import {
  init_isMuiElement,
  isMuiElement_default
} from "./chunk-PPF6QJAC.js";
import {
  init_requirePropFactory,
  requirePropFactory_default
} from "./chunk-Z6HVUFFL.js";
import {
  init_useControlled,
  useControlled_default
} from "./chunk-CCGPOBE7.js";
import {
  init_useEnhancedEffect,
  useEnhancedEffect_default
} from "./chunk-XO64YROO.js";
import {
  init_unsupportedProp,
  unsupportedProp_default
} from "./chunk-3UNLTE2K.js";
import {
  init_useEventCallback,
  useEventCallback_default
} from "./chunk-YX52EVYL.js";
import {
  init_useIsFocusVisible,
  useIsFocusVisible_default
} from "./chunk-XXSKUVYL.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-JGER3LXG.js";
import {
  createSvgIcon,
  init_createSvgIcon
} from "./chunk-2MHDOXQ5.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-KV3SHR4W.js";
import {
  ClassNameGenerator_default,
  deprecatedPropType,
  init_esm,
  setRef
} from "./chunk-SGACJTM6.js";
import {
  __esm,
  __export
} from "./chunk-5537U2Q2.js";

// node_modules/@mui/material/utils/deprecatedPropType.js
var deprecatedPropType_default;
var init_deprecatedPropType = __esm({
  "node_modules/@mui/material/utils/deprecatedPropType.js"() {
    init_esm();
    deprecatedPropType_default = deprecatedPropType;
  }
});

// node_modules/@mui/material/utils/setRef.js
var setRef_default;
var init_setRef = __esm({
  "node_modules/@mui/material/utils/setRef.js"() {
    init_esm();
    setRef_default = setRef;
  }
});

// node_modules/@mui/base/className/index.js
var init_className = __esm({
  "node_modules/@mui/base/className/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/material/utils/index.js
var utils_exports = {};
__export(utils_exports, {
  capitalize: () => capitalize_default,
  createChainedFunction: () => createChainedFunction_default,
  createSvgIcon: () => createSvgIcon,
  debounce: () => debounce_default,
  deprecatedPropType: () => deprecatedPropType_default,
  isMuiElement: () => isMuiElement_default,
  ownerDocument: () => ownerDocument_default,
  ownerWindow: () => ownerWindow_default,
  requirePropFactory: () => requirePropFactory_default,
  setRef: () => setRef_default,
  unstable_ClassNameGenerator: () => unstable_ClassNameGenerator,
  unstable_useEnhancedEffect: () => useEnhancedEffect_default,
  unstable_useId: () => useId_default,
  unsupportedProp: () => unsupportedProp_default,
  useControlled: () => useControlled_default,
  useEventCallback: () => useEventCallback_default,
  useForkRef: () => useForkRef_default,
  useIsFocusVisible: () => useIsFocusVisible_default
});
var unstable_ClassNameGenerator;
var init_utils = __esm({
  "node_modules/@mui/material/utils/index.js"() {
    init_className();
    init_capitalize();
    init_createChainedFunction();
    init_createSvgIcon();
    init_debounce();
    init_deprecatedPropType();
    init_isMuiElement();
    init_ownerDocument();
    init_ownerWindow();
    init_requirePropFactory();
    init_setRef();
    init_useEnhancedEffect();
    init_useId();
    init_unsupportedProp();
    init_useControlled();
    init_useEventCallback();
    init_useForkRef();
    init_useIsFocusVisible();
    unstable_ClassNameGenerator = {
      configure: (generator) => {
        console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join("\n"));
        ClassNameGenerator_default.configure(generator);
      }
    };
  }
});

export {
  deprecatedPropType_default,
  setRef_default,
  unstable_ClassNameGenerator,
  utils_exports,
  init_utils
};
//# sourceMappingURL=chunk-7YCT3XFY.js.map
