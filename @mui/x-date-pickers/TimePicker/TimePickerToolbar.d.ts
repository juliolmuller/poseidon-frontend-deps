/// <reference types="react" />
import { BaseToolbarProps } from '../internals/models/props/baseToolbarProps';
import { TimePickerToolbarClasses } from './timePickerToolbarClasses';
export interface TimePickerToolbarProps<TDate> extends BaseToolbarProps<TDate, TDate | null> {
    classes?: Partial<TimePickerToolbarClasses>;
}
/**
 * @ignore - internal component.
 */
export declare const TimePickerToolbar: <TDate extends unknown>(props: BaseToolbarProps<TDate, TDate | null>) => JSX.Element;
