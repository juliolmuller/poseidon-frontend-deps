import {
  init_styled
} from "./chunk-MXBE4YKL.js";
import {
  colorChannel,
  createBreakpoints,
  createCssVarsProvider,
  createPalette,
  createSpacing,
  createTheme_default,
  createTypography,
  init_createPalette,
  init_createTheme,
  init_createTransitions,
  init_createTypography,
  init_esm as init_esm2,
  init_useThemeProps
} from "./chunk-YS5JJ7Y4.js";
import {
  deepmerge,
  init_esm
} from "./chunk-JVY65Q2O.js";
import {
  _objectWithoutPropertiesLoose,
  init_objectWithoutPropertiesLoose
} from "./chunk-AFXZRBJG.js";
import {
  _extends,
  init_extends
} from "./chunk-FKZ4BTUC.js";

// node_modules/@mui/material/styles/adaptV4Theme.js
init_extends();
init_objectWithoutPropertiesLoose();
init_esm2();
var _excluded = ["defaultProps", "mixins", "overrides", "palette", "props", "styleOverrides"];
var _excluded2 = ["type", "mode"];
function adaptV4Theme(inputTheme) {
  if (true) {
    console.warn(["MUI: adaptV4Theme() is deprecated.", "Follow the upgrade guide on https://mui.com/r/migration-v4#theme."].join("\n"));
  }
  const {
    defaultProps = {},
    mixins = {},
    overrides = {},
    palette = {},
    props = {},
    styleOverrides = {}
  } = inputTheme, other = _objectWithoutPropertiesLoose(inputTheme, _excluded);
  const theme = _extends({}, other, {
    components: {}
  });
  Object.keys(defaultProps).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.defaultProps = defaultProps[component];
    theme.components[component] = componentValue;
  });
  Object.keys(props).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.defaultProps = props[component];
    theme.components[component] = componentValue;
  });
  Object.keys(styleOverrides).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.styleOverrides = styleOverrides[component];
    theme.components[component] = componentValue;
  });
  Object.keys(overrides).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.styleOverrides = overrides[component];
    theme.components[component] = componentValue;
  });
  theme.spacing = createSpacing(inputTheme.spacing);
  const breakpoints = createBreakpoints(inputTheme.breakpoints || {});
  const spacing = theme.spacing;
  theme.mixins = _extends({
    gutters: (styles = {}) => {
      return _extends({
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
      }, styles, {
        [breakpoints.up("sm")]: _extends({
          paddingLeft: spacing(3),
          paddingRight: spacing(3)
        }, styles[breakpoints.up("sm")])
      });
    }
  }, mixins);
  const {
    type: typeInput,
    mode: modeInput
  } = palette, paletteRest = _objectWithoutPropertiesLoose(palette, _excluded2);
  const finalMode = modeInput || typeInput || "light";
  theme.palette = _extends({
    text: {
      hint: finalMode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.38)"
    },
    mode: finalMode,
    type: finalMode
  }, paletteRest);
  return theme;
}

// node_modules/@mui/material/styles/createMuiStrictModeTheme.js
init_esm();
init_createTheme();
function createMuiStrictModeTheme(options, ...args) {
  return createTheme_default(deepmerge({
    unstable_strictMode: true
  }, options), ...args);
}

// node_modules/@mui/material/styles/createStyles.js
var warnedOnce = false;
function createStyles(styles) {
  if (!warnedOnce) {
    console.warn(["MUI: createStyles from @mui/material/styles is deprecated.", "Please use @mui/styles/createStyles"].join("\n"));
    warnedOnce = true;
  }
  return styles;
}

