import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
export function getSkeletonUtilityClass(slot) {
  return generateUtilityClass('MuiSkeleton', slot);
}
const skeletonClasses = generateUtilityClasses('MuiSkeleton', ['root', 'text', 'rectangular', 'circular', 'pulse', 'wave', 'withChildren', 'fitContent', 'heightAuto']);
export default skeletonClasses;