import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["autoFocus", "children", "component", "components", "componentsProps", "defaultListboxOpen", "defaultValue", "disabled", "listboxId", "listboxOpen", "onChange", "onListboxOpenChange", "value"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef, unstable_useControlled as useControlled } from '@mui/utils';
import { flattenOptionGroups, getOptionsFromChildren } from '../SelectUnstyled/utils';
import useSelect from '../SelectUnstyled/useSelect';
import { useSlotProps } from '../utils';
import PopperUnstyled from '../PopperUnstyled';
import { SelectUnstyledContext } from '../SelectUnstyled/SelectUnstyledContext';
import composeClasses from '../composeClasses';
import { getSelectUnstyledUtilityClass } from '../SelectUnstyled/selectUnstyledClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function defaultRenderMultipleValues(selectedOptions) {
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: selectedOptions.map(o => o.label).join(', ')
  });
}

function useUtilityClasses(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active', open && 'expanded'],
    listbox: ['listbox', disabled && 'disabled'],
    popper: ['popper']
  };
  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}
/**
 * The foundation for building custom-styled multi-selection select components.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base/react-select/)
 *
 * API:
 *
 * - [MultiSelectUnstyled API](https://mui.com/base/api/multi-select-unstyled/)
 */


const MultiSelectUnstyled = /*#__PURE__*/React.forwardRef(function MultiSelectUnstyled(props, ref) {
  var _props$renderValue, _ref, _components$Listbox, _components$Popper;

  const {
    autoFocus,
    children,
    component,
    components = {},
    componentsProps = {},
    defaultListboxOpen = false,
    defaultValue = [],
    disabled: disabledProp,
    listboxId,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    value: valueProp
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const renderValue = (_props$renderValue = props.renderValue) != null ? _props$renderValue : defaultRenderMultipleValues;
  const [groupedOptions, setGroupedOptions] = React.useState([]);
  const options = React.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'MultiSelectUnstyled',
    state: 'listboxOpen'
  });
  React.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children));
  }, [children]);
  const [buttonDefined, setButtonDefined] = React.useState(false);
  const buttonRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const Button = (_ref = component != null ? component : components.Root) != null ? _ref : 'button';
  const ListboxRoot = (_components$Listbox = components.Listbox) != null ? _components$Listbox : 'ul';
  const Popper = (_components$Popper = components.Popper) != null ? _components$Popper : PopperUnstyled;

  const handleButtonRefChange = element => {
    buttonRef.current = element;

    if (element != null) {
      setButtonDefined(true);
    }
  };

  const handleButtonRef = useForkRef(ref, handleButtonRefChange);
  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  const handleOpenChange = isOpen => {
    setListboxOpen(isOpen);
    onListboxOpenChange == null ? void 0 : onListboxOpenChange(isOpen);
  };

  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value
  } = useSelect({
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple: true,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp
  });

  const ownerState = _extends({}, props, {
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value
  });

  const classes = useUtilityClasses(ownerState);
  const selectedOptions = React.useMemo(() => {
    if (value == null) {
      return [];
    }

    return options.filter(o => value.includes(o.value));
  }, [options, value]);
  const buttonProps = useSlotProps({
    elementType: Button,
    getSlotProps: getButtonProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root
  });
  const listboxProps = useSlotProps({
    elementType: ListboxRoot,
    getSlotProps: getListboxProps,
    externalSlotProps: componentsProps.listbox,
    additionalProps: {
      ref: listboxRef
    },
    ownerState,
    className: classes.listbox
  });
  const popperProps = useSlotProps({
    elementType: Popper,
    externalSlotProps: componentsProps.popper,
    additionalProps: {
      anchorEl: buttonRef.current,
      disablePortal: true,
      open: listboxOpen,
      placement: 'bottom-start',
      role: undefined
    },
    ownerState,
    className: classes.popper
  });
  const context = {
    getOptionProps,
    getOptionState,
    listboxRef
  };
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(Button, _extends({}, buttonProps, {
      children: renderValue(selectedOptions)
    })), buttonDefined && /*#__PURE__*/_jsx(Popper, _extends({}, popperProps, {
      children: /*#__PURE__*/_jsx(ListboxRoot, _extends({}, listboxProps, {
        children: /*#__PURE__*/_jsx(SelectUnstyledContext.Provider, {
          value: context,
          children: children
        })
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" ? MultiSelectUnstyled.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: PropTypes.bool,

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes
  /* @typescript-to-proptypes-ignore */
  .shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.elementType,
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),

  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,

  /**
   * The default selected values. Use when the component is not controlled.
   * @default []
   */
  defaultValue: PropTypes.array,

  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * `id` attribute of the listbox element.
   * Also used to derive the `id` attributes of options.
   */
  listboxId: PropTypes.string,

  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: PropTypes.bool,

  /**
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,

  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,

  /**
   * Function that customizes the rendering of the selected values.
   */
  renderValue: PropTypes.func,

  /**
   * The selected values.
   * Set to an empty array to deselect all options.
   */
  value: PropTypes.array
} : void 0;
export default MultiSelectUnstyled;