// node_modules/@mui/material/styles/cssUtils.js
function isUnitless(value) {
  return String(parseFloat(value)).length === String(value).length;
}
function getUnit(input) {
  return String(input).match(/[\d.\-+]*\s*(.*)/)[1] || "";
}
function toUnitless(length) {
  return parseFloat(length);
}
function convertLength(baseFontSize) {
  return (length, toUnit) => {
    const fromUnit = getUnit(length);
    if (fromUnit === toUnit) {
      return length;
    }
    let pxLength = toUnitless(length);
    if (fromUnit !== "px") {
      if (fromUnit === "em") {
        pxLength = toUnitless(length) * toUnitless(baseFontSize);
      } else if (fromUnit === "rem") {
        pxLength = toUnitless(length) * toUnitless(baseFontSize);
      }
    }
    let outputLength = pxLength;
    if (toUnit !== "px") {
      if (toUnit === "em") {
        outputLength = pxLength / toUnitless(baseFontSize);
      } else if (toUnit === "rem") {
        outputLength = pxLength / toUnitless(baseFontSize);
      } else {
        return length;
      }
    }
    return parseFloat(outputLength.toFixed(5)) + toUnit;
  };
}
function alignProperty({
  size,
  grid
}) {
  const sizeBelow = size - size % grid;
  const sizeAbove = sizeBelow + grid;
  return size - sizeBelow < sizeAbove - size ? sizeBelow : sizeAbove;
}
function fontGrid({
  lineHeight,
  pixels,
  htmlFontSize
}) {
  return pixels / (lineHeight * htmlFontSize);
}
function responsiveProperty({
  cssProperty,
  min,
  max,
  unit = "rem",
  breakpoints = [600, 900, 1200],
  transform = null
}) {
  const output = {
    [cssProperty]: `${min}${unit}`
  };
  const factor = (max - min) / breakpoints[breakpoints.length - 1];
  breakpoints.forEach((breakpoint) => {
    let value = min + factor * breakpoint;
    if (transform !== null) {
      value = transform(value);
    }
    output[`@media (min-width:${breakpoint}px)`] = {
      [cssProperty]: `${Math.round(value * 1e4) / 1e4}${unit}`
    };
  });
  return output;
}

// node_modules/@mui/material/styles/responsiveFontSizes.js
init_extends();
init_esm();
function responsiveFontSizes(themeInput, options = {}) {
  const {
    breakpoints = ["sm", "md", "lg"],
    disableAlign = false,
    factor = 2,
    variants = ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption", "button", "overline"]
  } = options;
  const theme = _extends({}, themeInput);
  theme.typography = _extends({}, theme.typography);
  const typography = theme.typography;
  const convert = convertLength(typography.htmlFontSize);
  const breakpointValues = breakpoints.map((x) => theme.breakpoints.values[x]);
  variants.forEach((variant) => {
    const style = typography[variant];
    const remFontSize = parseFloat(convert(style.fontSize, "rem"));
    if (remFontSize <= 1) {
      return;
    }
    const maxFontSize = remFontSize;
    const minFontSize = 1 + (maxFontSize - 1) / factor;
    let {
      lineHeight
    } = style;
    if (!isUnitless(lineHeight) && !disableAlign) {
      throw new Error(true ? `MUI: Unsupported non-unitless line height with grid alignment.
Use unitless line heights instead.` : formatMuiErrorMessage(6));
    }
    if (!isUnitless(lineHeight)) {
      lineHeight = parseFloat(convert(lineHeight, "rem")) / parseFloat(remFontSize);
    }
    let transform = null;
    if (!disableAlign) {
      transform = (value) => alignProperty({
        size: value,
        grid: fontGrid({
          pixels: 4,
          lineHeight,
          htmlFontSize: typography.htmlFontSize
        })
      });
    }
    typography[variant] = _extends({}, style, responsiveProperty({
      cssProperty: "fontSize",
      min: minFontSize,
      max: maxFontSize,
      unit: "rem",
      breakpoints: breakpointValues,
      transform
    }));
  });
  return theme;
}

// node_modules/@mui/material/styles/ThemeProvider.js
init_esm2();

// node_modules/@mui/material/styles/makeStyles.js
init_esm();
function makeStyles() {
  throw new Error(true ? `MUI: makeStyles is no longer exported from @mui/material/styles.
You have to import it from @mui/styles.
See https://mui.com/r/migration-v4/#mui-material-styles for more details.` : formatMuiErrorMessage(14));
}

// node_modules/@mui/material/styles/withStyles.js
init_esm();
function withStyles() {
  throw new Error(true ? `MUI: withStyles is no longer exported from @mui/material/styles.
You have to import it from @mui/styles.
See https://mui.com/r/migration-v4/#mui-material-styles for more details.` : formatMuiErrorMessage(15));
}

