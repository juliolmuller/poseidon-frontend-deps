import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
export function getListItemTextUtilityClass(slot) {
  return generateUtilityClass('MuiListItemText', slot);
}
const listItemTextClasses = generateUtilityClasses('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']);
export default listItemTextClasses;