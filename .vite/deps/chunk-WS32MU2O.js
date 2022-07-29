import {
  RadioGroupContext_default
} from "./chunk-QQ5B2PFE.js";
import {
  FormGroup_default
} from "./chunk-5PWUPFXO.js";
import {
  init_useId,
  useId_default
} from "./chunk-VO3YQ5DP.js";
import {
  init_useControlled,
  useControlled_default
} from "./chunk-I3ANX32S.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-IAWQ7K6V.js";
import {
  require_jsx_runtime
} from "./chunk-MPSMHG7B.js";
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

// node_modules/@mui/material/RadioGroup/RadioGroup.js
init_extends();
init_objectWithoutPropertiesLoose();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_useForkRef();
init_useControlled();
init_useId();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["actions", "children", "defaultValue", "name", "onChange", "value"];
var RadioGroup = React.forwardRef(function RadioGroup2(props, ref) {
  const {
    actions,
    children,
    defaultValue,
    name: nameProp,
    onChange,
    value: valueProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const rootRef = React.useRef(null);
  const [value, setValueState] = useControlled_default({
    controlled: valueProp,
    default: defaultValue,
    name: "RadioGroup"
  });
  React.useImperativeHandle(actions, () => ({
    focus: () => {
      let input = rootRef.current.querySelector("input:not(:disabled):checked");
      if (!input) {
        input = rootRef.current.querySelector("input:not(:disabled)");
      }
      if (input) {
        input.focus();
      }
    }
  }), []);
  const handleRef = useForkRef_default(ref, rootRef);
  const handleChange = (event) => {
    setValueState(event.target.value);
    if (onChange) {
      onChange(event, event.target.value);
    }
  };
  const name = useId_default(nameProp);
  return (0, import_jsx_runtime.jsx)(RadioGroupContext_default.Provider, {
    value: {
      name,
      onChange: handleChange,
      value
    },
    children: (0, import_jsx_runtime.jsx)(FormGroup_default, _extends({
      role: "radiogroup",
      ref: handleRef
    }, other, {
      children
    }))
  });
});
true ? RadioGroup.propTypes = {
  children: import_prop_types.default.node,
  defaultValue: import_prop_types.default.any,
  name: import_prop_types.default.string,
  onChange: import_prop_types.default.func,
  value: import_prop_types.default.any
} : void 0;
var RadioGroup_default = RadioGroup;

export {
  RadioGroup_default
};
//# sourceMappingURL=chunk-WS32MU2O.js.map
