import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { SlideDirection } from './PickersSlideTransition';
import { ExportedDateValidationProps } from '../internals/hooks/validation/useDateValidation';
import { ExportedArrowSwitcherProps, PickersArrowSwitcherSlotsComponent, PickersArrowSwitcherSlotsComponentsProps } from '../internals/components/PickersArrowSwitcher';
import { CalendarPickerView } from '../internals/models';
export declare type ExportedCalendarHeaderProps<TDate> = Pick<PickersCalendarHeaderProps<TDate>, 'getViewSwitchingButtonText' | 'leftArrowButtonText' | 'rightArrowButtonText'>;
export interface PickersCalendarHeaderSlotsComponent extends PickersArrowSwitcherSlotsComponent {
    SwitchViewButton: React.ElementType;
    SwitchViewIcon: React.ElementType;
}
export interface PickersCalendarHeaderComponentsPropsOverrides {
}
export interface PickersCalendarHeaderSlotsComponentsProps extends PickersArrowSwitcherSlotsComponentsProps {
    switchViewButton: React.ComponentPropsWithRef<typeof IconButton> & PickersCalendarHeaderComponentsPropsOverrides;
}
export interface PickersCalendarHeaderProps<TDate> extends ExportedArrowSwitcherProps, Omit<ExportedDateValidationProps<TDate>, 'shouldDisableDate'> {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<PickersCalendarHeaderSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<PickersCalendarHeaderSlotsComponentsProps>;
    currentMonth: TDate;
    disabled?: boolean;
    views: readonly CalendarPickerView[];
    /**
     * Get aria-label text for switching between views button.
     * @param {CalendarPickerView} currentView The view from which we want to get the button text.
     * @returns {string} The label of the view.
     * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization
     */
    getViewSwitchingButtonText?: (currentView: CalendarPickerView) => string;
    onMonthChange: (date: TDate, slideDirection: SlideDirection) => void;
    openView: CalendarPickerView;
    reduceAnimations: boolean;
    onViewChange?: (view: CalendarPickerView) => void;
}
/**
 * @ignore - do not document.
 */
export declare function PickersCalendarHeader<TDate>(props: PickersCalendarHeaderProps<TDate>): JSX.Element | null;
