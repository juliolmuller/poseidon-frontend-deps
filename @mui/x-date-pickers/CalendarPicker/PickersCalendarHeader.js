import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useLocaleText, useUtils } from '../internals/hooks/useUtils';
import { PickersFadeTransitionGroup } from './PickersFadeTransitionGroup';
import { ArrowDropDown } from '../internals/components/icons';
import { PickersArrowSwitcher } from '../internals/components/PickersArrowSwitcher';
import { usePreviousMonthDisabled, useNextMonthDisabled } from '../internals/hooks/date-helpers-hooks';
import { buildDeprecatedPropsWarning } from '../internals/utils/warning';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const PickersCalendarHeaderRoot = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: 16,
  marginBottom: 8,
  paddingLeft: 24,
  paddingRight: 12,
  // prevent jumping in safari
  maxHeight: 30,
  minHeight: 30
});
const PickersCalendarHeaderLabel = styled('div')(({
  theme
}) => _extends({
  display: 'flex',
  maxHeight: 30,
  overflow: 'hidden',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: 'auto'
}, theme.typography.body1, {
  fontWeight: theme.typography.fontWeightMedium
}));
const PickersCalendarHeaderLabelItem = styled('div')({
  marginRight: 6
});
const PickersCalendarHeaderSwitchViewButton = styled(IconButton)({
  marginRight: 'auto'
});
const PickersCalendarHeaderSwitchView = styled(ArrowDropDown)(({
  theme,
  ownerState
}) => _extends({
  willChange: 'transform',
  transition: theme.transitions.create('transform'),
  transform: 'rotate(0deg)'
}, ownerState.openView === 'year' && {
  transform: 'rotate(180deg)'
}));
const deprecatedPropsWarning = buildDeprecatedPropsWarning('Props for translation are deprecated. See https://mui.com/x/react-date-pickers/localization for more information.');
/**
 * @ignore - do not document.
 */

export function PickersCalendarHeader(props) {
  const {
    components = {},
    componentsProps = {},
    currentMonth: month,
    disabled,
    disableFuture,
    disablePast,
    getViewSwitchingButtonText: getViewSwitchingButtonTextProp,
    leftArrowButtonText: leftArrowButtonTextProp,
    maxDate,
    minDate,
    onMonthChange,
    onViewChange,
    openView: currentView,
    reduceAnimations,
    rightArrowButtonText: rightArrowButtonTextProp,
    views
  } = props;
  deprecatedPropsWarning({
    leftArrowButtonText: leftArrowButtonTextProp,
    rightArrowButtonText: rightArrowButtonTextProp,
    getViewSwitchingButtonText: getViewSwitchingButtonTextProp
  });
  const localeText = useLocaleText();
  const leftArrowButtonText = leftArrowButtonTextProp != null ? leftArrowButtonTextProp : localeText.previousMonth;
  const rightArrowButtonText = rightArrowButtonTextProp != null ? rightArrowButtonTextProp : localeText.nextMonth;
  const getViewSwitchingButtonText = getViewSwitchingButtonTextProp != null ? getViewSwitchingButtonTextProp : localeText.calendarViewSwitchingButtonAriaLabel;
  const utils = useUtils();
  const switchViewButtonProps = componentsProps.switchViewButton || {};

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(month), 'left');

  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(month), 'right');

  const isNextMonthDisabled = useNextMonthDisabled(month, {
    disableFuture,
    maxDate
  });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
    disablePast,
    minDate
  });

  const handleToggleView = () => {
    if (views.length === 1 || !onViewChange || disabled) {
      return;
    }

    if (views.length === 2) {
      onViewChange(views.find(view => view !== currentView) || views[0]);
    } else {
      // switching only between first 2
      const nextIndexToOpen = views.indexOf(currentView) !== 0 ? 0 : 1;
      onViewChange(views[nextIndexToOpen]);
    }
  }; // No need to display more information


  if (views.length === 1 && views[0] === 'year') {
    return null;
  }

  const ownerState = props;
  return /*#__PURE__*/_jsxs(PickersCalendarHeaderRoot, {
    ownerState: ownerState,
    children: [/*#__PURE__*/_jsxs(PickersCalendarHeaderLabel, {
      role: "presentation",
      onClick: handleToggleView,
      ownerState: ownerState,
      children: [/*#__PURE__*/_jsx(PickersFadeTransitionGroup, {
        reduceAnimations: reduceAnimations,
        transKey: utils.format(month, 'monthAndYear'),
        children: /*#__PURE__*/_jsx(PickersCalendarHeaderLabelItem, {
          "aria-live": "polite",
          ownerState: ownerState,
          children: utils.format(month, 'monthAndYear')
        })
      }), views.length > 1 && !disabled && /*#__PURE__*/_jsx(PickersCalendarHeaderSwitchViewButton, _extends({
        size: "small",
        as: components.SwitchViewButton,
        "aria-label": getViewSwitchingButtonText(currentView)
      }, switchViewButtonProps, {
        children: /*#__PURE__*/_jsx(PickersCalendarHeaderSwitchView, {
          as: components.SwitchViewIcon,
          ownerState: ownerState
        })
      }))]
    }), /*#__PURE__*/_jsx(Fade, {
      in: currentView === 'day',
      children: /*#__PURE__*/_jsx(PickersArrowSwitcher, {
        leftArrowButtonText: leftArrowButtonText,
        rightArrowButtonText: rightArrowButtonText,
        components: components,
        componentsProps: componentsProps,
        onLeftClick: selectPreviousMonth,
        onRightClick: selectNextMonth,
        isLeftDisabled: isPreviousMonthDisabled,
        isRightDisabled: isNextMonthDisabled
      })
    })]
  });
}