import {
  capitalize_default,
  init_capitalize
} from "./chunk-KV3SHR4W.js";
import {
  init_styled,
  styled_default
} from "./chunk-O5ZCJ6AR.js";
import {
  BadgeUnstyled_default,
  init_BadgeUnstyled,
  init_base,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_useThemeProps,
  isHostComponent_default,
  useThemeProps2 as useThemeProps
} from "./chunk-EKRTOSW6.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_esm,
  require_jsx_runtime,
  usePreviousProps_default
} from "./chunk-SGACJTM6.js";
import {
  clsx_m_default,
  init_clsx_m
} from "./chunk-6CPOZ5NC.js";
import {
  require_prop_types
} from "./chunk-25QP6ADL.js";
import {
  _objectWithoutPropertiesLoose,
  init_objectWithoutPropertiesLoose
} from "./chunk-2CJRPHYX.js";
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

// node_modules/@mui/material/Badge/badgeClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getBadgeUtilityClass(slot) {
  return generateUtilityClass("MuiBadge", slot);
}
var badgeClasses = generateUtilityClasses("MuiBadge", [
  "root",
  "badge",
  "dot",
  "standard",
  "anchorOriginTopRight",
  "anchorOriginBottomRight",
  "anchorOriginTopLeft",
  "anchorOriginBottomLeft",
  "invisible",
  "colorError",
  "colorInfo",
  "colorPrimary",
  "colorSecondary",
  "colorSuccess",
  "colorWarning",
  "overlapRectangular",
  "overlapCircular",
  "anchorOriginTopLeftCircular",
  "anchorOriginTopLeftRectangular",
  "anchorOriginTopRightCircular",
  "anchorOriginTopRightRectangular",
  "anchorOriginBottomLeftCircular",
  "anchorOriginBottomLeftRectangular",
  "anchorOriginBottomRightCircular",
  "anchorOriginBottomRightRectangular"
]);
var badgeClasses_default = badgeClasses;

// node_modules/@mui/material/Badge/Badge.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_esm();
init_composeClasses();
init_BadgeUnstyled();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/utils/shouldSpreadAdditionalProps.js
init_base();
var shouldSpreadAdditionalProps = (Slot) => {
  return !Slot || !isHostComponent_default(Slot);
};
var shouldSpreadAdditionalProps_default = shouldSpreadAdditionalProps;

