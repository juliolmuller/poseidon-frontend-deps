import {
  getUnit,
  toUnitless
} from "./chunk-D5R6NDCR.js";
import {
  init_styled,
  styled_default
} from "./chunk-O5ZCJ6AR.js";
import {
  alpha,
  css,
  init_base,
  init_esm,
  init_useThemeProps,
  keyframes,
  useThemeProps2 as useThemeProps
} from "./chunk-EKRTOSW6.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_jsx_runtime
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

// node_modules/@mui/material/Skeleton/skeletonClasses.js
init_base();
function getSkeletonUtilityClass(slot) {
  return generateUtilityClass("MuiSkeleton", slot);
}
var skeletonClasses = generateUtilityClasses("MuiSkeleton", ["root", "text", "rectangular", "circular", "pulse", "wave", "withChildren", "fitContent", "heightAuto"]);
var skeletonClasses_default = skeletonClasses;

// node_modules/@mui/material/Skeleton/Skeleton.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
init_clsx_m();
var import_prop_types = __toESM(require_prop_types());
init_esm();
init_base();
init_styled();
init_useThemeProps();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["animation", "className", "component", "height", "style", "variant", "width"];
var _ = (t) => t;
var _t;
var _t2;
var _t3;
var _t4;
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    variant,
    animation,
    hasChildren,
    width,
    height
  } = ownerState;
  const slots = {
    root: ["root", variant, animation, hasChildren && "withChildren", hasChildren && !width && "fitContent", hasChildren && !height && "heightAuto"]
  };
  return composeClasses(slots, getSkeletonUtilityClass, classes);
};
var pulseKeyframe = keyframes(_t || (_t = _`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`));
var waveKeyframe = keyframes(_t2 || (_t2 = _`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`));
var SkeletonRoot = styled_default("span", {
  name: "MuiSkeleton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], ownerState.animation !== false && styles[ownerState.animation], ownerState.hasChildren && styles.withChildren, ownerState.hasChildren && !ownerState.width && styles.fitContent, ownerState.hasChildren && !ownerState.height && styles.heightAuto];
  }
})(({
  theme,
  ownerState
}) => {
  const radiusUnit = getUnit(theme.shape.borderRadius) || "px";
  const radiusValue = toUnitless(theme.shape.borderRadius);
  return _extends({
    display: "block",
    backgroundColor: theme.vars ? theme.vars.palette.Skeleton.bg : alpha(theme.palette.text.primary, theme.palette.mode === "light" ? 0.11 : 0.13),
    height: "1.2em"
  }, ownerState.variant === "text" && {
    marginTop: 0,
    marginBottom: 0,
    height: "auto",
    transformOrigin: "0 55%",
    transform: "scale(1, 0.60)",
    borderRadius: `${radiusValue}${radiusUnit}/${Math.round(radiusValue / 0.6 * 10) / 10}${radiusUnit}`,
    "&:empty:before": {
      content: '"\\00a0"'
    }
  }, ownerState.variant === "circular" && {
    borderRadius: "50%"
  }, ownerState.hasChildren && {
    "& > *": {
      visibility: "hidden"
    }
  }, ownerState.hasChildren && !ownerState.width && {
    maxWidth: "fit-content"
  }, ownerState.hasChildren && !ownerState.height && {
    height: "auto"
  });
}, ({
  ownerState
}) => ownerState.animation === "pulse" && css(_t3 || (_t3 = _`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `), pulseKeyframe), ({
  ownerState,
  theme
}) => ownerState.animation === "wave" && css(_t4 || (_t4 = _`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `), waveKeyframe, (theme.vars || theme).palette.action.hover));
var Skeleton = React.forwardRef(function Skeleton2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiSkeleton"
  });
  const {
    animation = "pulse",
    className,
    component = "span",
    height,
    style,
    variant = "text",
    width
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    animation,
    component,
    variant,
    hasChildren: Boolean(other.children)
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(SkeletonRoot, _extends({
    as: component,
    ref,
    className: clsx_m_default(classes.root, className),
    ownerState
  }, other, {
    style: _extends({
      width,
      height
    }, style)
  }));
});
true ? Skeleton.propTypes = {
  animation: import_prop_types.default.oneOf(["pulse", "wave", false]),
  children: import_prop_types.default.node,
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  component: import_prop_types.default.elementType,
  height: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
  style: import_prop_types.default.object,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["circular", "rectangular", "text"]), import_prop_types.default.string]),
  width: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])
} : void 0;
var Skeleton_default = Skeleton;

export {
  getSkeletonUtilityClass,
  skeletonClasses_default,
  Skeleton_default
};
//# sourceMappingURL=chunk-TNYFAKGS.js.map
