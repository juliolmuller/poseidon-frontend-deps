import hotkeys from 'hotkeys-js';
import { useRef, useCallback, useEffect } from 'react';

/**
 * @deprecated Use isHotkeyPressed instead. Will be removed version 4.
 */

function useIsHotkeyPressed() {
  return hotkeys.isPressed;
}

hotkeys.filter = function () {
  return true;
};

var tagFilter = function tagFilter(_ref, enableOnTags) {
  var target = _ref.target;
  var targetTagName = target && target.tagName;
  return Boolean(targetTagName && enableOnTags && enableOnTags.includes(targetTagName));
};

var isKeyboardEventTriggeredByInput = function isKeyboardEventTriggeredByInput(ev) {
  return tagFilter(ev, ['INPUT', 'TEXTAREA', 'SELECT']);
};

function useHotkeys(keys, callback, options, deps) {
  if (options instanceof Array) {
    deps = options;
    options = undefined;
  }

  var _ref2 = options || {},
      enableOnTags = _ref2.enableOnTags,
      filter = _ref2.filter,
      keyup = _ref2.keyup,
      keydown = _ref2.keydown,
      _ref2$filterPreventDe = _ref2.filterPreventDefault,
      filterPreventDefault = _ref2$filterPreventDe === void 0 ? true : _ref2$filterPreventDe,
      _ref2$enabled = _ref2.enabled,
      enabled = _ref2$enabled === void 0 ? true : _ref2$enabled,
      _ref2$enableOnContent = _ref2.enableOnContentEditable,
      enableOnContentEditable = _ref2$enableOnContent === void 0 ? false : _ref2$enableOnContent;

  var ref = useRef(null); // The return value of this callback determines if the browsers default behavior is prevented.

  var memoisedCallback = useCallback(function (keyboardEvent, hotkeysEvent) {
    var _keyboardEvent$target, _ref$current;

    if (filter && !filter(keyboardEvent)) {
      return !filterPreventDefault;
    } // Check whether the hotkeys was triggered inside an input and that input is enabled or if it was triggered by a content editable tag and it is enabled.


    if (isKeyboardEventTriggeredByInput(keyboardEvent) && !tagFilter(keyboardEvent, enableOnTags) || (_keyboardEvent$target = keyboardEvent.target) != null && _keyboardEvent$target.isContentEditable && !enableOnContentEditable) {
      return true;
    }

    if (ref.current === null || document.activeElement === ref.current || (_ref$current = ref.current) != null && _ref$current.contains(document.activeElement)) {
      callback(keyboardEvent, hotkeysEvent);
      return true;
    }

    return false;
  }, deps ? [ref, enableOnTags, filter].concat(deps) : [ref, enableOnTags, filter]);
  useEffect(function () {
    if (!enabled) {
      hotkeys.unbind(keys, memoisedCallback);
      return;
    } // In this case keydown is likely undefined, so we set it to false, since hotkeys needs the `keydown` key to have a value.


    if (keyup && keydown !== true) {
      options.keydown = false;
    }

    hotkeys(keys, options || {}, memoisedCallback);
    return function () {
      return hotkeys.unbind(keys, memoisedCallback);
    };
  }, [memoisedCallback, keys, enabled]);
  return ref;
}

var isHotkeyPressed = hotkeys.isPressed;

export { isHotkeyPressed, useHotkeys, useIsHotkeyPressed };
//# sourceMappingURL=react-hotkeys-hook.esm.js.map
