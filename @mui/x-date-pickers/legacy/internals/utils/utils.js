/* Use it instead of .includes method for IE support */
export function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(function (item) {
      return array.indexOf(item) !== -1;
    });
  }

  return array.indexOf(itemOrItems) !== -1;
}
export var onSpaceOrEnter = function onSpaceOrEnter(innerFn, onFocus) {
  return function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      innerFn(); // prevent any side effects

      event.preventDefault();
      event.stopPropagation();
    }

    if (onFocus) {
      onFocus(event);
    }
  };
};
export var executeInTheNextEventLoopTick = function executeInTheNextEventLoopTick(fn) {
  setTimeout(fn, 0);
};
export var doNothing = function doNothing() {};