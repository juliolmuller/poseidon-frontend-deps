import * as React from 'react';
import { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import { PopperProps as MuiPopperProps } from '@mui/material/Popper';
import { TrapFocusProps as MuiTrapFocusProps } from '@mui/material/Unstable_TrapFocus';
import { TransitionProps as MuiTransitionProps } from '@mui/material/transitions';
import { PickersActionBarProps } from '../../PickersActionBar';
export interface PickersPopperSlotsComponent {
    ActionBar: React.ElementType<PickersActionBarProps>;
}
export interface PickersPopperSlotsComponentsProps {
    actionBar: Omit<PickersActionBarProps, 'onAccept' | 'onClear' | 'onCancel' | 'onSetToday'>;
}
export interface ExportedPickerPaperProps {
    /**
     * Paper props passed down to [Paper](https://mui.com/material-ui/api/paper/) component.
     */
    PaperProps?: Partial<MuiPaperProps>;
}
export interface ExportedPickerPopperProps {
    /**
     * Popper props passed down to [Popper](https://mui.com/material-ui/api/popper/) component.
     */
    PopperProps?: Partial<MuiPopperProps>;
    /**
     * Custom component for popper [Transition](https://mui.com/material-ui/transitions/#transitioncomponent-prop).
     */
    TransitionComponent?: React.JSXElementConstructor<MuiTransitionProps>;
}
export interface PickerPopperProps extends ExportedPickerPopperProps, ExportedPickerPaperProps {
    role: 'tooltip' | 'dialog';
    TrapFocusProps?: Partial<MuiTrapFocusProps>;
    anchorEl: MuiPopperProps['anchorEl'];
    open: MuiPopperProps['open'];
    containerRef?: React.Ref<HTMLDivElement>;
    children?: React.ReactNode;
    onClose: () => void;
    onBlur?: () => void;
    onClear: () => void;
    onCancel: () => void;
    onAccept: () => void;
    onSetToday: () => void;
    components?: Partial<PickersPopperSlotsComponent>;
    componentsProps?: Partial<PickersPopperSlotsComponentsProps>;
}
export declare const PickersPopper: (props: PickerPopperProps) => JSX.Element;
