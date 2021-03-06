import {
  getTransitionProps,
  reflow
} from "./chunk-BX527QKI.js";
import {
  Transition_default
} from "./chunk-XLMRO2V5.js";
import {
  useTheme
} from "./chunk-F52PFI4W.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-JGER3LXG.js";
import {
  init_styled,
  styled_default
} from "./chunk-O5ZCJ6AR.js";
import {
  ModalUnstyled_default,
  init_ModalUnstyled,
  init_base,
  init_useThemeProps,
  init_utils,
  isHostComponent_default,
  modalUnstyledClasses_default,
  resolveComponentProps,
  useThemeProps2 as useThemeProps
} from "./chunk-EKRTOSW6.js";
import {
  HTMLElementType,
  composeClasses,
  elementAcceptingRef_default,
  generateUtilityClass,
  generateUtilityClasses,
  init_esm,
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

// node_modules/@mui/material/Fade/Fade.js
init_extends();
init_objectWithoutPropertiesLoose();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_esm();
init_useForkRef();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
var styles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};
var Fade = React.forwardRef(function Fade2(props, ref) {
  const theme = useTheme();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    TransitionComponent = Transition_default
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const enableStrictModeCompat = true;
  const nodeRef = React.useRef(null);
  const foreignRef = useForkRef_default(children.ref, ref);
  const handleRef = useForkRef_default(nodeRef, foreignRef);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node);
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next) => {
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  return (0, import_jsx_runtime.jsx)(TransitionComponent, _extends({
    appear,
    in: inProp,
    nodeRef: enableStrictModeCompat ? nodeRef : void 0,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout
  }, other, {
    children: (state, childProps) => {
      return React.cloneElement(children, _extends({
        style: _extends({
          opacity: 0,
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles[state], style, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
true ? Fade.propTypes = {
  addEndListener: import_prop_types.default.func,
  appear: import_prop_types.default.bool,
  children: elementAcceptingRef_default.isRequired,
  easing: import_prop_types.default.oneOfType([import_prop_types.default.shape({
    enter: import_prop_types.default.string,
    exit: import_prop_types.default.string
  }), import_prop_types.default.string]),
  in: import_prop_types.default.bool,
  onEnter: import_prop_types.default.func,
  onEntered: import_prop_types.default.func,
  onEntering: import_prop_types.default.func,
  onExit: import_prop_types.default.func,
  onExited: import_prop_types.default.func,
  onExiting: import_prop_types.default.func,
  style: import_prop_types.default.object,
  timeout: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
    appear: import_prop_types.default.number,
    enter: import_prop_types.default.number,
    exit: import_prop_types.default.number
  })])
} : void 0;
var Fade_default = Fade;

// node_modules/@mui/material/Backdrop/backdropClasses.js
init_base();
function getBackdropUtilityClass(slot) {
  return generateUtilityClass("MuiBackdrop", slot);
}
var backdropClasses = generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
var backdropClasses_default = backdropClasses;

// node_modules/@mui/material/Backdrop/Backdrop.js
init_objectWithoutPropertiesLoose();
init_extends();
var React2 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_styled();
init_useThemeProps();
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded2 = ["children", "component", "components", "componentsProps", "className", "invisible", "open", "transitionDuration", "TransitionComponent"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ["root", invisible && "invisible"]
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};
var BackdropRoot = styled_default("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.invisible && styles2.invisible];
  }
})(({
  ownerState
}) => _extends({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent"
}, ownerState.invisible && {
  backgroundColor: "transparent"
}));
var Backdrop = React2.forwardRef(function Backdrop2(inProps, ref) {
  var _components$Root, _componentsProps$root;
  const props = useThemeProps({
    props: inProps,
    name: "MuiBackdrop"
  });
  const {
    children,
    component = "div",
    components = {},
    componentsProps = {},
    className,
    invisible = false,
    open,
    transitionDuration,
    TransitionComponent = Fade_default
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const ownerState = _extends({}, props, {
    component,
    invisible
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime2.jsx)(TransitionComponent, _extends({
    in: open,
    timeout: transitionDuration
  }, other, {
    children: (0, import_jsx_runtime2.jsx)(BackdropRoot, {
      "aria-hidden": true,
      as: (_components$Root = components.Root) != null ? _components$Root : component,
      className: clsx_m_default(classes.root, className),
      ownerState: _extends({}, ownerState, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState),
      classes,
      ref,
      children
    })
  }));
});
true ? Backdrop.propTypes = {
  children: import_prop_types2.default.node,
  classes: import_prop_types2.default.object,
  className: import_prop_types2.default.string,
  component: import_prop_types2.default.elementType,
  components: import_prop_types2.default.shape({
    Root: import_prop_types2.default.elementType
  }),
  componentsProps: import_prop_types2.default.shape({
    root: import_prop_types2.default.object
  }),
  invisible: import_prop_types2.default.bool,
  open: import_prop_types2.default.bool.isRequired,
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  transitionDuration: import_prop_types2.default.oneOfType([import_prop_types2.default.number, import_prop_types2.default.shape({
    appear: import_prop_types2.default.number,
    enter: import_prop_types2.default.number,
    exit: import_prop_types2.default.number
  })])
} : void 0;
var Backdrop_default = Backdrop;

// node_modules/@mui/material/Modal/Modal.js
init_objectWithoutPropertiesLoose();
init_extends();
var React3 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
init_ModalUnstyled();
init_utils();
init_esm();
init_styled();
init_useThemeProps();
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded3 = ["BackdropComponent", "BackdropProps", "closeAfterTransition", "children", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "theme"];
var modalClasses = modalUnstyledClasses_default;
var extendUtilityClasses = (ownerState) => {
  return ownerState.classes;
};
var ModalRoot = styled_default("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.open && ownerState.exited && styles2.hidden];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: "fixed",
  zIndex: (theme.vars || theme).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !ownerState.open && ownerState.exited && {
  visibility: "hidden"
}));
var ModalBackdrop = styled_default(Backdrop_default, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (props, styles2) => {
    return styles2.backdrop;
  }
})({
  zIndex: -1
});
var Modal = React3.forwardRef(function Modal2(inProps, ref) {
  var _ref, _components$Root;
  const props = useThemeProps({
    name: "MuiModal",
    props: inProps
  });
  const {
    BackdropComponent = ModalBackdrop,
    BackdropProps,
    closeAfterTransition = false,
    children,
    component,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    theme
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  const [exited, setExited] = React3.useState(true);
  const commonProps = {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  };
  const ownerState = _extends({}, props, commonProps, {
    exited
  });
  const classes = extendUtilityClasses(ownerState);
  const Root = (_ref = (_components$Root = components.Root) != null ? _components$Root : component) != null ? _ref : ModalRoot;
  return (0, import_jsx_runtime3.jsx)(ModalUnstyled_default, _extends({
    components: _extends({
      Root,
      Backdrop: BackdropComponent
    }, components),
    componentsProps: {
      root: () => _extends({}, resolveComponentProps(componentsProps.root, ownerState), !isHostComponent_default(Root) && {
        as: component,
        theme
      }),
      backdrop: () => _extends({}, BackdropProps, resolveComponentProps(componentsProps.backdrop, ownerState))
    },
    onTransitionEnter: () => setExited(false),
    onTransitionExited: () => setExited(true),
    ref
  }, other, {
    classes
  }, commonProps, {
    children
  }));
});
true ? Modal.propTypes = {
  BackdropComponent: import_prop_types3.default.elementType,
  BackdropProps: import_prop_types3.default.object,
  children: elementAcceptingRef_default.isRequired,
  classes: import_prop_types3.default.object,
  closeAfterTransition: import_prop_types3.default.bool,
  component: import_prop_types3.default.elementType,
  components: import_prop_types3.default.shape({
    Backdrop: import_prop_types3.default.elementType,
    Root: import_prop_types3.default.elementType
  }),
  componentsProps: import_prop_types3.default.shape({
    backdrop: import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object]),
    root: import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object])
  }),
  container: import_prop_types3.default.oneOfType([HTMLElementType, import_prop_types3.default.func]),
  disableAutoFocus: import_prop_types3.default.bool,
  disableEnforceFocus: import_prop_types3.default.bool,
  disableEscapeKeyDown: import_prop_types3.default.bool,
  disablePortal: import_prop_types3.default.bool,
  disableRestoreFocus: import_prop_types3.default.bool,
  disableScrollLock: import_prop_types3.default.bool,
  hideBackdrop: import_prop_types3.default.bool,
  keepMounted: import_prop_types3.default.bool,
  onBackdropClick: import_prop_types3.default.func,
  onClose: import_prop_types3.default.func,
  open: import_prop_types3.default.bool.isRequired,
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object])
} : void 0;
var Modal_default = Modal;

// node_modules/@mui/material/Modal/index.js
init_ModalUnstyled();

export {
  Fade_default,
  getBackdropUtilityClass,
  backdropClasses_default,
  Backdrop_default,
  modalClasses,
  Modal_default
};
//# sourceMappingURL=chunk-5PFZCSB7.js.map
