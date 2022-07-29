import _extends from "@babel/runtime/helpers/esm/extends";
import { useThemeProps } from '@mui/material/styles';
import { useDefaultDates, useUtils } from '../internals/hooks/useUtils';
import { parsePickerInputValue } from '../internals/utils/date-utils';
export const isYearOnlyView = views => views.length === 1 && views[0] === 'year';
export const isYearAndMonthViews = views => views.length === 2 && views.indexOf('month') !== -1 && views.indexOf('year') !== -1;

const getFormatAndMaskByViews = (views, utils) => {
  if (isYearOnlyView(views)) {
    return {
      inputFormat: utils.formats.year
    };
  }

  if (isYearAndMonthViews(views)) {
    return {
      disableMaskedInput: true,
      inputFormat: utils.formats.monthAndYear
    };
  }

  return {
    inputFormat: utils.formats.keyboardDate
  };
};

export function useDatePickerDefaultizedProps(props, name) {
  var _themeProps$views;

  const utils = useUtils();
  const defaultDates = useDefaultDates(); // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.

  const themeProps = useThemeProps({
    props,
    name
  });
  const views = (_themeProps$views = themeProps.views) != null ? _themeProps$views : ['year', 'day'];
  return _extends({
    openTo: 'day',
    minDate: defaultDates.minDate,
    maxDate: defaultDates.maxDate
  }, getFormatAndMaskByViews(views, utils), themeProps, {
    views
  });
}
export const datePickerValueManager = {
  emptyValue: null,
  getTodayValue: utils => utils.date(),
  parseInput: parsePickerInputValue,
  areValuesEqual: (utils, a, b) => utils.isEqual(a, b)
};