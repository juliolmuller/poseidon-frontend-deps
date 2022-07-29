import {
  createStyled,
  defaultTheme_default,
  init_defaultTheme,
  init_esm,
  shouldForwardProp
} from "./chunk-RSSPYCFY.js";
import {
  __esm
} from "./chunk-5537U2Q2.js";

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
//# sourceMappingURL=chunk-PCUTBLVA.js.map
