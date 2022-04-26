import {
  init_styled,
  styled_default
} from "./chunk-MXBE4YKL.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_base,
  init_useThemeProps,
  useThemeProps2 as useThemeProps
} from "./chunk-YS5JJ7Y4.js";
import {
  chainPropTypes,
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
  clsx_m_default,
  init_clsx_m
} from "./chunk-QDNYMIU6.js";
import {
  require_react
} from "./chunk-OIOKTTU3.js";
import {
  __toESM
} from "./chunk-JGDUASYK.js";

// node_modules/@mui/material/CardMedia/cardMediaClasses.js
init_base();
function getCardMediaUtilityClass(slot) {
  return generateUtilityClass("MuiCardMedia", slot);
}
var cardMediaClasses = generateUtilityClasses("MuiCardMedia", ["root", "media", "img"]);
var cardMediaClasses_default = cardMediaClasses;

// node_modules/@mui/material/CardMedia/CardMedia.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx_m();
init_esm();
init_base();
init_useThemeProps();
init_styled();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "component", "image", "src", "style"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    isMediaComponent,
    isImageComponent
  } = ownerState;
  const slots = {
    root: ["root", isMediaComponent && "media", isImageComponent && "img"]
  };
  return composeClasses(slots, getCardMediaUtilityClass, classes);
};
var CardMediaRoot = styled_default("div", {
  name: "MuiCardMedia",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      isMediaComponent,
      isImageComponent
    } = ownerState;
    return [styles.root, isMediaComponent && styles.media, isImageComponent && styles.img];
  }
})(({
  ownerState
}) => _extends({
  display: "block",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
}, ownerState.isMediaComponent && {
  width: "100%"
}, ownerState.isImageComponent && {
  objectFit: "cover"
}));
var MEDIA_COMPONENTS = ["video", "audio", "picture", "iframe", "img"];
var IMAGE_COMPONENTS = ["picture", "img"];
var CardMedia = React.forwardRef(function CardMedia2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCardMedia"
  });
  const {
    children,
    className,
    component = "div",
    image,
    src,
    style
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const isMediaComponent = MEDIA_COMPONENTS.indexOf(component) !== -1;
  const composedStyle = !isMediaComponent && image ? _extends({
    backgroundImage: `url("${image}")`
  }, style) : style;
  const ownerState = _extends({}, props, {
    component,
    isMediaComponent,
    isImageComponent: IMAGE_COMPONENTS.indexOf(component) !== -1
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(CardMediaRoot, _extends({
    className: clsx_m_default(classes.root, className),
    as: component,
    role: !isMediaComponent && image ? "img" : void 0,
    ref,
    style: composedStyle,
    ownerState,
    src: isMediaComponent ? image || src : void 0
  }, other, {
    children
  }));
});
true ? CardMedia.propTypes = {
  children: chainPropTypes(import_prop_types.default.node, (props) => {
    if (!props.children && !props.image && !props.src && !props.component) {
      return new Error("MUI: Either `children`, `image`, `src` or `component` prop must be specified.");
    }
    return null;
  }),
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  component: import_prop_types.default.elementType,
  image: import_prop_types.default.string,
  src: import_prop_types.default.string,
  style: import_prop_types.default.object,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var CardMedia_default = CardMedia;

export {
  getCardMediaUtilityClass,
  cardMediaClasses_default,
  CardMedia_default
};
//# sourceMappingURL=chunk-RGSA2HCL.js.map
