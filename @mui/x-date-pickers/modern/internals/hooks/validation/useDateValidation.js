import * as React from 'react';
import { useValidation } from './useValidation';
import { useLocalizationContext } from '../useUtils';
export const validateDate = ({
  props,
  value,
  adapter
}) => {
  const now = adapter.utils.date();
  const date = adapter.utils.date(value);
  const {
    shouldDisableDate,
    minDate = adapter.defaultDates.minDate,
    maxDate = adapter.defaultDates.maxDate,
    disableFuture,
    disablePast
  } = props;

  if (date === null) {
    return null;
  }

  switch (true) {
    case !adapter.utils.isValid(value):
      return 'invalidDate';

    case Boolean(shouldDisableDate && shouldDisableDate(date)):
      return 'shouldDisableDate';

    case Boolean(disableFuture && adapter.utils.isAfterDay(date, now)):
      return 'disableFuture';

    case Boolean(disablePast && adapter.utils.isBeforeDay(date, now)):
      return 'disablePast';

    case Boolean(minDate && adapter.utils.isBeforeDay(date, minDate)):
      return 'minDate';

    case Boolean(maxDate && adapter.utils.isAfterDay(date, maxDate)):
      return 'maxDate';

    default:
      return null;
  }
};
export const useIsDayDisabled = ({
  shouldDisableDate,
  minDate,
  maxDate,
  disableFuture,
  disablePast
}) => {
  const adapter = useLocalizationContext();
  return React.useCallback(day => validateDate({
    adapter,
    value: day,
    props: {
      shouldDisableDate,
      minDate,
      maxDate,
      disableFuture,
      disablePast
    }
  }) !== null, [adapter, shouldDisableDate, minDate, maxDate, disableFuture, disablePast]);
};

const isSameDateError = (a, b) => a === b;

export const useDateValidation = props => useValidation(props, validateDate, isSameDateError);