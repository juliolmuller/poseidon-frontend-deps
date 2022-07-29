import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["displayStaticWrapperAs", "onAccept", "onClear", "onCancel", "onDismiss", "onSetToday", "open", "children", "components", "componentsProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { DIALOG_WIDTH } from '../../constants/dimensions';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import { getStaticWrapperUtilityClass } from './pickerStaticWrapperClasses';
import { PickersActionBar } from '../../../PickersActionBar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    content: ['content']
  };
  return composeClasses(slots, getStaticWrapperUtilityClass, classes);
};

const PickerStaticWrapperRoot = styled('div', {
  name: 'MuiPickerStaticWrapper',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'flex',
  flexDirection: 'column'
});
const PickerStaticWrapperContent = styled('div', {
  name: 'MuiPickerStaticWrapper',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.content
})(({
  theme
}) => ({
  overflow: 'hidden',
  minWidth: DIALOG_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper
}));

function PickerStaticWrapper(inProps) {
  var _components$ActionBar;

  const props = useThemeProps({
    props: inProps,
    name: 'MuiPickerStaticWrapper'
  });

  const {
    displayStaticWrapperAs,
    onAccept,
    onClear,
    onCancel,
    onSetToday,
    children,
    components,
    componentsProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const classes = useUtilityClasses(props);
  const ActionBar = (_components$ActionBar = components == null ? void 0 : components.ActionBar) != null ? _components$ActionBar : PickersActionBar;
  return /*#__PURE__*/_jsx(WrapperVariantContext.Provider, {
    value: displayStaticWrapperAs,
    children: /*#__PURE__*/_jsxs(PickerStaticWrapperRoot, _extends({
      className: classes.root
    }, other, {
      children: [/*#__PURE__*/_jsx(PickerStaticWrapperContent, {
        className: classes.content,
        children: children
      }), /*#__PURE__*/_jsx(ActionBar, _extends({
        onAccept: onAccept,
        onClear: onClear,
        onCancel: onCancel,
        onSetToday: onSetToday,
        actions: displayStaticWrapperAs === 'desktop' ? [] : ['cancel', 'accept']
      }, componentsProps == null ? void 0 : componentsProps.actionBar))]
    }))
  });
}

process.env.NODE_ENV !== "production" ? PickerStaticWrapper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * Overrideable components.
   * @default {}
   */
  components: PropTypes.object,

  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   */
  displayStaticWrapperAs: PropTypes.oneOf(['desktop', 'mobile']).isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onSetToday: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
} : void 0;
export { PickerStaticWrapper };