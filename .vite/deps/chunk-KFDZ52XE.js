import {
  GlobalStyles_default
} from "./chunk-VSH3L25K.js";
import {
  init_useThemeProps,
  useThemeProps2 as useThemeProps
} from "./chunk-EKRTOSW6.js";
import {
  require_jsx_runtime
} from "./chunk-SGACJTM6.js";
import {
  require_prop_types
} from "./chunk-25QP6ADL.js";
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

// node_modules/@mui/material/CssBaseline/CssBaseline.js
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_useThemeProps();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var html = (theme, enableColorScheme) => _extends({
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  boxSizing: "border-box",
  WebkitTextSizeAdjust: "100%"
}, enableColorScheme && {
  colorScheme: theme.palette.mode
});
var body = (theme) => _extends({
  color: (theme.vars || theme).palette.text.primary
}, theme.typography.body1, {
  backgroundColor: (theme.vars || theme).palette.background.default,
  "@media print": {
    backgroundColor: (theme.vars || theme).palette.common.white
  }
});
var styles = (theme, enableColorScheme = false) => {
  var _theme$components, _theme$components$Mui;
  let defaultStyles = {
    html: html(theme, enableColorScheme),
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "strong, b": {
      fontWeight: theme.typography.fontWeightBold
    },
    body: _extends({
      margin: 0
    }, body(theme), {
      "&::backdrop": {
        backgroundColor: (theme.vars || theme).palette.background.default
      }
    })
  };
  const themeOverrides = (_theme$components = theme.components) == null ? void 0 : (_theme$components$Mui = _theme$components.MuiCssBaseline) == null ? void 0 : _theme$components$Mui.styleOverrides;
  if (themeOverrides) {
    defaultStyles = [defaultStyles, themeOverrides];
  }
  return defaultStyles;
};
function CssBaseline(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCssBaseline"
  });
  const {
    children,
    enableColorScheme = false
  } = props;
  return (0, import_jsx_runtime2.jsxs)(React.Fragment, {
    children: [(0, import_jsx_runtime.jsx)(GlobalStyles_default, {
      styles: (theme) => styles(theme, enableColorScheme)
    }), children]
  });
}
true ? CssBaseline.propTypes = {
  children: import_prop_types.default.node,
  enableColorScheme: import_prop_types.default.bool
} : void 0;
var CssBaseline_default = CssBaseline;

export {
  html,
  body,
  CssBaseline_default
};
//# sourceMappingURL=chunk-KFDZ52XE.js.map
