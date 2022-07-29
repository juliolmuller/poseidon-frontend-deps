import * as React from 'react';
import { ExportedClockPickerProps } from '../ClockPicker/ClockPicker';
import { ValidationProps } from '../internals/hooks/validation/useValidation';
import { TimeValidationError } from '../internals/hooks/validation/useTimeValidation';
import { BasePickerProps } from '../internals/models/props/basePickerProps';
import { ExportedDateInputProps } from '../internals/components/PureDateInput';
import { ClockPickerView } from '../internals/models';
import { PickerStateValueManager } from '../internals/hooks/usePickerState';
import { BaseToolbarProps } from '../internals/models/props/baseToolbarProps';
export interface BaseTimePickerProps<TInputDate, TDate> extends ExportedClockPickerProps<TDate>, BasePickerProps<TInputDate | null, TDate | null>, ValidationProps<TimeValidationError, TInputDate | null>, ExportedDateInputProps<TInputDate, TDate> {
    /**
     * 12h/24h view for hour selection clock.
     * @default `utils.is12HourCycleInCurrentLocale()`
     */
    ampm?: boolean;
    /**
     * Callback fired on view change.
     * @param {ClockPickerView} view The new view.
     */
    onViewChange?: (view: ClockPickerView) => void;
    /**
     * First view to show.
     */
    openTo?: ClockPickerView;
    /**
     * Component that will replace default toolbar renderer.
     * @default TimePickerToolbar
     */
    ToolbarComponent?: React.JSXElementConstructor<BaseToolbarProps<TDate, TDate | null>>;
    /**
     * Mobile picker title, displaying in the toolbar.
     * @default 'Select time'
     */
    toolbarTitle?: React.ReactNode;
    /**
     * Array of views to show.
     */
    views?: readonly ClockPickerView[];
    components?: any;
}
declare type DefaultizedProps<Props> = Props & {
    inputFormat: string;
};
export declare function useTimePickerDefaultizedProps<TInputDate, TDate, Props extends BaseTimePickerProps<TInputDate, TDate>>(props: Props, name: string): DefaultizedProps<Props> & Required<Pick<BaseTimePickerProps<TInputDate, TDate>, 'openTo' | 'views'>>;
export declare const timePickerValueManager: PickerStateValueManager<any, any, any>;
export {};
