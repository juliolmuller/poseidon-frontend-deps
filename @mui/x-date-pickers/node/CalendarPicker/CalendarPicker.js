"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarPicker = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _MonthPicker = require("../MonthPicker/MonthPicker");

var _useCalendarState = require("./useCalendarState");

var _useUtils = require("../internals/hooks/useUtils");

var _PickersFadeTransitionGroup = require("./PickersFadeTransitionGroup");

var _DayPicker = require("./DayPicker");

var _useViews = require("../internals/hooks/useViews");

var _PickersCalendarHeader = require("./PickersCalendarHeader");

var _YearPicker = require("../YearPicker/YearPicker");

var _dateUtils = require("../internals/utils/date-utils");

var _PickerViewRoot = require("../internals/components/PickerViewRoot");

var _defaultReduceAnimations = require("../internals/utils/defaultReduceAnimations");

var _calendarPickerClasses = require("./calendarPickerClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["autoFocus", "onViewChange", "date", "disableFuture", "disablePast", "defaultCalendarMonth", "loading", "onChange", "onYearChange", "onMonthChange", "reduceAnimations", "renderLoading", "shouldDisableDate", "shouldDisableMonth", "shouldDisableYear", "view", "views", "openTo", "className", "disabled", "readOnly", "minDate", "maxDate"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    viewTransitionContainer: ['viewTransitionContainer']
  };
  return (0, _material.unstable_composeClasses)(slots, _calendarPickerClasses.getCalendarPickerUtilityClass, classes);
};

const CalendarPickerRoot = (0, _styles.styled)(_PickerViewRoot.PickerViewRoot, {
  name: 'MuiCalendarPicker',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'flex',
  flexDirection: 'column'
});
const CalendarPickerViewTransitionContainer = (0, _styles.styled)(_PickersFadeTransitionGroup.PickersFadeTransitionGroup, {
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
  const utils = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  const props = (0, _styles.useThemeProps)({
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
    reduceAnimations = _defaultReduceAnimations.defaultReduceAnimations,
    renderLoading = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
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
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    openView,
    setOpenView,
    openNext
  } = (0, _useViews.useViews)({
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
  } = (0, _useCalendarState.useCalendarState)({
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
    const closestEnabledDate = isDateDisabled(newDate) ? (0, _dateUtils.findClosestEnabledDate)({
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
      onMonthChange == null ? void 0 : onMonthChange(startOfMonth);
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
    const closestEnabledDate = isDateDisabled(newDate) ? (0, _dateUtils.findClosestEnabledDate)({
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
      onYearChange == null ? void 0 : onYearChange(closestEnabledDate);
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
      const closestEnabledDate = (0, _dateUtils.findClosestEnabledDate)({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(CalendarPickerRoot, {
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersCalendarHeader.PickersCalendarHeader, (0, _extends2.default)({}, other, {
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
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(CalendarPickerViewTransitionContainer, {
      reduceAnimations: reduceAnimations,
      className: classes.viewTransitionContainer,
      transKey: openView,
      ownerState: ownerState,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [openView === 'year' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_YearPicker.YearPicker, (0, _extends2.default)({}, other, baseDateValidationProps, {
          autoFocus: autoFocus,
          date: date,
          onChange: handleDateYearChange,
          shouldDisableYear: shouldDisableYear,
          disabled: disabled,
          readOnly: readOnly
        })), openView === 'month' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MonthPicker.MonthPicker, (0, _extends2.default)({}, baseDateValidationProps, {
          className: className,
          date: date,
          onChange: handleDateMonthChange,
          disabled: disabled,
          readOnly: readOnly,
          shouldDisableMonth: shouldDisableMonth
        })), openView === 'day' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DayPicker.DayPicker, (0, _extends2.default)({}, other, calendarState, baseDateValidationProps, {
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
exports.CalendarPicker = CalendarPicker;
process.env.NODE_ENV !== "production" ? CalendarPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: _propTypes.default.bool,
  classes: _propTypes.default.object,
  className: _propTypes.default.string,

  /**
   * Overrideable components.
   * @default {}
   */
  components: _propTypes.default.object,

  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps: _propTypes.default.object,
  date: _propTypes.default.any,

  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: _propTypes.default.any,

  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true` future days are disabled.
   * @default false
   */
  disableFuture: _propTypes.default.bool,

  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: _propTypes.default.bool,

  /**
   * If `true` past days are disabled.
   * @default false
   */
  disablePast: _propTypes.default.bool,

  /**
   * Get aria-label text for switching between views button.
   * @param {CalendarPickerView} currentView The view from which we want to get the button text.
   * @returns {string} The label of the view.
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization
   */
  getViewSwitchingButtonText: _propTypes.default.func,

  /**
   * Left arrow icon aria-label text.
   * @deprecated
   */
  leftArrowButtonText: _propTypes.default.string,

  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: _propTypes.default.bool,

  /**
   * Maximal selectable date. @DateIOType
   */
  maxDate: _propTypes.default.any,

  /**
   * Minimal selectable date. @DateIOType
   */
  minDate: _propTypes.default.any,

  /**
   * Callback fired on date change
   */
  onChange: _propTypes.default.func.isRequired,

  /**
   * Callback firing on month change @DateIOType.
   * @template TDate
   * @param {TDate} month The new month.
   * @returns {void|Promise} -
   */
  onMonthChange: _propTypes.default.func,

  /**
   * Callback fired on view change.
   * @param {CalendarPickerView} view The new view.
   */
  onViewChange: _propTypes.default.func,

  /**
   * Callback firing on year change @DateIOType.
   * @template TDate
   * @param {TDate} year The new year.
   */
  onYearChange: _propTypes.default.func,

  /**
   * Initially open view.
   * @default 'day'
   */
  openTo: _propTypes.default.oneOf(['day', 'month', 'year']),

  /**
   * Make picker read only.
   * @default false
   */
  readOnly: _propTypes.default.bool,

  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: _propTypes.default.bool,

  /**
   * Custom renderer for day. Check the [PickersDay](https://mui.com/x/api/date-pickers/pickers-day/) component.
   * @template TDate
   * @param {TDate} day The day to render.
   * @param {Array<TDate | null>} selectedDays The days currently selected.
   * @param {PickersDayProps<TDate>} pickersDayProps The props of the day to render.
   * @returns {JSX.Element} The element representing the day.
   */
  renderDay: _propTypes.default.func,

  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: _propTypes.default.func,

  /**
   * Right arrow icon aria-label text.
   * @deprecated
   */
  rightArrowButtonText: _propTypes.default.string,

  /**
   * Disable specific date. @DateIOType
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} Returns `true` if the date should be disabled.
   */
  shouldDisableDate: _propTypes.default.func,

  /**
   * Disable specific months dynamically.
   * Works like `shouldDisableDate` but for month selection view @DateIOType.
   * @template TDate
   * @param {TDate} month The month to check.
   * @returns {boolean} If `true` the month will be disabled.
   */
  shouldDisableMonth: _propTypes.default.func,

  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} Returns `true` if the year should be disabled.
   */
  shouldDisableYear: _propTypes.default.func,

  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: _propTypes.default.bool,

  /**
   * Controlled open view.
   */
  view: _propTypes.default.oneOf(['day', 'month', 'year']),

  /**
   * Views for calendar picker.
   * @default ['year', 'day']
   */
  views: _propTypes.default.arrayOf(_propTypes.default.oneOf(['day', 'month', 'year']).isRequired)
} : void 0;