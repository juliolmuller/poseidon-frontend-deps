import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
export function getListItemUtilityClass(slot) {
  return generateUtilityClass('MuiListItem', slot);
}
var listItemClasses = generateUtilityClasses('MuiListItem', ['root', 'container', 'focusVisible', 'dense', 'alignItemsFlexStart', 'disabled', 'divider', 'gutters', 'padding', 'button', 'secondaryAction', 'selected']);
export default listItemClasses;