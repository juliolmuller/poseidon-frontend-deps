"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCalendarPickerSkeletonUtilityClass = exports.default = exports.calendarPickerSkeletonClasses = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable @typescript-eslint/no-unused-vars */
let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(['MUI: The CalendarPickerSkeleton component was moved from `@mui/lab` to `@mui/x-date-pickers`.', '', "You should use `import { CalendarPickerSkeleton } from '@mui/x-date-pickers'`", "or `import { CalendarPickerSkeleton } from '@mui/x-date-pickers/CalendarPickerSkeleton'`", '', 'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.'].join('\n'));
    warnedOnce = true;
  }
};

/**
 * @ignore - do not document.
 */
const CalendarPickerSkeleton = /*#__PURE__*/React.forwardRef(function DeprecatedCalendarPickerSkeleton() {
  warn();
  return null;
});
var _default = CalendarPickerSkeleton;
exports.default = _default;
const calendarPickerSkeletonClasses = {};
exports.calendarPickerSkeletonClasses = calendarPickerSkeletonClasses;

const getCalendarPickerSkeletonUtilityClass = slot => {
  warn();
  return '';
};

exports.getCalendarPickerSkeletonUtilityClass = getCalendarPickerSkeletonUtilityClass;