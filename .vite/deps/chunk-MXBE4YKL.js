import {
  createStyled,
  defaultTheme_default,
  init_defaultTheme,
  init_esm,
  shouldForwardProp
} from "./chunk-YS5JJ7Y4.js";
import {
  __esm
} from "./chunk-JGDUASYK.js";

// node_modules/@mui/material/styles/styled.js
var rootShouldForwardProp, slotShouldForwardProp, styled, styled_default;
var init_styled = __esm({
  "node_modules/@mui/material/styles/styled.js"() {
    init_esm();
    init_defaultTheme();
    rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== "classes";
    slotShouldForwardProp = shouldForwardProp;
    styled = createStyled({
      defaultTheme: defaultTheme_default,
      rootShouldForwardProp
    });
    styled_default = styled;
  }
});

export {
  rootShouldForwardProp,
  slotShouldForwardProp,
  styled_default,
  init_styled
};
//# sourceMappingURL=chunk-MXBE4YKL.js.map
