import {
  init_styled,
  styled_default
} from "./chunk-MXBE4YKL.js";
import {
  createUnarySpacing,
  extendSxProp,
  getValue,
  handleBreakpoints,
  init_esm as init_esm2,
  init_useThemeProps,
  resolveBreakpointValues,
  useThemeProps2 as useThemeProps
} from "./chunk-YS5JJ7Y4.js";
import {
  deepmerge,
  init_esm,
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
  require_react
} from "./chunk-OIOKTTU3.js";
import {
  __toESM
} from "./chunk-JGDUASYK.js";

// node_modules/@mui/material/Stack/Stack.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_esm2();
init_esm();
init_styled();
init_useThemeProps();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["component", "direction", "spacing", "divider", "children"];
function joinChildren(children, separator) {
  const childrenArray = React.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce((output, child, index) => {
    output.push(child);
    if (index < childrenArray.length - 1) {
      output.push(React.cloneElement(separator, {
        key: `separator-${index}`
      }));
    }
    return output;
  }, []);
}
var getSideFromDirection = (direction) => {
  return {
    row: "Left",
    "row-reverse": "Right",
    column: "Top",
    "column-reverse": "Bottom"
  }[direction];
};
var style = ({
  ownerState,
  theme
}) => {
  let styles = _extends({
    display: "flex"
  }, handleBreakpoints({
    theme
  }, resolveBreakpointValues({
    values: ownerState.direction,
    breakpoints: theme.breakpoints.values
  }), (propValue) => ({
    flexDirection: propValue
  })));
  if (ownerState.spacing) {
    const transformer = createUnarySpacing(theme);
    const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
      if (ownerState.spacing[breakpoint] != null || ownerState.direction[breakpoint] != null) {
        acc[breakpoint] = true;
      }
      return acc;
    }, {});
    const directionValues = resolveBreakpointValues({
      values: ownerState.direction,
      base
    });
    const spacingValues = resolveBreakpointValues({
      values: ownerState.spacing,
      base
    });
    const styleFromPropValue = (propValue, breakpoint) => {
      return {
        "& > :not(style) + :not(style)": {
          margin: 0,
          [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : ownerState.direction)}`]: getValue(transformer, propValue)
        }
      };
    };
    styles = deepmerge(styles, handleBreakpoints({
      theme
    }, spacingValues, styleFromPropValue));
  }
  return styles;
};
var StackRoot = styled_default("div", {
  name: "MuiStack",
  slot: "Root",
  overridesResolver: (props, styles) => {
    return [styles.root];
  }
})(style);
var Stack = React.forwardRef(function Stack2(inProps, ref) {
  const themeProps = useThemeProps({
    props: inProps,
    name: "MuiStack"
  });
  const props = extendSxProp(themeProps);
  const {
    component = "div",
    direction = "column",
    spacing = 0,
    divider,
    children
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = {
    direction,
    spacing
  };
  return (0, import_jsx_runtime.jsx)(StackRoot, _extends({
    as: component,
    ownerState,
    ref
  }, other, {
    children: divider ? joinChildren(children, divider) : children
  }));
});
true ? Stack.propTypes = {
  children: import_prop_types.default.node,
  component: import_prop_types.default.elementType,
  direction: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types.default.arrayOf(import_prop_types.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types.default.object]),
  divider: import_prop_types.default.node,
  spacing: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])), import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string]),
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Stack_default = Stack;

export {
  Stack_default
};
//# sourceMappingURL=chunk-KZ2MACLT.js.map