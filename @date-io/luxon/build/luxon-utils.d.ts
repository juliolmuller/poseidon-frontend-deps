import { DateTime } from "luxon";
import { IUtils, DateIOFormats, Unit } from "@date-io/core/IUtils";
export default class LuxonUtils implements IUtils<DateTime> {
    lib: string;
    locale: string;
    formats: DateIOFormats;
    constructor({ locale, formats, }?: {
        formats?: Partial<DateIOFormats>;
        locale?: string;
    });
    date: (value?: any) => DateTime;
    toJsDate: (value: DateTime) => Date;
    parseISO: (isoString: string) => DateTime;
    toISO: (value: DateTime) => string;
    parse: (value: string, formatString: string) => DateTime;
    is12HourCycleInCurrentLocale: () => boolean;
    getFormatHelperText: (format: string) => string;
    getCurrentLocaleCode: () => string;
    addSeconds: (date: DateTime, count: number) => DateTime;
    addMinutes: (date: DateTime, count: number) => DateTime;
    addHours: (date: DateTime, count: number) => DateTime;
    addDays: (date: DateTime, count: number) => DateTime;
    addWeeks: (date: DateTime, count: number) => DateTime;
    addMonths: (date: DateTime, count: number) => DateTime;
    isValid: (value: any) => boolean;
    isEqual: (value: any, comparing: any) => boolean;
    isSameDay: (date: DateTime, comparing: DateTime) => boolean;
    isSameMonth: (date: DateTime, comparing: DateTime) => boolean;
    isSameYear: (date: DateTime, comparing: DateTime) => boolean;
    isSameHour: (date: DateTime, comparing: DateTime) => boolean;
    isAfter: (value: DateTime, comparing: DateTime) => boolean;
    isBefore: (value: DateTime, comparing: DateTime) => boolean;
    isBeforeDay: (value: DateTime, comparing: DateTime) => boolean;
    isAfterDay: (value: DateTime, comparing: DateTime) => boolean;
    isBeforeYear: (value: DateTime, comparing: DateTime) => boolean;
    isAfterYear: (value: DateTime, comparing: DateTime) => boolean;
    getDiff: (value: DateTime, comparing: DateTime | string, unit?: Unit) => number;
    startOfDay: (value: DateTime) => DateTime;
    endOfDay: (value: DateTime) => DateTime;
    format: (date: DateTime, formatKey: keyof DateIOFormats) => string;
    formatByString: (date: DateTime, format: string) => string;
    formatNumber: (numberToFormat: string) => string;
    getHours: (value: DateTime) => number;
    setHours: (value: DateTime, count: number) => DateTime;
    getMinutes: (value: DateTime) => number;
    setMinutes: (value: DateTime, count: number) => DateTime;
    getSeconds: (value: DateTime) => number;
    setSeconds: (value: DateTime, count: number) => DateTime;
    getMonth: (value: DateTime) => number;
    getDaysInMonth: (value: DateTime) => number;
    setMonth: (value: DateTime, count: number) => DateTime;
    getYear: (value: DateTime) => number;
    setYear: (value: DateTime, year: number) => DateTime;
    mergeDateAndTime: (date: DateTime, time: DateTime) => DateTime;
    startOfYear: (value: DateTime) => DateTime;
    endOfYear: (value: DateTime) => DateTime;
    startOfMonth: (value: DateTime) => DateTime;
    endOfMonth: (value: DateTime) => DateTime;
    startOfWeek: (value: DateTime) => DateTime;
    endOfWeek: (value: DateTime) => DateTime;
    getNextMonth: (value: DateTime) => DateTime;
    getPreviousMonth: (value: DateTime) => DateTime;
    getMonthArray: (date: DateTime) => DateTime[];
    getWeekdays: () => string[];
    getWeekArray: (date: DateTime) => DateTime[][];
    getYearRange: (start: DateTime, end: DateTime) => DateTime[];
    getMeridiemText: (ampm: "am" | "pm") => string;
    isNull: (date: DateTime | null) => boolean;
    isWithinRange: (date: DateTime, [start, end]: [DateTime, DateTime]) => boolean;
}
