import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
export function getBottomNavigationUtilityClass(slot) {
  return generateUtilityClass('MuiBottomNavigation', slot);
}
var bottomNavigationClasses = generateUtilityClasses('MuiBottomNavigation', ['root']);
export default bottomNavigationClasses;