import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["autoFocus", "onViewChange", "date", "disableFuture", "disablePast", "defaultCalendarMonth", "loading", "onChange", "onYearChange", "onMonthChange", "reduceAnimations", "renderLoading", "shouldDisableDate", "shouldDisableMonth", "shouldDisableYear", "view", "views", "openTo", "className", "disabled", "readOnly", "minDate", "maxDate"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { MonthPicker } from '../MonthPicker/MonthPicker';
import { useCalendarState } from './useCalendarState';
import { useDefaultDates, useUtils } from '../internals/hooks/useUtils';
import { PickersFadeTransitionGroup } from './PickersFadeTransitionGroup';
import { DayPicker } from './DayPicker';
import { useViews } from '../internals/hooks/useViews';
import { PickersCalendarHeader } from './PickersCalendarHeader';
import { YearPicker } from '../YearPicker/YearPicker';
import { findClosestEnabledDate } from '../internals/utils/date-utils';
import { PickerViewRoot } from '../internals/components/PickerViewRoot';
import { defaultReduceAnimations } from '../internals/utils/defaultReduceAnimations';
import { getCalendarPickerUtilityClass } from './calendarPickerClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    viewTransitionContainer: ['viewTransitionContainer']
  };
  return composeClasses(slots, getCalendarPickerUtilityClass, classes);
};

const CalendarPickerRoot = styled(PickerViewRoot, {
  name: 'MuiCalendarPicker',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'flex',
  flexDirection: 'column'
});
const CalendarPickerViewTransitionContainer = styled(PickersFadeTransitionGroup, {
  name: 'MuiCalendarPicker',
  slot: 'ViewTransitionContainer',
  overridesResolver: (props, styles) => styles.viewTransitionContainer
})({
  overflowY: 'auto'
});

/**
 *
 * Demos:
 *
 * - [Date Picker](https://mui.com/x/react-date-pickers/date-picker/)
 *
 * API:
 *
 * - [CalendarPicker API](https://mui.com/x/api/date-pickers/calendar-picker/)
 */