// node_modules/@mui/material/Badge/Badge.js
init_capitalize();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["anchorOrigin", "className", "component", "components", "componentsProps", "overlap", "color", "invisible", "max", "badgeContent", "showZero", "variant"];
var RADIUS_STANDARD = 10;
var RADIUS_DOT = 4;
var useUtilityClasses = (ownerState) => {
  const {
    color,
    anchorOrigin,
    invisible,
    overlap,
    variant,
    classes = {}
  } = ownerState;
  const slots = {
    root: ["root"],
    badge: ["badge", variant, invisible && "invisible", `anchorOrigin${capitalize_default(anchorOrigin.vertical)}${capitalize_default(anchorOrigin.horizontal)}`, `anchorOrigin${capitalize_default(anchorOrigin.vertical)}${capitalize_default(anchorOrigin.horizontal)}${capitalize_default(overlap)}`, `overlap${capitalize_default(overlap)}`, color !== "default" && `color${capitalize_default(color)}`]
  };
  return composeClasses(slots, getBadgeUtilityClass, classes);
};
var BadgeRoot = styled_default("span", {
  name: "MuiBadge",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  position: "relative",
  display: "inline-flex",
  verticalAlign: "middle",
  flexShrink: 0
});
var BadgeBadge = styled_default("span", {
  name: "MuiBadge",
  slot: "Badge",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.badge, styles[ownerState.variant], styles[`anchorOrigin${capitalize_default(ownerState.anchorOrigin.vertical)}${capitalize_default(ownerState.anchorOrigin.horizontal)}${capitalize_default(ownerState.overlap)}`], ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`], ownerState.invisible && styles.invisible];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  position: "absolute",
  boxSizing: "border-box",
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(12),
  minWidth: RADIUS_STANDARD * 2,
  lineHeight: 1,
  padding: "0 6px",
  height: RADIUS_STANDARD * 2,
  borderRadius: RADIUS_STANDARD,
  zIndex: 1,
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen
  })
}, ownerState.color !== "default" && {
  backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
  color: (theme.vars || theme).palette[ownerState.color].contrastText
}, ownerState.variant === "dot" && {
  borderRadius: RADIUS_DOT,
  height: RADIUS_DOT * 2,
  minWidth: RADIUS_DOT * 2,
  padding: 0
}, ownerState.anchorOrigin.vertical === "top" && ownerState.anchorOrigin.horizontal === "right" && ownerState.overlap === "rectangular" && {
  top: 0,
  right: 0,
  transform: "scale(1) translate(50%, -50%)",
  transformOrigin: "100% 0%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(50%, -50%)"
  }
}, ownerState.anchorOrigin.vertical === "bottom" && ownerState.anchorOrigin.horizontal === "right" && ownerState.overlap === "rectangular" && {
  bottom: 0,
  right: 0,
  transform: "scale(1) translate(50%, 50%)",
  transformOrigin: "100% 100%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(50%, 50%)"
  }
}, ownerState.anchorOrigin.vertical === "top" && ownerState.anchorOrigin.horizontal === "left" && ownerState.overlap === "rectangular" && {
  top: 0,
  left: 0,
  transform: "scale(1) translate(-50%, -50%)",
  transformOrigin: "0% 0%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(-50%, -50%)"
  }
}, ownerState.anchorOrigin.vertical === "bottom" && ownerState.anchorOrigin.horizontal === "left" && ownerState.overlap === "rectangular" && {
  bottom: 0,
  left: 0,
  transform: "scale(1) translate(-50%, 50%)",
  transformOrigin: "0% 100%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(-50%, 50%)"
  }
}, ownerState.anchorOrigin.vertical === "top" && ownerState.anchorOrigin.horizontal === "right" && ownerState.overlap === "circular" && {
  top: "14%",
  right: "14%",
  transform: "scale(1) translate(50%, -50%)",
  transformOrigin: "100% 0%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(50%, -50%)"
  }
}, ownerState.anchorOrigin.vertical === "bottom" && ownerState.anchorOrigin.horizontal === "right" && ownerState.overlap === "circular" && {
  bottom: "14%",
  right: "14%",
  transform: "scale(1) translate(50%, 50%)",
  transformOrigin: "100% 100%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(50%, 50%)"
  }
}, ownerState.anchorOrigin.vertical === "top" && ownerState.anchorOrigin.horizontal === "left" && ownerState.overlap === "circular" && {
  top: "14%",
  left: "14%",
  transform: "scale(1) translate(-50%, -50%)",
  transformOrigin: "0% 0%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(-50%, -50%)"
  }
}, ownerState.anchorOrigin.vertical === "bottom" && ownerState.anchorOrigin.horizontal === "left" && ownerState.overlap === "circular" && {
  bottom: "14%",
  left: "14%",
  transform: "scale(1) translate(-50%, 50%)",
  transformOrigin: "0% 100%",
  [`&.${badgeClasses_default.invisible}`]: {
    transform: "scale(0) translate(-50%, 50%)"
  }
}, ownerState.invisible && {
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.leavingScreen
  })
}));
var Badge = React.forwardRef(function Badge2(inProps, ref) {
  var _componentsProps$root, _componentsProps$root2, _componentsProps$badg, _componentsProps$badg2;
  const props = useThemeProps({
    props: inProps,
    name: "MuiBadge"
  });
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: "top",
      horizontal: "right"
    },
    className,
    component = "span",
    components = {},
    componentsProps = {},
    overlap: overlapProp = "rectangular",
    color: colorProp = "default",
    invisible: invisibleProp = false,
    max,
    badgeContent: badgeContentProp,
    showZero = false,
    variant: variantProp = "standard"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const prevProps = usePreviousProps_default({
    anchorOrigin: anchorOriginProp,
    color: colorProp,
    overlap: overlapProp,
    variant: variantProp
  });
  let invisible = invisibleProp;
  if (invisibleProp === false && (badgeContentProp === 0 && !showZero || badgeContentProp == null && variantProp !== "dot")) {
    invisible = true;
  }
  const {
    color = colorProp,
    overlap = overlapProp,
    anchorOrigin = anchorOriginProp,
    variant = variantProp
  } = invisible ? prevProps : props;
  const ownerState = _extends({}, props, {
    anchorOrigin,
    invisible,
    color,
    overlap,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  let displayValue;
  if (variant !== "dot") {
    displayValue = badgeContentProp && Number(badgeContentProp) > max ? `${max}+` : badgeContentProp;
  }
  return (0, import_jsx_runtime.jsx)(BadgeUnstyled_default, _extends({
    invisible: invisibleProp,
    badgeContent: displayValue,
    showZero,
    max
  }, other, {
    components: _extends({
      Root: BadgeRoot,
      Badge: BadgeBadge
    }, components),
    className: clsx_m_default(className, classes.root, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className),
    componentsProps: {
      root: _extends({}, componentsProps.root, shouldSpreadAdditionalProps_default(components.Root) && {
        as: component,
        ownerState: _extends({}, (_componentsProps$root2 = componentsProps.root) == null ? void 0 : _componentsProps$root2.ownerState, {
          anchorOrigin,
          color,
          overlap,
          variant
        })
      }),
      badge: _extends({}, componentsProps.badge, {
        className: clsx_m_default(classes.badge, (_componentsProps$badg = componentsProps.badge) == null ? void 0 : _componentsProps$badg.className)
      }, shouldSpreadAdditionalProps_default(components.Badge) && {
        ownerState: _extends({}, (_componentsProps$badg2 = componentsProps.badge) == null ? void 0 : _componentsProps$badg2.ownerState, {
          anchorOrigin,
          color,
          overlap,
          variant
        })
      })
    },
    ref
  }));
});
true ? Badge.propTypes = {
  anchorOrigin: import_prop_types.default.shape({
    horizontal: import_prop_types.default.oneOf(["left", "right"]).isRequired,
    vertical: import_prop_types.default.oneOf(["bottom", "top"]).isRequired
  }),
  badgeContent: import_prop_types.default.node,
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  component: import_prop_types.default.elementType,
  components: import_prop_types.default.shape({
    Badge: import_prop_types.default.elementType,
    Root: import_prop_types.default.elementType
  }),
  componentsProps: import_prop_types.default.shape({
    badge: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  invisible: import_prop_types.default.bool,
  max: import_prop_types.default.number,
  overlap: import_prop_types.default.oneOf(["circular", "rectangular"]),
  showZero: import_prop_types.default.bool,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["dot", "standard"]), import_prop_types.default.string])
} : void 0;
var Badge_default = Badge;

export {
  shouldSpreadAdditionalProps_default,
  getBadgeUtilityClass,
  badgeClasses_default,
  Badge_default
};
//# sourceMappingURL=chunk-FQ7FEJXQ.js.map
