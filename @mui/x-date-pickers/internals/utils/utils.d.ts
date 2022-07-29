import * as React from 'react';
export declare function arrayIncludes<T>(array: T[] | readonly T[], itemOrItems: T | T[]): boolean;
export declare const onSpaceOrEnter: (innerFn: () => void, onFocus?: ((event: React.KeyboardEvent<any>) => void) | undefined) => (event: React.KeyboardEvent) => void;
export declare const executeInTheNextEventLoopTick: (fn: () => void) => void;
export declare const doNothing: () => void;