const CalendarPicker = /*#__PURE__*/React.forwardRef(function CalendarPicker(inProps, ref) {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const props = useThemeProps({
    props: inProps,
    name: 'MuiCalendarPicker'
  });

  const {
    autoFocus,
    onViewChange,
    date,
    disableFuture,
    disablePast,
    defaultCalendarMonth,
    loading = false,
    onChange,
    onYearChange,
    onMonthChange,
    reduceAnimations = defaultReduceAnimations,
    renderLoading = () => /*#__PURE__*/_jsx("span", {
      children: "..."
    }),
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    view,
    views = ['year', 'day'],
    openTo = 'day',
    className,
    disabled,
    readOnly,
    minDate = defaultDates.minDate,
    maxDate = defaultDates.maxDate
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const {
    openView,
    setOpenView,
    openNext
  } = useViews({
    view,
    views,
    openTo,
    onChange,
    onViewChange
  });
  const {
    calendarState,
    changeFocusedDay,
    changeMonth,
    handleChangeMonth,
    isDateDisabled,
    onMonthSwitchingAnimationEnd
  } = useCalendarState({
    date,
    defaultCalendarMonth,
    reduceAnimations,
    onMonthChange,
    minDate,
    maxDate,
    shouldDisableDate,
    disablePast,
    disableFuture
  });
  const handleDateMonthChange = React.useCallback((newDate, selectionState) => {
    const startOfMonth = utils.startOfMonth(newDate);
    const endOfMonth = utils.endOfMonth(newDate);
    const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
      utils,
      date: newDate,
      minDate: utils.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
      maxDate: utils.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
      disablePast,
      disableFuture,
      isDateDisabled
    }) : newDate;

    if (closestEnabledDate) {
      onChange(closestEnabledDate, selectionState);
      onMonthChange?.(startOfMonth);
    } else {
      openNext();
      changeMonth(startOfMonth);
    }

    changeFocusedDay(closestEnabledDate);
  }, [changeFocusedDay, disableFuture, disablePast, isDateDisabled, maxDate, minDate, onChange, onMonthChange, changeMonth, openNext, utils]); // TODO: Use same behavior as `handleDateMonthChange` to avoid selecting a date in another year.
  // Needs startOfYear / endOfYear methods in adapter.

  const handleDateYearChange = React.useCallback((newDate, selectionState) => {
    const startOfYear = utils.startOfYear(newDate);
    const endOfYear = utils.endOfYear(newDate);
    const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
      utils,
      date: newDate,
      minDate: utils.isBefore(minDate, startOfYear) ? startOfYear : minDate,
      maxDate: utils.isAfter(maxDate, endOfYear) ? endOfYear : maxDate,
      disablePast,
      disableFuture,
      isDateDisabled
    }) : newDate;

    if (closestEnabledDate) {
      onChange(closestEnabledDate, selectionState);
      onYearChange?.(closestEnabledDate);
    } else {
      openNext();
      changeMonth(startOfYear);
    }

    changeFocusedDay(closestEnabledDate);
  }, [changeFocusedDay, disableFuture, disablePast, isDateDisabled, maxDate, minDate, onChange, onYearChange, openNext, utils, changeMonth]);
  const onSelectedDayChange = React.useCallback((day, isFinish) => {
    if (date && day) {
      // If there is a date already selected, then we want to keep its time
      return onChange(utils.mergeDateAndTime(day, date), isFinish);
    }

    return onChange(day, isFinish);
  }, [utils, date, onChange]);
  React.useEffect(() => {
    if (date && isDateDisabled(date)) {
      const closestEnabledDate = findClosestEnabledDate({
        utils,
        date,
        minDate,
        maxDate,
        disablePast,
        disableFuture,
        isDateDisabled
      });
      onChange(closestEnabledDate, 'partial');
    } // This call is too expensive to run it on each prop change.
    // So just ensure that we are not rendering disabled as selected on mount.

  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (date) {
      changeMonth(date);
    }
  }, [date]); // eslint-disable-line

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const baseDateValidationProps = {
    disablePast,
    disableFuture,
    maxDate,
    minDate
  }; // When disabled, limit the view to the selected date

  const minDateWithDisabled = disabled && date || minDate;
  const maxDateWithDisabled = disabled && date || maxDate;
  return /*#__PURE__*/_jsxs(CalendarPickerRoot, {
    ref: ref,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    children: [/*#__PURE__*/_jsx(PickersCalendarHeader, _extends({}, other, {
      views: views,
      openView: openView,
      currentMonth: calendarState.currentMonth,
      onViewChange: setOpenView,
      onMonthChange: (newMonth, direction) => handleChangeMonth({
        newMonth,
        direction
      }),
      minDate: minDateWithDisabled,
      maxDate: maxDateWithDisabled,
      disabled: disabled,
      disablePast: disablePast,
      disableFuture: disableFuture,
      reduceAnimations: reduceAnimations
    })), /*#__PURE__*/_jsx(CalendarPickerViewTransitionContainer, {
      reduceAnimations: reduceAnimations,
      className: classes.viewTransitionContainer,
      transKey: openView,
      ownerState: ownerState,
      children: /*#__PURE__*/_jsxs("div", {
        children: [openView === 'year' && /*#__PURE__*/_jsx(YearPicker, _extends({}, other, baseDateValidationProps, {
          autoFocus: autoFocus,
          date: date,
          onChange: handleDateYearChange,
          shouldDisableYear: shouldDisableYear,
          disabled: disabled,
          readOnly: readOnly
        })), openView === 'month' && /*#__PURE__*/_jsx(MonthPicker, _extends({}, baseDateValidationProps, {
          className: className,
          date: date,
          onChange: handleDateMonthChange,
          disabled: disabled,
          readOnly: readOnly,
          shouldDisableMonth: shouldDisableMonth
        })), openView === 'day' && /*#__PURE__*/_jsx(DayPicker, _extends({}, other, calendarState, baseDateValidationProps, {
          autoFocus: autoFocus,
          onMonthSwitchingAnimationEnd: onMonthSwitchingAnimationEnd,
          onFocusedDayChange: changeFocusedDay,
          reduceAnimations: reduceAnimations,
          selectedDays: [date],
          onSelectedDaysChange: onSelectedDayChange,
          loading: loading,
          renderLoading: renderLoading,
          disabled: disabled,
          readOnly: readOnly,
          shouldDisableDate: shouldDisableDate
        }))]
      })
    })]
  });
});
process.env.NODE_ENV !== "production" ? CalendarPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: PropTypes.bool,
  classes: PropTypes.object,
  className: PropTypes.string,

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
  date: PropTypes.any,

  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: PropTypes.any,

  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true` future days are disabled.
   * @default false
   */
  disableFuture: PropTypes.bool,

  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,

  /**
   * If `true` past days are disabled.
   * @default false
   */
  disablePast: PropTypes.bool,

  /**
   * Get aria-label text for switching between views button.
   * @param {CalendarPickerView} currentView The view from which we want to get the button text.
   * @returns {string} The label of the view.
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization
   */
  getViewSwitchingButtonText: PropTypes.func,

  /**
   * Left arrow icon aria-label text.
   * @deprecated
   */
  leftArrowButtonText: PropTypes.string,

  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,

  /**
   * Maximal selectable date. @DateIOType
   */
  maxDate: PropTypes.any,

  /**
   * Minimal selectable date. @DateIOType
   */
  minDate: PropTypes.any,

  /**
   * Callback fired on date change
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Callback firing on month change @DateIOType.
   * @template TDate
   * @param {TDate} month The new month.
   * @returns {void|Promise} -
   */
  onMonthChange: PropTypes.func,

  /**
   * Callback fired on view change.
   * @param {CalendarPickerView} view The new view.
   */
  onViewChange: PropTypes.func,

  /**
   * Callback firing on year change @DateIOType.
   * @template TDate
   * @param {TDate} year The new year.
   */
  onYearChange: PropTypes.func,

  /**
   * Initially open view.
   * @default 'day'
   */
  openTo: PropTypes.oneOf(['day', 'month', 'year']),

  /**
   * Make picker read only.
   * @default false
   */
  readOnly: PropTypes.bool,

  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: PropTypes.bool,

  /**
   * Custom renderer for day. Check the [PickersDay](https://mui.com/x/api/date-pickers/pickers-day/) component.
   * @template TDate
   * @param {TDate} day The day to render.
   * @param {Array<TDate | null>} selectedDays The days currently selected.
   * @param {PickersDayProps<TDate>} pickersDayProps The props of the day to render.
   * @returns {JSX.Element} The element representing the day.
   */
  renderDay: PropTypes.func,

  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: PropTypes.func,

  /**
   * Right arrow icon aria-label text.
   * @deprecated
   */
  rightArrowButtonText: PropTypes.string,

  /**
   * Disable specific date. @DateIOType
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} Returns `true` if the date should be disabled.
   */
  shouldDisableDate: PropTypes.func,

  /**
   * Disable specific months dynamically.
   * Works like `shouldDisableDate` but for month selection view @DateIOType.
   * @template TDate
   * @param {TDate} month The month to check.
   * @returns {boolean} If `true` the month will be disabled.
   */
  shouldDisableMonth: PropTypes.func,

  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} Returns `true` if the year should be disabled.
   */
  shouldDisableYear: PropTypes.func,

  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,

  /**
   * Controlled open view.
   */
  view: PropTypes.oneOf(['day', 'month', 'year']),

  /**
   * Views for calendar picker.
   * @default ['year', 'day']
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['day', 'month', 'year']).isRequired)
} : void 0;
export { CalendarPicker };