// node_modules/@mui/material/styles/withTheme.js
init_esm();
function withTheme() {
  throw new Error(true ? `MUI: withTheme is no longer exported from @mui/material/styles.
You have to import it from @mui/styles.
See https://mui.com/r/migration-v4/#mui-material-styles for more details.` : formatMuiErrorMessage(16));
}

// node_modules/@mui/material/styles/experimental_extendTheme.js
init_extends();
init_objectWithoutPropertiesLoose();
init_esm();
init_esm2();
init_createTheme();
init_createPalette();
var _excluded3 = ["colorSchemes", "opacity"];
var _excluded22 = ["palette"];
var defaultOpacity = {
  active: 0.54,
  hover: 0.04,
  selected: 0.08,
  disabled: 0.26,
  focus: 0.12
};
function createTheme(options = {}, ...args) {
  var _colorSchemesInput$li, _colorSchemesInput$da;
  const {
    colorSchemes: colorSchemesInput = {},
    opacity: opacityInput = {}
  } = options, input = _objectWithoutPropertiesLoose(options, _excluded3);
  let _createThemeWithoutVa = createTheme_default(_extends({}, input, colorSchemesInput.light && {
    palette: (_colorSchemesInput$li = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li.palette
  })), {
    palette: lightPalette
  } = _createThemeWithoutVa, muiTheme = _objectWithoutPropertiesLoose(_createThemeWithoutVa, _excluded22);
  const {
    palette: darkPalette
  } = createTheme_default({
    palette: _extends({
      mode: "dark"
    }, (_colorSchemesInput$da = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da.palette)
  });
  colorSchemesInput.light = {
    palette: lightPalette
  };
  colorSchemesInput.dark = {
    palette: darkPalette
  };
  const colorSchemes = {};
  Object.keys(colorSchemesInput).forEach((key) => {
    const palette = createPalette(colorSchemesInput[key].palette);
    Object.keys(palette).forEach((color) => {
      const colors = palette[color];
      if (colors.main) {
        palette[color].mainChannel = colorChannel(colors.main);
      }
      if (colors.light) {
        palette[color].lightChannel = colorChannel(colors.light);
      }
      if (colors.dark) {
        palette[color].darkChannel = colorChannel(colors.dark);
      }
      if (colors.primary) {
        palette[color].primaryChannel = colorChannel(colors.primary);
      }
      if (colors.secondary) {
        palette[color].secondaryChannel = colorChannel(colors.secondary);
      }
      if (colors.disabled) {
        palette[color].disabledChannel = colorChannel(colors.disabled);
      }
    });
    colorSchemes[key] = {
      palette
    };
  });
  const opacity = _extends({}, defaultOpacity, opacityInput);
  muiTheme.colorSchemes = colorSchemes;
  muiTheme.opacity = opacity;
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}
var experimental_extendTheme_default = createTheme;

// node_modules/@mui/material/styles/CssVarsProvider.js
init_extends();
init_esm2();
init_createTypography();
var defaultTheme = experimental_extendTheme_default();
var {
  CssVarsProvider: Experimental_CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript
} = createCssVarsProvider({
  theme: defaultTheme,
  defaultColorScheme: {
    light: "light",
    dark: "dark"
  },
  prefix: "md",
  resolveTheme: (theme) => {
    const newTheme = _extends({}, theme, {
      typography: createTypography(theme.palette, theme.typography)
    });
    return newTheme;
  },
  shouldSkipGeneratingVar: (keys) => !!keys[0].match(/(typography|mixins|breakpoints|direction|transitions)/)
});

// node_modules/@mui/material/styles/index.js
init_esm2();
init_createTheme();
init_createTransitions();
init_useThemeProps();
init_styled();
init_styled();
init_esm2();

export {
  adaptV4Theme,
  createMuiStrictModeTheme,
  createStyles,
  getUnit,
  toUnitless,
  responsiveFontSizes,
  makeStyles,
  withStyles,
  withTheme,
  experimental_extendTheme_default,
  Experimental_CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript
};
//# sourceMappingURL=chunk-DZAKYL5Y.js.map