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
  init_utils
} from "./chunk-7YCT3XFY.js";
import {
  debounce_default,
  init_debounce,
  ownerWindow_default
} from "./chunk-LHGBEJIT.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-JGER3LXG.js";
import {
  HTMLElementType,
  chainPropTypes,
  elementAcceptingRef_default,
  init_esm,
  require_jsx_runtime
} from "./chunk-SGACJTM6.js";
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

// node_modules/@mui/material/Slide/Slide.js
init_extends();
init_objectWithoutPropertiesLoose();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_esm();
init_debounce();
init_useForkRef();
init_utils();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["addEndListener", "appear", "children", "container", "direction", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function getTranslateValue(direction, node, resolvedContainer) {
  const rect = node.getBoundingClientRect();
  const containerRect = resolvedContainer && resolvedContainer.getBoundingClientRect();
  const containerWindow = ownerWindow_default(node);
  let transform;
  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    const computedStyle = containerWindow.getComputedStyle(node);
    transform = computedStyle.getPropertyValue("-webkit-transform") || computedStyle.getPropertyValue("transform");
  }
  let offsetX = 0;
  let offsetY = 0;
  if (transform && transform !== "none" && typeof transform === "string") {
    const transformValues = transform.split("(")[1].split(")")[0].split(",");
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }
  if (direction === "left") {
    if (containerRect) {
      return `translateX(${containerRect.right + offsetX - rect.left}px)`;
    }
    return `translateX(${containerWindow.innerWidth + offsetX - rect.left}px)`;
  }
  if (direction === "right") {
    if (containerRect) {
      return `translateX(-${rect.right - containerRect.left - offsetX}px)`;
    }
    return `translateX(-${rect.left + rect.width - offsetX}px)`;
  }
  if (direction === "up") {
    if (containerRect) {
      return `translateY(${containerRect.bottom + offsetY - rect.top}px)`;
    }
    return `translateY(${containerWindow.innerHeight + offsetY - rect.top}px)`;
  }
  if (containerRect) {
    return `translateY(-${rect.top - containerRect.top + rect.height - offsetY}px)`;
  }
  return `translateY(-${rect.top + rect.height - offsetY}px)`;
}
function resolveContainer(containerPropProp) {
  return typeof containerPropProp === "function" ? containerPropProp() : containerPropProp;
}
function setTranslateValue(direction, node, containerProp) {
  const resolvedContainer = resolveContainer(containerProp);
  const transform = getTranslateValue(direction, node, resolvedContainer);
  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}
var Slide = React.forwardRef(function Slide2(props, ref) {
  const theme = useTheme();
  const defaultEasing = {
    enter: theme.transitions.easing.easeOut,
    exit: theme.transitions.easing.sharp
  };
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    addEndListener,
    appear = true,
    children,
    container: containerProp,
    direction = "down",
    easing: easingProp = defaultEasing,
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
  const childrenRef = React.useRef(null);
  const handleRefIntermediary = useForkRef_default(children.ref, childrenRef);
  const handleRef = useForkRef_default(handleRefIntermediary, ref);
  const normalizedTransitionCallback = (callback) => (isAppearing) => {
    if (callback) {
      if (isAppearing === void 0) {
        callback(childrenRef.current);
      } else {
        callback(childrenRef.current, isAppearing);
      }
    }
  };
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    setTranslateValue(direction, node, containerProp);
    reflow(node);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const transitionProps = getTransitionProps({
      timeout,
      style,
      easing: easingProp
    }, {
      mode: "enter"
    });
    node.style.webkitTransition = theme.transitions.create("-webkit-transform", _extends({}, transitionProps));
    node.style.transition = theme.transitions.create("transform", _extends({}, transitionProps));
    node.style.webkitTransform = "none";
    node.style.transform = "none";
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const transitionProps = getTransitionProps({
      timeout,
      style,
      easing: easingProp
    }, {
      mode: "exit"
    });
    node.style.webkitTransition = theme.transitions.create("-webkit-transform", transitionProps);
    node.style.transition = theme.transitions.create("transform", transitionProps);
    setTranslateValue(direction, node, containerProp);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback((node) => {
    node.style.webkitTransition = "";
    node.style.transition = "";
    if (onExited) {
      onExited(node);
    }
  });
  const handleAddEndListener = (next) => {
    if (addEndListener) {
      addEndListener(childrenRef.current, next);
    }
  };
  const updatePosition = React.useCallback(() => {
    if (childrenRef.current) {
      setTranslateValue(direction, childrenRef.current, containerProp);
    }
  }, [direction, containerProp]);
  React.useEffect(() => {
    if (inProp || direction === "down" || direction === "right") {
      return void 0;
    }
    const handleResize = debounce_default(() => {
      if (childrenRef.current) {
        setTranslateValue(direction, childrenRef.current, containerProp);
      }
    });
    const containerWindow = ownerWindow_default(childrenRef.current);
    containerWindow.addEventListener("resize", handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
    };
  }, [direction, inProp, containerProp]);
  React.useEffect(() => {
    if (!inProp) {
      updatePosition();
    }
  }, [inProp, updatePosition]);
  return (0, import_jsx_runtime.jsx)(TransitionComponent, _extends({
    nodeRef: childrenRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    appear,
    in: inProp,
    timeout
  }, other, {
    children: (state, childProps) => {
      return React.cloneElement(children, _extends({
        ref: handleRef,
        style: _extends({
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, style, children.props.style)
      }, childProps));
    }
  }));
});
true ? Slide.propTypes = {
  addEndListener: import_prop_types.default.func,
  appear: import_prop_types.default.bool,
  children: elementAcceptingRef_default.isRequired,
  container: chainPropTypes(import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]), (props) => {
    if (props.open) {
      const resolvedContainer = resolveContainer(props.container);
      if (resolvedContainer && resolvedContainer.nodeType === 1) {
        const box = resolvedContainer.getBoundingClientRect();
        if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(["MUI: The `container` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      } else if (!resolvedContainer || typeof resolvedContainer.getBoundingClientRect !== "function" || resolvedContainer.contextElement != null && resolvedContainer.contextElement.nodeType !== 1) {
        return new Error(["MUI: The `container` prop provided to the component is invalid.", "It should be an HTML element instance."].join("\n"));
      }
    }
    return null;
  }),
  direction: import_prop_types.default.oneOf(["down", "left", "right", "up"]),
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
var Slide_default = Slide;

export {
  Slide_default
};
//# sourceMappingURL=chunk-DCGDXYLI.js.map
