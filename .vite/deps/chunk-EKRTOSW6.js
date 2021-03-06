import {
  HTMLElementType,
  ThemeProvider_default,
  capitalize,
  chainPropTypes,
  composeClasses,
  createChainedFunction,
  debounce,
  deepmerge,
  elementAcceptingRef_default,
  exactProp,
  generateUtilityClass,
  generateUtilityClasses,
  getDisplayName,
  getScrollbarSize,
  init_ThemeProvider,
  init_esm,
  init_useTheme,
  isPlainObject,
  ownerDocument,
  ownerWindow,
  refType_default,
  require_jsx_runtime,
  require_react_is,
  resolveProps,
  setRef,
  useControlled,
  useEnhancedEffect_default,
  useEventCallback,
  useForkRef,
  useId,
  useIsFocusVisible,
  usePreviousProps_default,
  useTheme,
  visuallyHidden_default
} from "./chunk-SGACJTM6.js";
import {
  clsx_m_default,
  init_clsx_m
} from "./chunk-6CPOZ5NC.js";
import {
  require_react_dom
} from "./chunk-HGSA6K72.js";
import {
  require_hoist_non_react_statics_cjs,
  require_prop_types
} from "./chunk-25QP6ADL.js";
import {
  _objectWithoutPropertiesLoose,
  init_objectWithoutPropertiesLoose
} from "./chunk-2CJRPHYX.js";
import {
  _extends,
  init_extends
} from "./chunk-FFNBZMHM.js";
import {
  require_react
} from "./chunk-ANJDCHW7.js";
import {
  __esm,
  __toESM
} from "./chunk-5537U2Q2.js";

// node_modules/@mui/base/AutocompleteUnstyled/useAutocomplete.js
function stripDiacritics(string) {
  return typeof string.normalize !== "undefined" ? string.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : string;
}
function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = "any",
    stringify: stringify2,
    trim: trim2 = false
  } = config;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim2 ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }
    const filteredOptions = options.filter((option) => {
      let candidate = (stringify2 || getOptionLabel)(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === "start" ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === "number" ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }
  return -1;
}
function useAutocomplete(props) {
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = "useAutocomplete",
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled: disabledProp,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionLabel: getOptionLabelProp = (option) => {
      var _option$label;
      return (_option$label = option.label) != null ? _option$label : option;
    },
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    isOptionEqualToValue = (option, value2) => option === value2,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    readOnly = false,
    selectOnFocus = !props.freeSolo,
    value: valueProp
  } = props;
  const id = useId(idProp);
  let getOptionLabel = getOptionLabelProp;
  getOptionLabel = (option) => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== "string") {
      if (true) {
        const erroneousReturn = optionLabel === void 0 ? "undefined" : `${typeof optionLabel} (${optionLabel})`;
        console.error(`MUI: The \`getOptionLabel\` method of ${componentName} returned ${erroneousReturn} instead of a string for ${JSON.stringify(option)}.`);
      }
      return String(optionLabel);
    }
    return optionLabel;
  };
  const ignoreFocus = React.useRef(false);
  const firstFocus = React.useRef(true);
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [focusedTag, setFocusedTag] = React.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = React.useRef(defaultHighlighted);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: "",
    name: componentName,
    state: "inputValue"
  });
  const [focused, setFocused] = React.useState(false);
  const resetInputValue = React.useCallback((event, newValue) => {
    const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
    if (!isOptionSelected && !clearOnBlur) {
      return;
    }
    let newInputValue;
    if (multiple) {
      newInputValue = "";
    } else if (newValue == null) {
      newInputValue = "";
    } else {
      const optionLabel = getOptionLabel(newValue);
      newInputValue = typeof optionLabel === "string" ? optionLabel : "";
    }
    if (inputValue === newInputValue) {
      return;
    }
    setInputValueState(newInputValue);
    if (onInputChange) {
      onInputChange(event, newInputValue, "reset");
    }
  }, [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, clearOnBlur, value]);
  const prevValue = React.useRef();
  React.useEffect(() => {
    const valueChange = value !== prevValue.current;
    prevValue.current = value;
    if (focused && !valueChange) {
      return;
    }
    if (freeSolo && !valueChange) {
      return;
    }
    resetInputValue(null, value);
  }, [value, resetInputValue, focused, prevValue, freeSolo]);
  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: "open"
  });
  const [inputPristine, setInputPristine] = React.useState(true);
  const inputValueIsSelectedValue = !multiple && value != null && inputValue === getOptionLabel(value);
  const popupOpen = open && !readOnly;
  const filteredOptions = popupOpen ? filterOptions(options.filter((option) => {
    if (filterSelectedOptions && (multiple ? value : [value]).some((value2) => value2 !== null && isOptionEqualToValue(option, value2))) {
      return false;
    }
    return true;
  }), {
    inputValue: inputValueIsSelectedValue && inputPristine ? "" : inputValue,
    getOptionLabel
  }) : [];
  const listboxAvailable = open && filteredOptions.length > 0 && !readOnly;
  if (true) {
    if (value !== null && !freeSolo && options.length > 0) {
      const missingValue = (multiple ? value : [value]).filter((value2) => !options.some((option) => isOptionEqualToValue(option, value2)));
      if (missingValue.length > 0) {
        console.warn([`MUI: The value provided to ${componentName} is invalid.`, `None of the options match with \`${missingValue.length > 1 ? JSON.stringify(missingValue) : JSON.stringify(missingValue[0])}\`.`, "You can use the `isOptionEqualToValue` prop to customize the equality test."].join("\n"));
      }
    }
  }
  const focusTag = useEventCallback((tagToFocus) => {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-tag-index="${tagToFocus}"]`).focus();
    }
  });
  React.useEffect(() => {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);
  function validOptionIndex(index, direction) {
    if (!listboxRef.current || index === -1) {
      return -1;
    }
    let nextFocus = index;
    while (true) {
      if (direction === "next" && nextFocus === filteredOptions.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);
      const nextFocusDisabled = disabledItemsFocusable ? false : !option || option.disabled || option.getAttribute("aria-disabled") === "true";
      if (option && !option.hasAttribute("tabindex") || nextFocusDisabled) {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const setHighlightedIndex = useEventCallback(({
    event,
    index,
    reason = "auto"
  }) => {
    highlightedIndexRef.current = index;
    if (index === -1) {
      inputRef.current.removeAttribute("aria-activedescendant");
    } else {
      inputRef.current.setAttribute("aria-activedescendant", `${id}-option-${index}`);
    }
    if (onHighlightChange) {
      onHighlightChange(event, index === -1 ? null : filteredOptions[index], reason);
    }
    if (!listboxRef.current) {
      return;
    }
    const prev2 = listboxRef.current.querySelector('[role="option"].Mui-focused');
    if (prev2) {
      prev2.classList.remove("Mui-focused");
      prev2.classList.remove("Mui-focusVisible");
    }
    const listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');
    if (!listboxNode) {
      return;
    }
    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }
    const option = listboxRef.current.querySelector(`[data-option-index="${index}"]`);
    if (!option) {
      return;
    }
    option.classList.add("Mui-focused");
    if (reason === "keyboard") {
      option.classList.add("Mui-focusVisible");
    }
    if (listboxNode.scrollHeight > listboxNode.clientHeight && reason !== "mouse") {
      const element = option;
      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  });
  const changeHighlightedIndex = useEventCallback(({
    event,
    diff,
    direction = "next",
    reason = "auto"
  }) => {
    if (!popupOpen) {
      return;
    }
    const getNextIndex = () => {
      const maxIndex = filteredOptions.length - 1;
      if (diff === "reset") {
        return defaultHighlighted;
      }
      if (diff === "start") {
        return 0;
      }
      if (diff === "end") {
        return maxIndex;
      }
      const newIndex = highlightedIndexRef.current + diff;
      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }
        return maxIndex;
      }
      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }
        return 0;
      }
      return newIndex;
    };
    const nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex({
      index: nextIndex,
      reason,
      event
    });
    if (autoComplete && diff !== "reset") {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        const option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option;
        const index = option.toLowerCase().indexOf(inputValue.toLowerCase());
        if (index === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  const syncHighlightedIndex = React.useCallback(() => {
    if (!popupOpen) {
      return;
    }
    const valueItem = multiple ? value[0] : value;
    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex({
        diff: "reset"
      });
      return;
    }
    if (!listboxRef.current) {
      return;
    }
    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current];
      if (multiple && currentOption && findIndex(value, (val) => isOptionEqualToValue(currentOption, val)) !== -1) {
        return;
      }
      const itemIndex = findIndex(filteredOptions, (optionItem) => isOptionEqualToValue(optionItem, valueItem));
      if (itemIndex === -1) {
        changeHighlightedIndex({
          diff: "reset"
        });
      } else {
        setHighlightedIndex({
          index: itemIndex
        });
      }
      return;
    }
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({
        index: filteredOptions.length - 1
      });
      return;
    }
    setHighlightedIndex({
      index: highlightedIndexRef.current
    });
  }, [
    filteredOptions.length,
    multiple ? false : value,
    filterSelectedOptions,
    changeHighlightedIndex,
    setHighlightedIndex,
    popupOpen,
    inputValue,
    multiple
  ]);
  const handleListboxRef = useEventCallback((node2) => {
    setRef(listboxRef, node2);
    if (!node2) {
      return;
    }
    syncHighlightedIndex();
  });
  if (true) {
    React.useEffect(() => {
      if (!inputRef.current || inputRef.current.nodeName !== "INPUT") {
        if (inputRef.current && inputRef.current.nodeName === "TEXTAREA") {
          console.warn([`A textarea element was provided to ${componentName} where input was expected.`, `This is not a supported scenario but it may work under certain conditions.`, `A textarea keyboard navigation may conflict with Autocomplete controls (e.g. enter and arrow keys).`, `Make sure to test keyboard navigation and add custom event handlers if necessary.`].join("\n"));
        } else {
          console.error([`MUI: Unable to find the input element. It was resolved to ${inputRef.current} while an HTMLInputElement was expected.`, `Instead, ${componentName} expects an input element.`, "", componentName === "useAutocomplete" ? "Make sure you have binded getInputProps correctly and that the normal ref/effect resolutions order is guaranteed." : "Make sure you have customized the input component correctly."].join("\n"));
        }
      }
    }, [componentName]);
  }
  React.useEffect(() => {
    syncHighlightedIndex();
  }, [syncHighlightedIndex]);
  const handleOpen = (event) => {
    if (open) {
      return;
    }
    setOpenState(true);
    setInputPristine(true);
    if (onOpen) {
      onOpen(event);
    }
  };
  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }
    setOpenState(false);
    if (onClose) {
      onClose(event, reason);
    }
  };
  const handleValue = (event, newValue, reason, details) => {
    if (multiple) {
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
        return;
      }
    } else if (value === newValue) {
      return;
    }
    if (onChange) {
      onChange(event, newValue, reason, details);
    }
    setValueState(newValue);
  };
  const isTouch = React.useRef(false);
  const selectNewValue = (event, option, reasonProp = "selectOption", origin = "options") => {
    let reason = reasonProp;
    let newValue = option;
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      if (true) {
        const matches = newValue.filter((val) => isOptionEqualToValue(option, val));
        if (matches.length > 1) {
          console.error([`MUI: The \`isOptionEqualToValue\` method of ${componentName} do not handle the arguments correctly.`, `The component expects a single value to match a given option but found ${matches.length} matches.`].join("\n"));
        }
      }
      const itemIndex = findIndex(newValue, (valueItem) => isOptionEqualToValue(option, valueItem));
      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== "freeSolo") {
        newValue.splice(itemIndex, 1);
        reason = "removeOption";
      }
    }
    resetInputValue(event, newValue);
    handleValue(event, newValue, reason, {
      option
    });
    if (!disableCloseOnSelect && (!event || !event.ctrlKey && !event.metaKey)) {
      handleClose(event, reason);
    }
    if (blurOnSelect === true || blurOnSelect === "touch" && isTouch.current || blurOnSelect === "mouse" && !isTouch.current) {
      inputRef.current.blur();
    }
  };
  function validTagIndex(index, direction) {
    if (index === -1) {
      return -1;
    }
    let nextFocus = index;
    while (true) {
      if (direction === "next" && nextFocus === value.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = anchorEl.querySelector(`[data-tag-index="${nextFocus}"]`);
      if (!option || !option.hasAttribute("tabindex") || option.disabled || option.getAttribute("aria-disabled") === "true") {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const handleFocusTag = (event, direction) => {
    if (!multiple) {
      return;
    }
    if (inputValue === "") {
      handleClose(event, "toggleInput");
    }
    let nextTag = focusedTag;
    if (focusedTag === -1) {
      if (inputValue === "" && direction === "previous") {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === "next" ? 1 : -1;
      if (nextTag < 0) {
        nextTag = 0;
      }
      if (nextTag === value.length) {
        nextTag = -1;
      }
    }
    nextTag = validTagIndex(nextTag, direction);
    setFocusedTag(nextTag);
    focusTag(nextTag);
  };
  const handleClear = (event) => {
    ignoreFocus.current = true;
    setInputValueState("");
    if (onInputChange) {
      onInputChange(event, "", "clear");
    }
    handleValue(event, multiple ? [] : null, "clear");
  };
  const handleKeyDown2 = (other) => (event) => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }
    if (event.defaultMuiPrevented) {
      return;
    }
    if (focusedTag !== -1 && ["ArrowLeft", "ArrowRight"].indexOf(event.key) === -1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
    if (event.which !== 229) {
      switch (event.key) {
        case "Home":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "start",
              direction: "next",
              reason: "keyboard",
              event
            });
          }
          break;
        case "End":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "end",
              direction: "previous",
              reason: "keyboard",
              event
            });
          }
          break;
        case "PageUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "PageDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: pageSize,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: 1,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -1,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowLeft":
          handleFocusTag(event, "previous");
          break;
        case "ArrowRight":
          handleFocusTag(event, "next");
          break;
        case "Enter":
          if (highlightedIndexRef.current !== -1 && popupOpen) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
            event.preventDefault();
            if (disabled) {
              return;
            }
            selectNewValue(event, option, "selectOption");
            if (autoComplete) {
              inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
          } else if (freeSolo && inputValue !== "" && inputValueIsSelectedValue === false) {
            if (multiple) {
              event.preventDefault();
            }
            selectNewValue(event, inputValue, "createOption", "freeSolo");
          }
          break;
        case "Escape":
          if (popupOpen) {
            event.preventDefault();
            event.stopPropagation();
            handleClose(event, "escape");
          } else if (clearOnEscape && (inputValue !== "" || multiple && value.length > 0)) {
            event.preventDefault();
            event.stopPropagation();
            handleClear(event);
          }
          break;
        case "Backspace":
          if (multiple && !readOnly && inputValue === "" && value.length > 0) {
            const index = focusedTag === -1 ? value.length - 1 : focusedTag;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, "removeOption", {
              option: value[index]
            });
          }
          break;
        default:
      }
    }
  };
  const handleFocus = (event) => {
    setFocused(true);
    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };
  const handleBlur2 = (event) => {
    if (listboxRef.current !== null && listboxRef.current.parentElement.contains(document.activeElement)) {
      inputRef.current.focus();
      return;
    }
    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;
    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], "blur");
    } else if (autoSelect && freeSolo && inputValue !== "") {
      selectNewValue(event, inputValue, "blur", "freeSolo");
    } else if (clearOnBlur) {
      resetInputValue(event, value);
    }
    handleClose(event, "blur");
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);
      if (onInputChange) {
        onInputChange(event, newValue, "input");
      }
    }
    if (newValue === "") {
      if (!disableClearable && !multiple) {
        handleValue(event, null, "clear");
      }
    } else {
      handleOpen(event);
    }
  };
  const handleOptionMouseOver = (event) => {
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute("data-option-index")),
      reason: "mouse"
    });
  };
  const handleOptionTouchStart = () => {
    isTouch.current = true;
  };
  const handleOptionClick = (event) => {
    const index = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(event, filteredOptions[index], "selectOption");
    isTouch.current = false;
  };
  const handleTagDelete = (index) => (event) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, "removeOption", {
      option: value[index]
    });
  };
  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event, "toggleInput");
    } else {
      handleOpen(event);
    }
  };
  const handleMouseDown = (event) => {
    if (event.target.getAttribute("id") !== id) {
      event.preventDefault();
    }
  };
  const handleClick = () => {
    inputRef.current.focus();
    if (selectOnFocus && firstFocus.current && inputRef.current.selectionEnd - inputRef.current.selectionStart === 0) {
      inputRef.current.select();
    }
    firstFocus.current = false;
  };
  const handleInputMouseDown = (event) => {
    if (inputValue === "" || !open) {
      handlePopupIndicator(event);
    }
  };
  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);
  let groupedOptions = filteredOptions;
  if (groupBy) {
    const indexBy = /* @__PURE__ */ new Map();
    let warn = false;
    groupedOptions = filteredOptions.reduce((acc, option, index) => {
      const group = groupBy(option);
      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        if (true) {
          if (indexBy.get(group) && !warn) {
            console.warn(`MUI: The options provided combined with the \`groupBy\` method of ${componentName} returns duplicated headers.`, "You can solve the issue by sorting the options with the output of `groupBy`.");
            warn = true;
          }
          indexBy.set(group, true);
        }
        acc.push({
          key: index,
          index,
          group,
          options: [option]
        });
      }
      return acc;
    }, []);
  }
  if (disabledProp && focused) {
    handleBlur2();
  }
  return {
    getRootProps: (other = {}) => _extends({
      "aria-owns": listboxAvailable ? `${id}-listbox` : null
    }, other, {
      onKeyDown: handleKeyDown2(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onBlur: handleBlur2,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      "aria-activedescendant": popupOpen ? "" : null,
      "aria-autocomplete": autoComplete ? "both" : "list",
      "aria-controls": listboxAvailable ? `${id}-listbox` : void 0,
      "aria-expanded": listboxAvailable,
      autoComplete: "off",
      ref: inputRef,
      autoCapitalize: "none",
      spellCheck: "false",
      role: "combobox"
    }),
    getClearProps: () => ({
      tabIndex: -1,
      onClick: handleClear
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      onClick: handlePopupIndicator
    }),
    getTagProps: ({
      index
    }) => _extends({
      key: index,
      "data-tag-index": index,
      tabIndex: -1
    }, !readOnly && {
      onDelete: handleTagDelete(index)
    }),
    getListboxProps: () => ({
      role: "listbox",
      id: `${id}-listbox`,
      "aria-labelledby": `${id}-label`,
      ref: handleListboxRef,
      onMouseDown: (event) => {
        event.preventDefault();
      }
    }),
    getOptionProps: ({
      index,
      option
    }) => {
      const selected = (multiple ? value : [value]).some((value2) => value2 != null && isOptionEqualToValue(option, value2));
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
      return {
        key: getOptionLabel(option),
        tabIndex: -1,
        role: "option",
        id: `${id}-option-${index}`,
        onMouseOver: handleOptionMouseOver,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        "data-option-index": index,
        "aria-disabled": disabled,
        "aria-selected": selected
      };
    },
    id,
    inputValue,
    value,
    dirty,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions
  };
}
var React, defaultFilterOptions, pageSize;
var init_useAutocomplete = __esm({
  "node_modules/@mui/base/AutocompleteUnstyled/useAutocomplete.js"() {
    init_extends();
    React = __toESM(require_react());
    init_esm();
    defaultFilterOptions = createFilterOptions();
    pageSize = 5;
  }
});

// node_modules/@mui/base/AutocompleteUnstyled/index.js
var init_AutocompleteUnstyled = __esm({
  "node_modules/@mui/base/AutocompleteUnstyled/index.js"() {
    init_useAutocomplete();
  }
});

// node_modules/@mui/base/composeClasses/index.js
var init_composeClasses = __esm({
  "node_modules/@mui/base/composeClasses/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/generateUtilityClasses/index.js
var init_generateUtilityClasses = __esm({
  "node_modules/@mui/base/generateUtilityClasses/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/generateUtilityClass/index.js
var init_generateUtilityClass = __esm({
  "node_modules/@mui/base/generateUtilityClass/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js
function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}
function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
function ClickAwayListener(props) {
  const {
    children,
    disableReactTree = false,
    mouseEvent = "onClick",
    onClickAway,
    touchEvent = "onTouchEnd"
  } = props;
  const movedRef = React2.useRef(false);
  const nodeRef = React2.useRef(null);
  const activatedRef = React2.useRef(false);
  const syntheticEventRef = React2.useRef(false);
  React2.useEffect(() => {
    setTimeout(() => {
      activatedRef.current = true;
    }, 0);
    return () => {
      activatedRef.current = false;
    };
  }, []);
  const handleRef = useForkRef(children.ref, nodeRef);
  const handleClickAway = useEventCallback((event) => {
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = ownerDocument(nodeRef.current);
    if (!activatedRef.current || !nodeRef.current || "clientX" in event && clickedRootScrollbar(event, doc)) {
      return;
    }
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM;
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }
    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  });
  const createHandleSynthetic = (handlerName) => (event) => {
    syntheticEventRef.current = true;
    const childrenPropsHandler = children.props[handlerName];
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const childrenProps = {
    ref: handleRef
  };
  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }
  React2.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener("touchmove", handleTouchMove);
      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener("touchmove", handleTouchMove);
      };
    }
    return void 0;
  }, [handleClickAway, touchEvent]);
  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }
  React2.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }
    return void 0;
  }, [handleClickAway, mouseEvent]);
  return (0, import_jsx_runtime.jsx)(React2.Fragment, {
    children: React2.cloneElement(children, childrenProps)
  });
}
var React2, import_prop_types, import_jsx_runtime, ClickAwayListener_default;
var init_ClickAwayListener = __esm({
  "node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js"() {
    React2 = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    true ? ClickAwayListener.propTypes = {
      children: elementAcceptingRef_default.isRequired,
      disableReactTree: import_prop_types.default.bool,
      mouseEvent: import_prop_types.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
      onClickAway: import_prop_types.default.func.isRequired,
      touchEvent: import_prop_types.default.oneOf(["onTouchEnd", "onTouchStart", false])
    } : void 0;
    if (true) {
      ClickAwayListener["propTypes"] = exactProp(ClickAwayListener.propTypes);
    }
    ClickAwayListener_default = ClickAwayListener;
  }
});

// node_modules/@mui/base/ClickAwayListener/index.js
var init_ClickAwayListener2 = __esm({
  "node_modules/@mui/base/ClickAwayListener/index.js"() {
    init_ClickAwayListener();
    init_ClickAwayListener();
  }
});

// node_modules/@mui/base/Portal/Portal.js
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
var React3, ReactDOM, import_prop_types2, Portal, Portal_default;
var init_Portal = __esm({
  "node_modules/@mui/base/Portal/Portal.js"() {
    React3 = __toESM(require_react());
    ReactDOM = __toESM(require_react_dom());
    import_prop_types2 = __toESM(require_prop_types());
    init_esm();
    Portal = React3.forwardRef(function Portal2(props, ref) {
      const {
        children,
        container,
        disablePortal = false
      } = props;
      const [mountNode, setMountNode] = React3.useState(null);
      const handleRef = useForkRef(React3.isValidElement(children) ? children.ref : null, ref);
      useEnhancedEffect_default(() => {
        if (!disablePortal) {
          setMountNode(getContainer(container) || document.body);
        }
      }, [container, disablePortal]);
      useEnhancedEffect_default(() => {
        if (mountNode && !disablePortal) {
          setRef(ref, mountNode);
          return () => {
            setRef(ref, null);
          };
        }
        return void 0;
      }, [ref, mountNode, disablePortal]);
      if (disablePortal) {
        if (React3.isValidElement(children)) {
          return React3.cloneElement(children, {
            ref: handleRef
          });
        }
        return children;
      }
      return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
    });
    true ? Portal.propTypes = {
      children: import_prop_types2.default.node,
      container: import_prop_types2.default.oneOfType([HTMLElementType, import_prop_types2.default.func]),
      disablePortal: import_prop_types2.default.bool
    } : void 0;
    if (true) {
      Portal["propTypes"] = exactProp(Portal.propTypes);
    }
    Portal_default = Portal;
  }
});

// node_modules/@mui/base/Portal/index.js
var init_Portal2 = __esm({
  "node_modules/@mui/base/Portal/index.js"() {
    init_Portal();
  }
});

// node_modules/@mui/base/ModalUnstyled/ModalManager.js
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
  if (show) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
  const forbiddenTagNames = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"];
  const isForbiddenTagName = forbiddenTagNames.indexOf(element.tagName) !== -1;
  const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
  return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude = [], show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  [].forEach.call(container.children, (element) => {
    const isNotExcludedElement = blacklist.indexOf(element) === -1;
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, show);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements2 = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements2, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    let scrollContainer;
    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer = (parent == null ? void 0 : parent.nodeName) === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    }
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
var ModalManager;
var init_ModalManager = __esm({
  "node_modules/@mui/base/ModalUnstyled/ModalManager.js"() {
    init_esm();
    ModalManager = class {
      constructor() {
        this.containers = void 0;
        this.modals = void 0;
        this.modals = [];
        this.containers = [];
      }
      add(modal, container) {
        let modalIndex = this.modals.indexOf(modal);
        if (modalIndex !== -1) {
          return modalIndex;
        }
        modalIndex = this.modals.length;
        this.modals.push(modal);
        if (modal.modalRef) {
          ariaHidden(modal.modalRef, false);
        }
        const hiddenSiblings = getHiddenSiblings(container);
        ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
        const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
        if (containerIndex !== -1) {
          this.containers[containerIndex].modals.push(modal);
          return modalIndex;
        }
        this.containers.push({
          modals: [modal],
          container,
          restore: null,
          hiddenSiblings
        });
        return modalIndex;
      }
      mount(modal, props) {
        const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
        const containerInfo = this.containers[containerIndex];
        if (!containerInfo.restore) {
          containerInfo.restore = handleContainer(containerInfo, props);
        }
      }
      remove(modal, ariaHiddenState = true) {
        const modalIndex = this.modals.indexOf(modal);
        if (modalIndex === -1) {
          return modalIndex;
        }
        const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
        const containerInfo = this.containers[containerIndex];
        containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
        this.modals.splice(modalIndex, 1);
        if (containerInfo.modals.length === 0) {
          if (containerInfo.restore) {
            containerInfo.restore();
          }
          if (modal.modalRef) {
            ariaHidden(modal.modalRef, ariaHiddenState);
          }
          ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
          this.containers.splice(containerIndex, 1);
        } else {
          const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
          if (nextTop.modalRef) {
            ariaHidden(nextTop.modalRef, false);
          }
        }
        return modalIndex;
      }
      isTopModal(modal) {
        return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
      }
    };
  }
});

// node_modules/@mui/base/ModalUnstyled/modalUnstyledClasses.js
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
var modalUnstyledClasses, modalUnstyledClasses_default;
var init_modalUnstyledClasses = __esm({
  "node_modules/@mui/base/ModalUnstyled/modalUnstyledClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    modalUnstyledClasses = generateUtilityClasses("MuiModal", ["root", "hidden"]);
    modalUnstyledClasses_default = modalUnstyledClasses;
  }
});

// node_modules/@mui/base/TrapFocus/TrapFocus.js
function getTabIndex(node2) {
  const tabindexAttr = parseInt(node2.getAttribute("tabindex"), 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node2.contentEditable === "true" || (node2.nodeName === "AUDIO" || node2.nodeName === "VIDEO" || node2.nodeName === "DETAILS") && node2.getAttribute("tabindex") === null) {
    return 0;
  }
  return node2.tabIndex;
}
function isNonTabbableRadio(node2) {
  if (node2.tagName !== "INPUT" || node2.type !== "radio") {
    return false;
  }
  if (!node2.name) {
    return false;
  }
  const getRadio = (selector) => node2.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node2.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node2.name}"]`);
  }
  return roving !== node2;
}
function isNodeMatchingSelectorFocusable(node2) {
  if (node2.disabled || node2.tagName === "INPUT" && node2.type === "hidden" || isNonTabbableRadio(node2)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node2, i) => {
    const nodeTabIndex = getTabIndex(node2);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node2)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node2);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node: node2
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function TrapFocus(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = React4.useRef();
  const sentinelStart = React4.useRef(null);
  const sentinelEnd = React4.useRef(null);
  const nodeToRestore = React4.useRef(null);
  const reactFocusEventTarget = React4.useRef(null);
  const activated = React4.useRef(false);
  const rootRef = React4.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = React4.useRef(null);
  React4.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  React4.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        if (true) {
          console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join("\n"));
        }
        rootRef.current.setAttribute("tabIndex", -1);
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  React4.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const contain = (nativeEvent) => {
      const {
        current: rootElement
      } = rootRef;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (!rootElement.contains(doc.activeElement)) {
        if (nativeEvent && reactFocusEventTarget.current !== nativeEvent.target || doc.activeElement !== reactFocusEventTarget.current) {
          reactFocusEventTarget.current = null;
        } else if (reactFocusEventTarget.current !== null) {
          return;
        }
        if (!activated.current) {
          return;
        }
        let tabbable = [];
        if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
          tabbable = getTabbable(rootRef.current);
        }
        if (tabbable.length > 0) {
          var _lastKeydown$current, _lastKeydown$current2;
          const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === "Tab");
          const focusNext = tabbable[0];
          const focusPrevious = tabbable[tabbable.length - 1];
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        } else {
          rootElement.focus();
        }
      }
    };
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        sentinelEnd.current.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return (0, import_jsx_runtime3.jsxs)(React4.Fragment, {
    children: [(0, import_jsx_runtime2.jsx)("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-test": "sentinelStart"
    }), React4.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), (0, import_jsx_runtime2.jsx)("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-test": "sentinelEnd"
    })]
  });
}
var React4, import_prop_types3, import_jsx_runtime2, import_jsx_runtime3, candidatesSelector, TrapFocus_default;
var init_TrapFocus = __esm({
  "node_modules/@mui/base/TrapFocus/TrapFocus.js"() {
    React4 = __toESM(require_react());
    import_prop_types3 = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime2 = __toESM(require_jsx_runtime());
    import_jsx_runtime3 = __toESM(require_jsx_runtime());
    candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
    true ? TrapFocus.propTypes = {
      children: elementAcceptingRef_default,
      disableAutoFocus: import_prop_types3.default.bool,
      disableEnforceFocus: import_prop_types3.default.bool,
      disableRestoreFocus: import_prop_types3.default.bool,
      getTabbable: import_prop_types3.default.func,
      isEnabled: import_prop_types3.default.func,
      open: import_prop_types3.default.bool.isRequired
    } : void 0;
    if (true) {
      TrapFocus["propTypes"] = exactProp(TrapFocus.propTypes);
    }
    TrapFocus_default = TrapFocus;
  }
});

// node_modules/@mui/base/TrapFocus/index.js
var init_TrapFocus2 = __esm({
  "node_modules/@mui/base/TrapFocus/index.js"() {
    init_TrapFocus();
  }
});

// node_modules/@mui/base/utils/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}
var isHostComponent_default;
var init_isHostComponent = __esm({
  "node_modules/@mui/base/utils/isHostComponent.js"() {
    isHostComponent_default = isHostComponent;
  }
});

// node_modules/@mui/base/utils/appendOwnerState.js
function appendOwnerState(elementType, otherProps = {}, ownerState) {
  if (isHostComponent_default(elementType)) {
    return otherProps;
  }
  return _extends({}, otherProps, {
    ownerState: _extends({}, otherProps.ownerState, ownerState)
  });
}
var init_appendOwnerState = __esm({
  "node_modules/@mui/base/utils/appendOwnerState.js"() {
    init_extends();
    init_isHostComponent();
  }
});

// node_modules/@mui/base/utils/areArraysEqual.js
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}
var init_areArraysEqual = __esm({
  "node_modules/@mui/base/utils/areArraysEqual.js"() {
  }
});

// node_modules/@mui/base/utils/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var init_extractEventHandlers = __esm({
  "node_modules/@mui/base/utils/extractEventHandlers.js"() {
  }
});

// node_modules/@mui/base/utils/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState);
  }
  return componentProps;
}
var init_resolveComponentProps = __esm({
  "node_modules/@mui/base/utils/resolveComponentProps.js"() {
  }
});

// node_modules/@mui/base/utils/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var init_omitEventHandlers = __esm({
  "node_modules/@mui/base/utils/omitEventHandlers.js"() {
  }
});

// node_modules/@mui/base/utils/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_m_default(externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className, className, additionalProps == null ? void 0 : additionalProps.className);
    const mergedStyle2 = _extends({}, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
    const props2 = _extends({}, additionalProps, externalForwardedProps, externalSlotProps);
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers(_extends({}, externalForwardedProps, externalSlotProps));
  const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_m_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = _extends({}, internalSlotProps == null ? void 0 : internalSlotProps.style, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
  const props = _extends({}, internalSlotProps, additionalProps, otherPropsWithoutEventHandlers, componentsPropsWithoutEventHandlers);
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}
var init_mergeSlotProps = __esm({
  "node_modules/@mui/base/utils/mergeSlotProps.js"() {
    init_extends();
    init_clsx_m();
    init_extractEventHandlers();
    init_omitEventHandlers();
  }
});

// node_modules/@mui/base/utils/useSlotProps.js
function useSlotProps(parameters) {
  var _parameters$additiona;
  const {
    elementType,
    externalSlotProps,
    ownerState
  } = parameters, rest = _objectWithoutPropertiesLoose(parameters, _excluded);
  const resolvedComponentsProps = resolveComponentProps(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps(_extends({}, rest, {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = useForkRef(internalRef, useForkRef(resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_parameters$additiona = parameters.additionalProps) == null ? void 0 : _parameters$additiona.ref));
  const props = appendOwnerState(elementType, _extends({}, mergedProps, {
    ref
  }), ownerState);
  return props;
}
var _excluded;
var init_useSlotProps = __esm({
  "node_modules/@mui/base/utils/useSlotProps.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    init_appendOwnerState();
    init_mergeSlotProps();
    init_resolveComponentProps();
    _excluded = ["elementType", "externalSlotProps", "ownerState"];
  }
});

// node_modules/@mui/base/utils/types.js
var init_types = __esm({
  "node_modules/@mui/base/utils/types.js"() {
  }
});

// node_modules/@mui/base/utils/index.js
var init_utils = __esm({
  "node_modules/@mui/base/utils/index.js"() {
    init_appendOwnerState();
    init_areArraysEqual();
    init_extractEventHandlers();
    init_isHostComponent();
    init_resolveComponentProps();
    init_useSlotProps();
    init_types();
  }
});

// node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js
function getContainer2(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty("in") : false;
}
var React5, import_prop_types4, import_jsx_runtime4, import_jsx_runtime5, _excluded2, useUtilityClasses, defaultManager, ModalUnstyled, ModalUnstyled_default;
var init_ModalUnstyled = __esm({
  "node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React5 = __toESM(require_react());
    import_prop_types4 = __toESM(require_prop_types());
    init_esm();
    init_composeClasses();
    init_Portal2();
    init_ModalManager();
    init_TrapFocus2();
    init_modalUnstyledClasses();
    init_utils();
    import_jsx_runtime4 = __toESM(require_jsx_runtime());
    import_jsx_runtime5 = __toESM(require_jsx_runtime());
    _excluded2 = ["children", "classes", "closeAfterTransition", "component", "components", "componentsProps", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "onTransitionEnter", "onTransitionExited"];
    useUtilityClasses = (ownerState) => {
      const {
        open,
        exited,
        classes
      } = ownerState;
      const slots = {
        root: ["root", !open && exited && "hidden"]
      };
      return composeClasses(slots, getModalUtilityClass, classes);
    };
    defaultManager = new ModalManager();
    ModalUnstyled = React5.forwardRef(function ModalUnstyled2(props, ref) {
      var _props$ariaHidden;
      const {
        children,
        classes: classesProp,
        closeAfterTransition = false,
        component = "div",
        components = {},
        componentsProps = {},
        container,
        disableAutoFocus = false,
        disableEnforceFocus = false,
        disableEscapeKeyDown = false,
        disablePortal = false,
        disableRestoreFocus = false,
        disableScrollLock = false,
        hideBackdrop = false,
        keepMounted = false,
        manager = defaultManager,
        onBackdropClick,
        onClose,
        onKeyDown,
        open,
        onTransitionEnter,
        onTransitionExited
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
      const [exited, setExited] = React5.useState(true);
      const modal = React5.useRef({});
      const mountNodeRef = React5.useRef(null);
      const modalRef = React5.useRef(null);
      const handleRef = useForkRef(modalRef, ref);
      const hasTransition = getHasTransition(props);
      const ariaHiddenProp = (_props$ariaHidden = props["aria-hidden"]) != null ? _props$ariaHidden : true;
      const getDoc = () => ownerDocument(mountNodeRef.current);
      const getModal = () => {
        modal.current.modalRef = modalRef.current;
        modal.current.mountNode = mountNodeRef.current;
        return modal.current;
      };
      const handleMounted = () => {
        manager.mount(getModal(), {
          disableScrollLock
        });
        modalRef.current.scrollTop = 0;
      };
      const handleOpen = useEventCallback(() => {
        const resolvedContainer = getContainer2(container) || getDoc().body;
        manager.add(getModal(), resolvedContainer);
        if (modalRef.current) {
          handleMounted();
        }
      });
      const isTopModal = React5.useCallback(() => manager.isTopModal(getModal()), [manager]);
      const handlePortalRef = useEventCallback((node2) => {
        mountNodeRef.current = node2;
        if (!node2) {
          return;
        }
        if (open && isTopModal()) {
          handleMounted();
        } else {
          ariaHidden(modalRef.current, ariaHiddenProp);
        }
      });
      const handleClose = React5.useCallback(() => {
        manager.remove(getModal(), ariaHiddenProp);
      }, [manager, ariaHiddenProp]);
      React5.useEffect(() => {
        return () => {
          handleClose();
        };
      }, [handleClose]);
      React5.useEffect(() => {
        if (open) {
          handleOpen();
        } else if (!hasTransition || !closeAfterTransition) {
          handleClose();
        }
      }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
      const ownerState = _extends({}, props, {
        classes: classesProp,
        closeAfterTransition,
        disableAutoFocus,
        disableEnforceFocus,
        disableEscapeKeyDown,
        disablePortal,
        disableRestoreFocus,
        disableScrollLock,
        exited,
        hideBackdrop,
        keepMounted
      });
      const classes = useUtilityClasses(ownerState);
      const handleEnter = () => {
        setExited(false);
        if (onTransitionEnter) {
          onTransitionEnter();
        }
      };
      const handleExited = () => {
        setExited(true);
        if (onTransitionExited) {
          onTransitionExited();
        }
        if (closeAfterTransition) {
          handleClose();
        }
      };
      const handleBackdropClick = (event) => {
        if (event.target !== event.currentTarget) {
          return;
        }
        if (onBackdropClick) {
          onBackdropClick(event);
        }
        if (onClose) {
          onClose(event, "backdropClick");
        }
      };
      const handleKeyDown2 = (event) => {
        if (onKeyDown) {
          onKeyDown(event);
        }
        if (event.key !== "Escape" || !isTopModal()) {
          return;
        }
        if (!disableEscapeKeyDown) {
          event.stopPropagation();
          if (onClose) {
            onClose(event, "escapeKeyDown");
          }
        }
      };
      const childProps = {};
      if (children.props.tabIndex === void 0) {
        childProps.tabIndex = "-1";
      }
      if (hasTransition) {
        childProps.onEnter = createChainedFunction(handleEnter, children.props.onEnter);
        childProps.onExited = createChainedFunction(handleExited, children.props.onExited);
      }
      const Root = components.Root || component;
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: handleRef,
          role: "presentation",
          onKeyDown: handleKeyDown2
        },
        className: classes.root,
        ownerState
      });
      const BackdropComponent = components.Backdrop;
      const backdropProps = useSlotProps({
        elementType: BackdropComponent,
        externalSlotProps: componentsProps.backdrop,
        additionalProps: {
          "aria-hidden": true,
          onClick: handleBackdropClick,
          open
        },
        ownerState
      });
      if (!keepMounted && !open && (!hasTransition || exited)) {
        return null;
      }
      return (0, import_jsx_runtime4.jsx)(Portal_default, {
        ref: handlePortalRef,
        container,
        disablePortal,
        children: (0, import_jsx_runtime5.jsxs)(Root, _extends({}, rootProps, {
          children: [!hideBackdrop && BackdropComponent ? (0, import_jsx_runtime4.jsx)(BackdropComponent, _extends({}, backdropProps)) : null, (0, import_jsx_runtime4.jsx)(TrapFocus_default, {
            disableEnforceFocus,
            disableAutoFocus,
            disableRestoreFocus,
            isEnabled: isTopModal,
            open,
            children: React5.cloneElement(children, childProps)
          })]
        }))
      });
    });
    true ? ModalUnstyled.propTypes = {
      children: elementAcceptingRef_default.isRequired,
      classes: import_prop_types4.default.object,
      closeAfterTransition: import_prop_types4.default.bool,
      component: import_prop_types4.default.elementType,
      components: import_prop_types4.default.shape({
        Backdrop: import_prop_types4.default.elementType,
        Root: import_prop_types4.default.elementType
      }),
      componentsProps: import_prop_types4.default.shape({
        backdrop: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object]),
        root: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object])
      }),
      container: import_prop_types4.default.oneOfType([HTMLElementType, import_prop_types4.default.func]),
      disableAutoFocus: import_prop_types4.default.bool,
      disableEnforceFocus: import_prop_types4.default.bool,
      disableEscapeKeyDown: import_prop_types4.default.bool,
      disablePortal: import_prop_types4.default.bool,
      disableRestoreFocus: import_prop_types4.default.bool,
      disableScrollLock: import_prop_types4.default.bool,
      hideBackdrop: import_prop_types4.default.bool,
      keepMounted: import_prop_types4.default.bool,
      onBackdropClick: import_prop_types4.default.func,
      onClose: import_prop_types4.default.func,
      onKeyDown: import_prop_types4.default.func,
      open: import_prop_types4.default.bool.isRequired
    } : void 0;
    ModalUnstyled_default = ModalUnstyled;
  }
});

// node_modules/@mui/base/ModalUnstyled/index.js
var init_ModalUnstyled2 = __esm({
  "node_modules/@mui/base/ModalUnstyled/index.js"() {
    init_ModalUnstyled();
    init_ModalManager();
    init_modalUnstyledClasses();
  }
});

// node_modules/@mui/base/NoSsr/NoSsr.js
function NoSsr(props) {
  const {
    children,
    defer = false,
    fallback = null
  } = props;
  const [mountedState, setMountedState] = React6.useState(false);
  useEnhancedEffect_default(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  React6.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);
  return (0, import_jsx_runtime6.jsx)(React6.Fragment, {
    children: mountedState ? children : fallback
  });
}
var React6, import_prop_types5, import_jsx_runtime6, NoSsr_default;
var init_NoSsr = __esm({
  "node_modules/@mui/base/NoSsr/NoSsr.js"() {
    React6 = __toESM(require_react());
    import_prop_types5 = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime6 = __toESM(require_jsx_runtime());
    true ? NoSsr.propTypes = {
      children: import_prop_types5.default.node,
      defer: import_prop_types5.default.bool,
      fallback: import_prop_types5.default.node
    } : void 0;
    if (true) {
      NoSsr["propTypes"] = exactProp(NoSsr.propTypes);
    }
    NoSsr_default = NoSsr;
  }
});

// node_modules/@mui/base/NoSsr/index.js
var init_NoSsr2 = __esm({
  "node_modules/@mui/base/NoSsr/index.js"() {
    init_NoSsr();
  }
});

// node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js
function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}
function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
var React7, import_prop_types6, import_react_dom, import_jsx_runtime7, import_jsx_runtime8, _excluded3, styles, TextareaAutosize, TextareaAutosize_default;
var init_TextareaAutosize = __esm({
  "node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React7 = __toESM(require_react());
    import_prop_types6 = __toESM(require_prop_types());
    import_react_dom = __toESM(require_react_dom());
    init_esm();
    import_jsx_runtime7 = __toESM(require_jsx_runtime());
    import_jsx_runtime8 = __toESM(require_jsx_runtime());
    _excluded3 = ["onChange", "maxRows", "minRows", "style", "value"];
    styles = {
      shadow: {
        visibility: "hidden",
        position: "absolute",
        overflow: "hidden",
        height: 0,
        top: 0,
        left: 0,
        transform: "translateZ(0)"
      }
    };
    TextareaAutosize = React7.forwardRef(function TextareaAutosize2(props, ref) {
      const {
        onChange,
        maxRows,
        minRows = 1,
        style: style3,
        value
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
      const {
        current: isControlled
      } = React7.useRef(value != null);
      const inputRef = React7.useRef(null);
      const handleRef = useForkRef(ref, inputRef);
      const shadowRef = React7.useRef(null);
      const renders = React7.useRef(0);
      const [state, setState] = React7.useState({});
      const getUpdatedState = React7.useCallback(() => {
        const input = inputRef.current;
        const containerWindow = ownerWindow(input);
        const computedStyle = containerWindow.getComputedStyle(input);
        if (computedStyle.width === "0px") {
          return {};
        }
        const inputShallow = shadowRef.current;
        inputShallow.style.width = computedStyle.width;
        inputShallow.value = input.value || props.placeholder || "x";
        if (inputShallow.value.slice(-1) === "\n") {
          inputShallow.value += " ";
        }
        const boxSizing2 = computedStyle["box-sizing"];
        const padding2 = getStyleValue(computedStyle, "padding-bottom") + getStyleValue(computedStyle, "padding-top");
        const border2 = getStyleValue(computedStyle, "border-bottom-width") + getStyleValue(computedStyle, "border-top-width");
        const innerHeight = inputShallow.scrollHeight;
        inputShallow.value = "x";
        const singleRowHeight = inputShallow.scrollHeight;
        let outerHeight = innerHeight;
        if (minRows) {
          outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
        }
        if (maxRows) {
          outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
        }
        outerHeight = Math.max(outerHeight, singleRowHeight);
        const outerHeightStyle = outerHeight + (boxSizing2 === "border-box" ? padding2 + border2 : 0);
        const overflow2 = Math.abs(outerHeight - innerHeight) <= 1;
        return {
          outerHeightStyle,
          overflow: overflow2
        };
      }, [maxRows, minRows, props.placeholder]);
      const updateState = (prevState, newState) => {
        const {
          outerHeightStyle,
          overflow: overflow2
        } = newState;
        if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow2)) {
          renders.current += 1;
          return {
            overflow: overflow2,
            outerHeightStyle
          };
        }
        if (true) {
          if (renders.current === 20) {
            console.error(["MUI: Too many re-renders. The layout is unstable.", "TextareaAutosize limits the number of renders to prevent an infinite loop."].join("\n"));
          }
        }
        return prevState;
      };
      const syncHeight = React7.useCallback(() => {
        const newState = getUpdatedState();
        if (isEmpty(newState)) {
          return;
        }
        setState((prevState) => {
          return updateState(prevState, newState);
        });
      }, [getUpdatedState]);
      const syncHeightWithFlushSycn = () => {
        const newState = getUpdatedState();
        if (isEmpty(newState)) {
          return;
        }
        (0, import_react_dom.flushSync)(() => {
          setState((prevState) => {
            return updateState(prevState, newState);
          });
        });
      };
      React7.useEffect(() => {
        const handleResize = debounce(() => {
          renders.current = 0;
          if (inputRef.current) {
            syncHeightWithFlushSycn();
          }
        });
        const containerWindow = ownerWindow(inputRef.current);
        containerWindow.addEventListener("resize", handleResize);
        let resizeObserver;
        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(handleResize);
          resizeObserver.observe(inputRef.current);
        }
        return () => {
          handleResize.clear();
          containerWindow.removeEventListener("resize", handleResize);
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
        };
      });
      useEnhancedEffect_default(() => {
        syncHeight();
      });
      React7.useEffect(() => {
        renders.current = 0;
      }, [value]);
      const handleChange = (event) => {
        renders.current = 0;
        if (!isControlled) {
          syncHeight();
        }
        if (onChange) {
          onChange(event);
        }
      };
      return (0, import_jsx_runtime8.jsxs)(React7.Fragment, {
        children: [(0, import_jsx_runtime7.jsx)("textarea", _extends({
          value,
          onChange: handleChange,
          ref: handleRef,
          rows: minRows,
          style: _extends({
            height: state.outerHeightStyle,
            overflow: state.overflow ? "hidden" : null
          }, style3)
        }, other)), (0, import_jsx_runtime7.jsx)("textarea", {
          "aria-hidden": true,
          className: props.className,
          readOnly: true,
          ref: shadowRef,
          tabIndex: -1,
          style: _extends({}, styles.shadow, style3, {
            padding: 0
          })
        })]
      });
    });
    true ? TextareaAutosize.propTypes = {
      className: import_prop_types6.default.string,
      maxRows: import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string]),
      minRows: import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string]),
      onChange: import_prop_types6.default.func,
      placeholder: import_prop_types6.default.string,
      style: import_prop_types6.default.object,
      value: import_prop_types6.default.oneOfType([import_prop_types6.default.arrayOf(import_prop_types6.default.string), import_prop_types6.default.number, import_prop_types6.default.string])
    } : void 0;
    TextareaAutosize_default = TextareaAutosize;
  }
});

// node_modules/@mui/base/TextareaAutosize/index.js
var init_TextareaAutosize2 = __esm({
  "node_modules/@mui/base/TextareaAutosize/index.js"() {
    init_TextareaAutosize();
  }
});

// node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet;
var init_emotion_sheet_browser_esm = __esm({
  "node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js"() {
    StyleSheet = function() {
      function StyleSheet2(options) {
        var _this = this;
        this._insertTag = function(tag) {
          var before;
          if (_this.tags.length === 0) {
            if (_this.insertionPoint) {
              before = _this.insertionPoint.nextSibling;
            } else if (_this.prepend) {
              before = _this.container.firstChild;
            } else {
              before = _this.before;
            }
          } else {
            before = _this.tags[_this.tags.length - 1].nextSibling;
          }
          _this.container.insertBefore(tag, before);
          _this.tags.push(tag);
        };
        this.isSpeedy = options.speedy === void 0 ? false : options.speedy;
        this.tags = [];
        this.ctr = 0;
        this.nonce = options.nonce;
        this.key = options.key;
        this.container = options.container;
        this.prepend = options.prepend;
        this.insertionPoint = options.insertionPoint;
        this.before = null;
      }
      var _proto = StyleSheet2.prototype;
      _proto.hydrate = function hydrate(nodes) {
        nodes.forEach(this._insertTag);
      };
      _proto.insert = function insert(rule) {
        if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
          this._insertTag(createStyleElement(this));
        }
        var tag = this.tags[this.tags.length - 1];
        if (true) {
          var isImportRule3 = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
          if (isImportRule3 && this._alreadyInsertedOrderInsensitiveRule) {
            console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
          }
          this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule3;
        }
        if (this.isSpeedy) {
          var sheet = sheetForTag(tag);
          try {
            sheet.insertRule(rule, sheet.cssRules.length);
          } catch (e) {
            if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
              console.error('There was a problem inserting the following rule: "' + rule + '"', e);
            }
          }
        } else {
          tag.appendChild(document.createTextNode(rule));
        }
        this.ctr++;
      };
      _proto.flush = function flush() {
        this.tags.forEach(function(tag) {
          return tag.parentNode && tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.ctr = 0;
        if (true) {
          this._alreadyInsertedOrderInsensitiveRule = false;
        }
      };
      return StyleSheet2;
    }();
  }
});

// node_modules/stylis/src/Enum.js
var MS, MOZ, WEBKIT, COMMENT, RULESET, DECLARATION, IMPORT, KEYFRAMES;
var init_Enum = __esm({
  "node_modules/stylis/src/Enum.js"() {
    MS = "-ms-";
    MOZ = "-moz-";
    WEBKIT = "-webkit-";
    COMMENT = "comm";
    RULESET = "rule";
    DECLARATION = "decl";
    IMPORT = "@import";
    KEYFRAMES = "@keyframes";
  }
});

// node_modules/stylis/src/Utility.js
function hash(value, length2) {
  return (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3);
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end2) {
  return value.slice(begin, end2);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var abs, from, assign;
var init_Utility = __esm({
  "node_modules/stylis/src/Utility.js"() {
    abs = Math.abs;
    from = String.fromCharCode;
    assign = Object.assign;
  }
});

// node_modules/stylis/src/Tokenizer.js
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end2) {
  return substr(characters, begin, end2);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
var line, column, length, position, character, characters;
var init_Tokenizer = __esm({
  "node_modules/stylis/src/Tokenizer.js"() {
    init_Utility();
    line = 1;
    column = 1;
    length = 0;
    position = 0;
    character = 0;
    characters = "";
  }
});

// node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset2 = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference2 = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && characters2.charCodeAt(length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset2:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference2 = ruleset(characters2, root, parent, index, offset2, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset2 === 0)
                parse(characters2, root, reference2, reference2, props, rulesets, length2, points, children);
              else
                switch (atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse(value, reference2, reference2, rule && append(ruleset(value, reference2, reference2, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference2, reference2, reference2, [""], children, 0, points, children);
                }
        }
        index = offset2 = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset2 > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset2 = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset2, rules, points, type, props, children, length2) {
  var post = offset2 - 1;
  var rule = offset2 === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset2 === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
var init_Parser = __esm({
  "node_modules/stylis/src/Parser.js"() {
    init_Enum();
    init_Utility();
    init_Tokenizer();
  }
});

// node_modules/stylis/src/Prefixer.js
function prefix(value, length2) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115)
        break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var init_Prefixer = __esm({
  "node_modules/stylis/src/Prefixer.js"() {
    init_Enum();
    init_Utility();
  }
});

// node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
var init_Serializer = __esm({
  "node_modules/stylis/src/Serializer.js"() {
    init_Enum();
    init_Utility();
  }
});

// node_modules/stylis/src/Middleware.js
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length);
          break;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })], callback);
                case "::placeholder":
                  return serialize([
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] })
                  ], callback);
              }
              return "";
            });
      }
  }
}
var init_Middleware = __esm({
  "node_modules/stylis/src/Middleware.js"() {
    init_Enum();
    init_Utility();
    init_Tokenizer();
    init_Serializer();
    init_Prefixer();
  }
});

// node_modules/stylis/index.js
var init_stylis = __esm({
  "node_modules/stylis/index.js"() {
    init_Enum();
    init_Utility();
    init_Parser();
    init_Prefixer();
    init_Tokenizer();
    init_Serializer();
    init_Middleware();
  }
});

// node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js
var weakMemoize, weak_memoize_browser_esm_default;
var init_weak_memoize_browser_esm = __esm({
  "node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js"() {
    weakMemoize = function weakMemoize2(func) {
      var cache2 = /* @__PURE__ */ new WeakMap();
      return function(arg) {
        if (cache2.has(arg)) {
          return cache2.get(arg);
        }
        var ret = func(arg);
        cache2.set(arg, ret);
        return ret;
      };
    };
    weak_memoize_browser_esm_default = weakMemoize;
  }
});

// node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js
function memoize(fn2) {
  var cache2 = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache2[arg] === void 0)
      cache2[arg] = fn2(arg);
    return cache2[arg];
  };
}
var emotion_memoize_browser_esm_default;
var init_emotion_memoize_browser_esm = __esm({
  "node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js"() {
    emotion_memoize_browser_esm_default = memoize;
  }
});

// node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var last, identifierWithPointTracking, toRules, getRules, fixedElements, compat, removeLabel, ignoreFlag, isIgnoringComment, createUnsafeSelectorsAlarm, isImportRule, isPrependedWithRegularRules, nullifyElement, incorrectImportAlarm, defaultStylisPlugins, createCache, emotion_cache_browser_esm_default;
var init_emotion_cache_browser_esm = __esm({
  "node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js"() {
    init_emotion_sheet_browser_esm();
    init_stylis();
    init_weak_memoize_browser_esm();
    init_emotion_memoize_browser_esm();
    last = function last2(arr) {
      return arr.length ? arr[arr.length - 1] : null;
    };
    identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
      var previous = 0;
      var character2 = 0;
      while (true) {
        previous = character2;
        character2 = peek();
        if (previous === 38 && character2 === 12) {
          points[index] = 1;
        }
        if (token(character2)) {
          break;
        }
        next();
      }
      return slice(begin, position);
    };
    toRules = function toRules2(parsed, points) {
      var index = -1;
      var character2 = 44;
      do {
        switch (token(character2)) {
          case 0:
            if (character2 === 38 && peek() === 12) {
              points[index] = 1;
            }
            parsed[index] += identifierWithPointTracking(position - 1, points, index);
            break;
          case 2:
            parsed[index] += delimit(character2);
            break;
          case 4:
            if (character2 === 44) {
              parsed[++index] = peek() === 58 ? "&\f" : "";
              points[index] = parsed[index].length;
              break;
            }
          default:
            parsed[index] += from(character2);
        }
      } while (character2 = next());
      return parsed;
    };
    getRules = function getRules2(value, points) {
      return dealloc(toRules(alloc(value), points));
    };
    fixedElements = /* @__PURE__ */ new WeakMap();
    compat = function compat2(element) {
      if (element.type !== "rule" || !element.parent || element.length < 1) {
        return;
      }
      var value = element.value, parent = element.parent;
      var isImplicitRule = element.column === parent.column && element.line === parent.line;
      while (parent.type !== "rule") {
        parent = parent.parent;
        if (!parent)
          return;
      }
      if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
        return;
      }
      if (isImplicitRule) {
        return;
      }
      fixedElements.set(element, true);
      var points = [];
      var rules = getRules(value, points);
      var parentRules = parent.props;
      for (var i = 0, k = 0; i < rules.length; i++) {
        for (var j = 0; j < parentRules.length; j++, k++) {
          element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
        }
      }
    };
    removeLabel = function removeLabel2(element) {
      if (element.type === "decl") {
        var value = element.value;
        if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
          element["return"] = "";
          element.value = "";
        }
      }
    };
    ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
    isIgnoringComment = function isIgnoringComment2(element) {
      return !!element && element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
    };
    createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache2) {
      return function(element, index, children) {
        if (element.type !== "rule")
          return;
        var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
        if (unsafePseudoClasses && cache2.compat !== true) {
          var prevElement = index > 0 ? children[index - 1] : null;
          if (prevElement && isIgnoringComment(last(prevElement.children))) {
            return;
          }
          unsafePseudoClasses.forEach(function(unsafePseudoClass) {
            console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
          });
        }
      };
    };
    isImportRule = function isImportRule2(element) {
      return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
    };
    isPrependedWithRegularRules = function isPrependedWithRegularRules2(index, children) {
      for (var i = index - 1; i >= 0; i--) {
        if (!isImportRule(children[i])) {
          return true;
        }
      }
      return false;
    };
    nullifyElement = function nullifyElement2(element) {
      element.type = "";
      element.value = "";
      element["return"] = "";
      element.children = "";
      element.props = "";
    };
    incorrectImportAlarm = function incorrectImportAlarm2(element, index, children) {
      if (!isImportRule(element)) {
        return;
      }
      if (element.parent) {
        console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
        nullifyElement(element);
      } else if (isPrependedWithRegularRules(index, children)) {
        console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
        nullifyElement(element);
      }
    };
    defaultStylisPlugins = [prefixer];
    createCache = function createCache2(options) {
      var key = options.key;
      if (!key) {
        throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
      }
      if (key === "css") {
        var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(ssrStyles, function(node2) {
          var dataEmotionAttribute = node2.getAttribute("data-emotion");
          if (dataEmotionAttribute.indexOf(" ") === -1) {
            return;
          }
          document.head.appendChild(node2);
          node2.setAttribute("data-s", "");
        });
      }
      var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
      if (true) {
        if (/[^a-z-]/.test(key)) {
          throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
        }
      }
      var inserted = {};
      var container;
      var nodesToHydrate = [];
      {
        container = options.container || document.head;
        Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key + ' "]'), function(node2) {
          var attrib = node2.getAttribute("data-emotion").split(" ");
          for (var i = 1; i < attrib.length; i++) {
            inserted[attrib[i]] = true;
          }
          nodesToHydrate.push(node2);
        });
      }
      var _insert;
      var omnipresentPlugins = [compat, removeLabel];
      if (true) {
        omnipresentPlugins.push(createUnsafeSelectorsAlarm({
          get compat() {
            return cache2.compat;
          }
        }), incorrectImportAlarm);
      }
      {
        var currentSheet;
        var finalizingPlugins = [stringify, true ? function(element) {
          if (!element.root) {
            if (element["return"]) {
              currentSheet.insert(element["return"]);
            } else if (element.value && element.type !== COMMENT) {
              currentSheet.insert(element.value + "{}");
            }
          }
        } : rulesheet(function(rule) {
          currentSheet.insert(rule);
        })];
        var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
        var stylis = function stylis2(styles2) {
          return serialize(compile(styles2), serializer);
        };
        _insert = function insert(selector, serialized, sheet, shouldCache) {
          currentSheet = sheet;
          if (serialized.map !== void 0) {
            currentSheet = {
              insert: function insert2(rule) {
                sheet.insert(rule + serialized.map);
              }
            };
          }
          stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
          if (shouldCache) {
            cache2.inserted[serialized.name] = true;
          }
        };
      }
      var cache2 = {
        key,
        sheet: new StyleSheet({
          key,
          container,
          nonce: options.nonce,
          speedy: options.speedy,
          prepend: options.prepend,
          insertionPoint: options.insertionPoint
        }),
        nonce: options.nonce,
        inserted,
        registered: {},
        insert: _insert
      };
      cache2.sheet.hydrate(nodesToHydrate);
      return cache2;
    };
    emotion_cache_browser_esm_default = createCache;
  }
});

// node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js
var import_hoist_non_react_statics;
var init_emotion_react_isolated_hnrs_browser_esm = __esm({
  "node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js"() {
    import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
  }
});

// node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var isBrowser, registerStyles, insertStyles;
var init_emotion_utils_browser_esm = __esm({
  "node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js"() {
    isBrowser = true;
    registerStyles = function registerStyles2(cache2, serialized, isStringTag) {
      var className = cache2.key + "-" + serialized.name;
      if ((isStringTag === false || isBrowser === false) && cache2.registered[className] === void 0) {
        cache2.registered[className] = serialized.styles;
      }
    };
    insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
      registerStyles(cache2, serialized, isStringTag);
      var className = cache2.key + "-" + serialized.name;
      if (cache2.inserted[serialized.name] === void 0) {
        var current = serialized;
        do {
          var maybeStyles = cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
          current = current.next;
        } while (current !== void 0);
      }
    };
  }
});

// node_modules/@emotion/hash/dist/hash.browser.esm.js
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= k >>> 24;
    h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var hash_browser_esm_default;
var init_hash_browser_esm = __esm({
  "node_modules/@emotion/hash/dist/hash.browser.esm.js"() {
    hash_browser_esm_default = murmur2;
  }
});

// node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var unitlessKeys, unitless_browser_esm_default;
var init_unitless_browser_esm = __esm({
  "node_modules/@emotion/unitless/dist/unitless.browser.esm.js"() {
    unitlessKeys = {
      animationIterationCount: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1
    };
    unitless_browser_esm_default = unitlessKeys;
  }
});

// node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    if (interpolation.toString() === "NO_COMPONENT_SELECTOR") {
      throw new Error(noComponentSelectorMessage);
    }
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next2 = interpolation.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles2 = interpolation.styles + ";";
        if (interpolation.map !== void 0) {
          styles2 += interpolation.map;
        }
        return styles2;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      } else if (true) {
        console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      }
      break;
    }
    case "string":
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function(match2, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
        }
      }
      break;
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && true) {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              if (_key === "undefined") {
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
              }
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var ILLEGAL_ESCAPE_SEQUENCE_ERROR, UNDEFINED_AS_OBJECT_KEY_ERROR, hyphenateRegex, animationRegex, isCustomProperty, isProcessableValue, processStyleName, processStyleValue, contentValuePattern, contentValues, oldProcessStyleValue, msPattern, hyphenPattern, hyphenatedCache, noComponentSelectorMessage, labelPattern, sourceMapPattern, cursor, serializeStyles;
var init_emotion_serialize_browser_esm = __esm({
  "node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js"() {
    init_hash_browser_esm();
    init_unitless_browser_esm();
    init_emotion_memoize_browser_esm();
    ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
    UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
    hyphenateRegex = /[A-Z]|^ms/g;
    animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
    isCustomProperty = function isCustomProperty2(property) {
      return property.charCodeAt(1) === 45;
    };
    isProcessableValue = function isProcessableValue2(value) {
      return value != null && typeof value !== "boolean";
    };
    processStyleName = emotion_memoize_browser_esm_default(function(styleName) {
      return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
    });
    processStyleValue = function processStyleValue2(key, value) {
      switch (key) {
        case "animation":
        case "animationName": {
          if (typeof value === "string") {
            return value.replace(animationRegex, function(match2, p1, p2) {
              cursor = {
                name: p1,
                styles: p2,
                next: cursor
              };
              return p1;
            });
          }
        }
      }
      if (unitless_browser_esm_default[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
        return value + "px";
      }
      return value;
    };
    if (true) {
      contentValuePattern = /(var|attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
      contentValues = ["normal", "none", "initial", "inherit", "unset"];
      oldProcessStyleValue = processStyleValue;
      msPattern = /^-ms-/;
      hyphenPattern = /-(.)/g;
      hyphenatedCache = {};
      processStyleValue = function processStyleValue3(key, value) {
        if (key === "content") {
          if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
            throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
          }
        }
        var processed = oldProcessStyleValue(key, value);
        if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
          hyphenatedCache[key] = true;
          console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
            return _char.toUpperCase();
          }) + "?");
        }
        return processed;
      };
    }
    noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
    labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
    if (true) {
      sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
    }
    serializeStyles = function serializeStyles2(args, registered, mergedProps) {
      if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
        return args[0];
      }
      var stringMode = true;
      var styles2 = "";
      cursor = void 0;
      var strings = args[0];
      if (strings == null || strings.raw === void 0) {
        stringMode = false;
        styles2 += handleInterpolation(mergedProps, registered, strings);
      } else {
        if (strings[0] === void 0) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles2 += strings[0];
      }
      for (var i = 1; i < args.length; i++) {
        styles2 += handleInterpolation(mergedProps, registered, args[i]);
        if (stringMode) {
          if (strings[i] === void 0) {
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
          }
          styles2 += strings[i];
        }
      }
      var sourceMap;
      if (true) {
        styles2 = styles2.replace(sourceMapPattern, function(match3) {
          sourceMap = match3;
          return "";
        });
      }
      labelPattern.lastIndex = 0;
      var identifierName = "";
      var match2;
      while ((match2 = labelPattern.exec(styles2)) !== null) {
        identifierName += "-" + match2[1];
      }
      var name = hash_browser_esm_default(styles2) + identifierName;
      if (true) {
        return {
          name,
          styles: styles2,
          map: sourceMap,
          next: cursor,
          toString: function toString() {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          }
        };
      }
      return {
        name,
        styles: styles2,
        next: cursor
      };
    };
  }
});

// node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js
function useInsertionEffectMaybe(create) {
  useInsertionEffect2(create);
}
var React8, import_react, hasOwnProperty, EmotionCacheContext, CacheProvider, withEmotionCache, ThemeContext, getTheme, createCacheWithTheme, useInsertionEffect2, typePropName, labelPropName, Insertion, Emotion;
var init_emotion_element_cbed451f_browser_esm = __esm({
  "node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js"() {
    React8 = __toESM(require_react());
    import_react = __toESM(require_react());
    init_emotion_cache_browser_esm();
    init_extends();
    init_weak_memoize_browser_esm();
    init_emotion_react_isolated_hnrs_browser_esm();
    init_emotion_utils_browser_esm();
    init_emotion_serialize_browser_esm();
    hasOwnProperty = {}.hasOwnProperty;
    EmotionCacheContext = (0, import_react.createContext)(typeof HTMLElement !== "undefined" ? emotion_cache_browser_esm_default({
      key: "css"
    }) : null);
    if (true) {
      EmotionCacheContext.displayName = "EmotionCacheContext";
    }
    CacheProvider = EmotionCacheContext.Provider;
    withEmotionCache = function withEmotionCache2(func) {
      return (0, import_react.forwardRef)(function(props, ref) {
        var cache2 = (0, import_react.useContext)(EmotionCacheContext);
        return func(props, cache2, ref);
      });
    };
    ThemeContext = (0, import_react.createContext)({});
    if (true) {
      ThemeContext.displayName = "EmotionThemeContext";
    }
    getTheme = function getTheme2(outerTheme, theme) {
      if (typeof theme === "function") {
        var mergedTheme = theme(outerTheme);
        if (mergedTheme == null || typeof mergedTheme !== "object" || Array.isArray(mergedTheme)) {
          throw new Error("[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!");
        }
        return mergedTheme;
      }
      if (theme == null || typeof theme !== "object" || Array.isArray(theme)) {
        throw new Error("[ThemeProvider] Please make your theme prop a plain object");
      }
      return _extends({}, outerTheme, theme);
    };
    createCacheWithTheme = weak_memoize_browser_esm_default(function(outerTheme) {
      return weak_memoize_browser_esm_default(function(theme) {
        return getTheme(outerTheme, theme);
      });
    });
    useInsertionEffect2 = React8["useInsertionEffect"] ? React8["useInsertionEffect"] : function useInsertionEffect3(create) {
      create();
    };
    typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
    labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
    Insertion = function Insertion2(_ref) {
      var cache2 = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
      registerStyles(cache2, serialized, isStringTag);
      var rules = useInsertionEffectMaybe(function() {
        return insertStyles(cache2, serialized, isStringTag);
      });
      return null;
    };
    Emotion = withEmotionCache(function(props, cache2, ref) {
      var cssProp = props.css;
      if (typeof cssProp === "string" && cache2.registered[cssProp] !== void 0) {
        cssProp = cache2.registered[cssProp];
      }
      var WrappedComponent = props[typePropName];
      var registeredStyles = [cssProp];
      var className = "";
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache2.registered, registeredStyles, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(registeredStyles, void 0, (0, import_react.useContext)(ThemeContext));
      if (serialized.name.indexOf("-") === -1) {
        var labelFromStack = props[labelPropName];
        if (labelFromStack) {
          serialized = serializeStyles([serialized, "label:" + labelFromStack + ";"]);
        }
      }
      className += cache2.key + "-" + serialized.name;
      var newProps = {};
      for (var key in props) {
        if (hasOwnProperty.call(props, key) && key !== "css" && key !== typePropName && key !== labelPropName) {
          newProps[key] = props[key];
        }
      }
      newProps.ref = ref;
      newProps.className = className;
      return (0, import_react.createElement)(import_react.Fragment, null, (0, import_react.createElement)(Insertion, {
        cache: cache2,
        serialized,
        isStringTag: typeof WrappedComponent === "string"
      }), (0, import_react.createElement)(WrappedComponent, newProps));
    });
    if (true) {
      Emotion.displayName = "EmotionCssPropInternal";
    }
  }
});

// node_modules/@emotion/react/dist/emotion-react.browser.esm.js
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
function merge(registered, css2, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css2(registeredStyles);
}
var React9, import_react2, import_hoist_non_react_statics2, pkg, useInsertionEffect5, warnedAboutCssPropForGlobal, Global, keyframes, classnames, Insertion3, ClassNames, isBrowser2, isJest, globalContext, globalKey;
var init_emotion_react_browser_esm = __esm({
  "node_modules/@emotion/react/dist/emotion-react.browser.esm.js"() {
    React9 = __toESM(require_react());
    import_react2 = __toESM(require_react());
    init_emotion_cache_browser_esm();
    init_emotion_element_cbed451f_browser_esm();
    init_emotion_element_cbed451f_browser_esm();
    init_extends();
    init_weak_memoize_browser_esm();
    import_hoist_non_react_statics2 = __toESM(require_hoist_non_react_statics_cjs());
    init_emotion_react_isolated_hnrs_browser_esm();
    init_emotion_utils_browser_esm();
    init_emotion_serialize_browser_esm();
    pkg = {
      name: "@emotion/react",
      version: "11.9.3",
      main: "dist/emotion-react.cjs.js",
      module: "dist/emotion-react.esm.js",
      browser: {
        "./dist/emotion-react.cjs.js": "./dist/emotion-react.browser.cjs.js",
        "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
      },
      types: "types/index.d.ts",
      files: [
        "src",
        "dist",
        "jsx-runtime",
        "jsx-dev-runtime",
        "_isolated-hnrs",
        "types/*.d.ts",
        "macro.js",
        "macro.d.ts",
        "macro.js.flow"
      ],
      sideEffects: false,
      author: "Emotion Contributors",
      license: "MIT",
      scripts: {
        "test:typescript": "dtslint types"
      },
      dependencies: {
        "@babel/runtime": "^7.13.10",
        "@emotion/babel-plugin": "^11.7.1",
        "@emotion/cache": "^11.9.3",
        "@emotion/serialize": "^1.0.4",
        "@emotion/utils": "^1.1.0",
        "@emotion/weak-memoize": "^0.2.5",
        "hoist-non-react-statics": "^3.3.1"
      },
      peerDependencies: {
        "@babel/core": "^7.0.0",
        react: ">=16.8.0"
      },
      peerDependenciesMeta: {
        "@babel/core": {
          optional: true
        },
        "@types/react": {
          optional: true
        }
      },
      devDependencies: {
        "@babel/core": "^7.13.10",
        "@definitelytyped/dtslint": "0.0.112",
        "@emotion/css": "11.9.0",
        "@emotion/css-prettifier": "1.0.1",
        "@emotion/server": "11.4.0",
        "@emotion/styled": "11.9.3",
        "html-tag-names": "^1.1.2",
        react: "16.14.0",
        "svg-tag-names": "^1.1.1",
        typescript: "^4.5.5"
      },
      repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
      publishConfig: {
        access: "public"
      },
      "umd:main": "dist/emotion-react.umd.min.js",
      preconstruct: {
        entrypoints: [
          "./index.js",
          "./jsx-runtime.js",
          "./jsx-dev-runtime.js",
          "./_isolated-hnrs.js"
        ],
        umdName: "emotionReact"
      }
    };
    useInsertionEffect5 = React9["useInsertionEffect"] ? React9["useInsertionEffect"] : import_react2.useLayoutEffect;
    warnedAboutCssPropForGlobal = false;
    Global = withEmotionCache(function(props, cache2) {
      if (!warnedAboutCssPropForGlobal && (props.className || props.css)) {
        console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
        warnedAboutCssPropForGlobal = true;
      }
      var styles2 = props.styles;
      var serialized = serializeStyles([styles2], void 0, (0, import_react2.useContext)(ThemeContext));
      var sheetRef = (0, import_react2.useRef)();
      useInsertionEffect5(function() {
        var key = cache2.key + "-global";
        var sheet = new cache2.sheet.constructor({
          key,
          nonce: cache2.sheet.nonce,
          container: cache2.sheet.container,
          speedy: cache2.sheet.isSpeedy
        });
        var rehydrating = false;
        var node2 = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
        if (cache2.sheet.tags.length) {
          sheet.before = cache2.sheet.tags[0];
        }
        if (node2 !== null) {
          rehydrating = true;
          node2.setAttribute("data-emotion", key);
          sheet.hydrate([node2]);
        }
        sheetRef.current = [sheet, rehydrating];
        return function() {
          sheet.flush();
        };
      }, [cache2]);
      useInsertionEffect5(function() {
        var sheetRefCurrent = sheetRef.current;
        var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
        if (rehydrating) {
          sheetRefCurrent[1] = false;
          return;
        }
        if (serialized.next !== void 0) {
          insertStyles(cache2, serialized.next, true);
        }
        if (sheet.tags.length) {
          var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
          sheet.before = element;
          sheet.flush();
        }
        cache2.insert("", serialized, sheet, false);
      }, [cache2, serialized.name]);
      return null;
    });
    if (true) {
      Global.displayName = "EmotionGlobal";
    }
    keyframes = function keyframes2() {
      var insertable = css.apply(void 0, arguments);
      var name = "animation-" + insertable.name;
      return {
        name,
        styles: "@keyframes " + name + "{" + insertable.styles + "}",
        anim: 1,
        toString: function toString() {
          return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
        }
      };
    };
    classnames = function classnames2(args) {
      var len = args.length;
      var i = 0;
      var cls = "";
      for (; i < len; i++) {
        var arg = args[i];
        if (arg == null)
          continue;
        var toAdd = void 0;
        switch (typeof arg) {
          case "boolean":
            break;
          case "object": {
            if (Array.isArray(arg)) {
              toAdd = classnames2(arg);
            } else {
              if (arg.styles !== void 0 && arg.name !== void 0) {
                console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.");
              }
              toAdd = "";
              for (var k in arg) {
                if (arg[k] && k) {
                  toAdd && (toAdd += " ");
                  toAdd += k;
                }
              }
            }
            break;
          }
          default: {
            toAdd = arg;
          }
        }
        if (toAdd) {
          cls && (cls += " ");
          cls += toAdd;
        }
      }
      return cls;
    };
    Insertion3 = function Insertion4(_ref) {
      var cache2 = _ref.cache, serializedArr = _ref.serializedArr;
      var rules = useInsertionEffectMaybe(function() {
        for (var i = 0; i < serializedArr.length; i++) {
          var res = insertStyles(cache2, serializedArr[i], false);
        }
      });
      return null;
    };
    ClassNames = withEmotionCache(function(props, cache2) {
      var hasRendered = false;
      var serializedArr = [];
      var css2 = function css3() {
        if (hasRendered && true) {
          throw new Error("css can only be used during render");
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var serialized = serializeStyles(args, cache2.registered);
        serializedArr.push(serialized);
        registerStyles(cache2, serialized, false);
        return cache2.key + "-" + serialized.name;
      };
      var cx = function cx2() {
        if (hasRendered && true) {
          throw new Error("cx can only be used during render");
        }
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return merge(cache2.registered, css2, classnames(args));
      };
      var content = {
        css: css2,
        cx,
        theme: (0, import_react2.useContext)(ThemeContext)
      };
      var ele = props.children(content);
      hasRendered = true;
      return (0, import_react2.createElement)(import_react2.Fragment, null, (0, import_react2.createElement)(Insertion3, {
        cache: cache2,
        serializedArr
      }), ele);
    });
    if (true) {
      ClassNames.displayName = "EmotionClassNames";
    }
    if (true) {
      isBrowser2 = true;
      isJest = typeof jest !== "undefined";
      if (isBrowser2 && !isJest) {
        globalContext = typeof globalThis !== "undefined" ? globalThis : isBrowser2 ? window : global;
        globalKey = "__EMOTION_REACT_" + pkg.version.split(".")[0] + "__";
        if (globalContext[globalKey]) {
          console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.");
        }
        globalContext[globalKey] = true;
      }
    }
  }
});

// node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js
function StyledEngineProvider(props) {
  const {
    injectFirst,
    children
  } = props;
  return injectFirst ? (0, import_jsx_runtime9.jsx)(CacheProvider, {
    value: cache,
    children
  }) : children;
}
var React10, import_prop_types7, import_jsx_runtime9, cache;
var init_StyledEngineProvider = __esm({
  "node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js"() {
    React10 = __toESM(require_react());
    import_prop_types7 = __toESM(require_prop_types());
    init_emotion_react_browser_esm();
    init_emotion_cache_browser_esm();
    import_jsx_runtime9 = __toESM(require_jsx_runtime());
    cache = emotion_cache_browser_esm_default({
      key: "css",
      prepend: true
    });
    true ? StyledEngineProvider.propTypes = {
      children: import_prop_types7.default.node,
      injectFirst: import_prop_types7.default.bool
    } : void 0;
  }
});

// node_modules/@mui/styled-engine/StyledEngineProvider/index.js
var init_StyledEngineProvider2 = __esm({
  "node_modules/@mui/styled-engine/StyledEngineProvider/index.js"() {
    init_StyledEngineProvider();
  }
});

// node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js
var reactPropsRegex, isPropValid, emotion_is_prop_valid_browser_esm_default;
var init_emotion_is_prop_valid_browser_esm = __esm({
  "node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js"() {
    init_emotion_memoize_browser_esm();
    reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    isPropValid = emotion_memoize_browser_esm_default(function(prop) {
      return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
    });
    emotion_is_prop_valid_browser_esm_default = isPropValid;
  }
});

// node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js
function useInsertionEffectMaybe2(create) {
  useInsertionEffect7(create);
}
var React11, import_react4, testOmitPropsOnStringTag, testOmitPropsOnComponent, getDefaultShouldForwardProp, composeShouldForwardProps, useInsertionEffect7, ILLEGAL_ESCAPE_SEQUENCE_ERROR2, Insertion5, createStyled, emotion_styled_base_browser_esm_default;
var init_emotion_styled_base_browser_esm = __esm({
  "node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"() {
    init_extends();
    React11 = __toESM(require_react());
    import_react4 = __toESM(require_react());
    init_emotion_is_prop_valid_browser_esm();
    init_emotion_react_browser_esm();
    init_emotion_utils_browser_esm();
    init_emotion_serialize_browser_esm();
    testOmitPropsOnStringTag = emotion_is_prop_valid_browser_esm_default;
    testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
      return key !== "theme";
    };
    getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
      return typeof tag === "string" && tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
    };
    composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
      var shouldForwardProp2;
      if (options) {
        var optionsShouldForwardProp = options.shouldForwardProp;
        shouldForwardProp2 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
          return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
        } : optionsShouldForwardProp;
      }
      if (typeof shouldForwardProp2 !== "function" && isReal) {
        shouldForwardProp2 = tag.__emotion_forwardProp;
      }
      return shouldForwardProp2;
    };
    useInsertionEffect7 = React11["useInsertionEffect"] ? React11["useInsertionEffect"] : function useInsertionEffect8(create) {
      create();
    };
    ILLEGAL_ESCAPE_SEQUENCE_ERROR2 = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
    Insertion5 = function Insertion6(_ref) {
      var cache2 = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
      registerStyles(cache2, serialized, isStringTag);
      var rules = useInsertionEffectMaybe2(function() {
        return insertStyles(cache2, serialized, isStringTag);
      });
      return null;
    };
    createStyled = function createStyled2(tag, options) {
      if (true) {
        if (tag === void 0) {
          throw new Error("You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.");
        }
      }
      var isReal = tag.__emotion_real === tag;
      var baseTag = isReal && tag.__emotion_base || tag;
      var identifierName;
      var targetClassName;
      if (options !== void 0) {
        identifierName = options.label;
        targetClassName = options.target;
      }
      var shouldForwardProp2 = composeShouldForwardProps(tag, options, isReal);
      var defaultShouldForwardProp = shouldForwardProp2 || getDefaultShouldForwardProp(baseTag);
      var shouldUseAs = !defaultShouldForwardProp("as");
      return function() {
        var args = arguments;
        var styles2 = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
        if (identifierName !== void 0) {
          styles2.push("label:" + identifierName + ";");
        }
        if (args[0] == null || args[0].raw === void 0) {
          styles2.push.apply(styles2, args);
        } else {
          if (args[0][0] === void 0) {
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR2);
          }
          styles2.push(args[0][0]);
          var len = args.length;
          var i = 1;
          for (; i < len; i++) {
            if (args[0][i] === void 0) {
              console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR2);
            }
            styles2.push(args[i], args[0][i]);
          }
        }
        var Styled = withEmotionCache(function(props, cache2, ref) {
          var FinalTag = shouldUseAs && props.as || baseTag;
          var className = "";
          var classInterpolations = [];
          var mergedProps = props;
          if (props.theme == null) {
            mergedProps = {};
            for (var key in props) {
              mergedProps[key] = props[key];
            }
            mergedProps.theme = (0, import_react4.useContext)(ThemeContext);
          }
          if (typeof props.className === "string") {
            className = getRegisteredStyles(cache2.registered, classInterpolations, props.className);
          } else if (props.className != null) {
            className = props.className + " ";
          }
          var serialized = serializeStyles(styles2.concat(classInterpolations), cache2.registered, mergedProps);
          className += cache2.key + "-" + serialized.name;
          if (targetClassName !== void 0) {
            className += " " + targetClassName;
          }
          var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
          var newProps = {};
          for (var _key in props) {
            if (shouldUseAs && _key === "as")
              continue;
            if (finalShouldForwardProp(_key)) {
              newProps[_key] = props[_key];
            }
          }
          newProps.className = className;
          newProps.ref = ref;
          return (0, import_react4.createElement)(import_react4.Fragment, null, (0, import_react4.createElement)(Insertion5, {
            cache: cache2,
            serialized,
            isStringTag: typeof FinalTag === "string"
          }), (0, import_react4.createElement)(FinalTag, newProps));
        });
        Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
        Styled.defaultProps = tag.defaultProps;
        Styled.__emotion_real = Styled;
        Styled.__emotion_base = baseTag;
        Styled.__emotion_styles = styles2;
        Styled.__emotion_forwardProp = shouldForwardProp2;
        Object.defineProperty(Styled, "toString", {
          value: function value() {
            if (targetClassName === void 0 && true) {
              return "NO_COMPONENT_SELECTOR";
            }
            return "." + targetClassName;
          }
        });
        Styled.withComponent = function(nextTag, nextOptions) {
          return createStyled2(nextTag, _extends({}, options, nextOptions, {
            shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
          })).apply(void 0, styles2);
        };
        return Styled;
      };
    };
    emotion_styled_base_browser_esm_default = createStyled;
  }
});

// node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js
var import_react6, tags, newStyled, emotion_styled_browser_esm_default;
var init_emotion_styled_browser_esm = __esm({
  "node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"() {
    init_extends();
    import_react6 = __toESM(require_react());
    init_emotion_is_prop_valid_browser_esm();
    init_emotion_styled_base_browser_esm();
    init_emotion_react_browser_esm();
    init_emotion_utils_browser_esm();
    init_emotion_serialize_browser_esm();
    tags = [
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "big",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "legend",
      "li",
      "link",
      "main",
      "map",
      "mark",
      "marquee",
      "menu",
      "menuitem",
      "meta",
      "meter",
      "nav",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "picture",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      "track",
      "u",
      "ul",
      "var",
      "video",
      "wbr",
      "circle",
      "clipPath",
      "defs",
      "ellipse",
      "foreignObject",
      "g",
      "image",
      "line",
      "linearGradient",
      "mask",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialGradient",
      "rect",
      "stop",
      "svg",
      "text",
      "tspan"
    ];
    newStyled = emotion_styled_base_browser_esm_default.bind();
    tags.forEach(function(tagName) {
      newStyled[tagName] = newStyled(tagName);
    });
    emotion_styled_browser_esm_default = newStyled;
  }
});

// node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js
function isEmpty2(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
function GlobalStyles(props) {
  const {
    styles: styles2,
    defaultTheme: defaultTheme4 = {}
  } = props;
  const globalStyles = typeof styles2 === "function" ? (themeInput) => styles2(isEmpty2(themeInput) ? defaultTheme4 : themeInput) : styles2;
  return (0, import_jsx_runtime10.jsx)(Global, {
    styles: globalStyles
  });
}
var React12, import_prop_types8, import_jsx_runtime10;
var init_GlobalStyles = __esm({
  "node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js"() {
    React12 = __toESM(require_react());
    import_prop_types8 = __toESM(require_prop_types());
    init_emotion_react_browser_esm();
    import_jsx_runtime10 = __toESM(require_jsx_runtime());
    true ? GlobalStyles.propTypes = {
      defaultTheme: import_prop_types8.default.object,
      styles: import_prop_types8.default.oneOfType([import_prop_types8.default.string, import_prop_types8.default.object, import_prop_types8.default.func])
    } : void 0;
  }
});

// node_modules/@mui/styled-engine/GlobalStyles/index.js
var init_GlobalStyles2 = __esm({
  "node_modules/@mui/styled-engine/GlobalStyles/index.js"() {
    init_GlobalStyles();
  }
});

// node_modules/@mui/styled-engine/index.js
function styled(tag, options) {
  const stylesFactory = emotion_styled_browser_esm_default(tag, options);
  if (true) {
    return (...styles2) => {
      const component = typeof tag === "string" ? `"${tag}"` : "component";
      if (styles2.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n"));
      } else if (styles2.some((style3) => style3 === void 0)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles2);
    };
  }
  return stylesFactory;
}
var init_styled_engine = __esm({
  "node_modules/@mui/styled-engine/index.js"() {
    init_emotion_styled_browser_esm();
    init_emotion_react_browser_esm();
    init_StyledEngineProvider2();
    init_GlobalStyles2();
  }
});

// node_modules/@mui/system/esm/merge.js
function merge2(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
  });
}
var merge_default;
var init_merge = __esm({
  "node_modules/@mui/system/esm/merge.js"() {
    init_esm();
    merge_default = merge2;
  }
});

// node_modules/@mui/system/esm/responsivePropType.js
var import_prop_types9, responsivePropType, responsivePropType_default;
var init_responsivePropType = __esm({
  "node_modules/@mui/system/esm/responsivePropType.js"() {
    import_prop_types9 = __toESM(require_prop_types());
    responsivePropType = true ? import_prop_types9.default.oneOfType([import_prop_types9.default.number, import_prop_types9.default.string, import_prop_types9.default.object, import_prop_types9.default.array]) : {};
    responsivePropType_default = responsivePropType;
  }
});

// node_modules/@mui/system/esm/breakpoints.js
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;
  const breakpointsInOrder = (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style3) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style3);
}
function computeBreakpointsBase(breakpointValues, themeBreakpoints) {
  if (typeof breakpointValues !== "object") {
    return {};
  }
  const base = {};
  const breakpointsKeys = Object.keys(themeBreakpoints);
  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach((breakpoint, i) => {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach((breakpoint) => {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
}
function resolveBreakpointValues({
  values: breakpointValues,
  breakpoints: themeBreakpoints,
  base: customBase
}) {
  const base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
  const keys = Object.keys(base);
  if (keys.length === 0) {
    return breakpointValues;
  }
  let previous;
  return keys.reduce((acc, breakpoint, i) => {
    if (Array.isArray(breakpointValues)) {
      acc[breakpoint] = breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
      previous = i;
    } else if (typeof breakpointValues === "object") {
      acc[breakpoint] = breakpointValues[breakpoint] != null ? breakpointValues[breakpoint] : breakpointValues[previous];
      previous = breakpoint;
    } else {
      acc[breakpoint] = breakpointValues;
    }
    return acc;
  }, {});
}
var import_prop_types10, values, defaultBreakpoints;
var init_breakpoints = __esm({
  "node_modules/@mui/system/esm/breakpoints.js"() {
    init_extends();
    import_prop_types10 = __toESM(require_prop_types());
    init_esm();
    init_merge();
    values = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    };
    defaultBreakpoints = {
      keys: ["xs", "sm", "md", "lg", "xl"],
      up: (key) => `@media (min-width:${values[key]}px)`
    };
  }
});

// node_modules/@mui/system/esm/style.js
function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== "string") {
    return null;
  }
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split(".").reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
function getValue(themeMapping, transform2, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform2) {
    value = transform2(value);
  }
  return value;
}
function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform: transform2
  } = options;
  const fn2 = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getValue(themeMapping, transform2, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getValue(themeMapping, transform2, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn2.propTypes = true ? {
    [prop]: responsivePropType_default
  } : {};
  fn2.filterProps = [prop];
  return fn2;
}
var style_default;
var init_style = __esm({
  "node_modules/@mui/system/esm/style.js"() {
    init_esm();
    init_responsivePropType();
    init_breakpoints();
    style_default = style;
  }
});

// node_modules/@mui/system/esm/compose.js
function compose(...styles2) {
  const handlers = styles2.reduce((acc, style3) => {
    style3.filterProps.forEach((prop) => {
      acc[prop] = style3;
    });
    return acc;
  }, {});
  const fn2 = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge_default(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn2.propTypes = true ? styles2.reduce((acc, style3) => Object.assign(acc, style3.propTypes), {}) : {};
  fn2.filterProps = styles2.reduce((acc, style3) => acc.concat(style3.filterProps), []);
  return fn2;
}
var compose_default;
var init_compose = __esm({
  "node_modules/@mui/system/esm/compose.js"() {
    init_merge();
    compose_default = compose;
  }
});

// node_modules/@mui/system/esm/memoize.js
function memoize2(fn2) {
  const cache2 = {};
  return (arg) => {
    if (cache2[arg] === void 0) {
      cache2[arg] = fn2(arg);
    }
    return cache2[arg];
  };
}
var init_memoize = __esm({
  "node_modules/@mui/system/esm/memoize.js"() {
  }
});

// node_modules/@mui/system/esm/spacing.js
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _getPath;
  const themeSpacing = (_getPath = getPath(theme, themeKey, false)) != null ? _getPath : defaultValue;
  if (typeof themeSpacing === "number") {
    return (abs2) => {
      if (typeof abs2 === "string") {
        return abs2;
      }
      if (true) {
        if (typeof abs2 !== "number") {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs2}.`);
        }
      }
      return themeSpacing * abs2;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (abs2) => {
      if (typeof abs2 === "string") {
        return abs2;
      }
      if (true) {
        if (!Number.isInteger(abs2)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs2 > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs2}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs2} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      return themeSpacing[abs2];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (true) {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
  }
  return () => void 0;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8, "spacing");
}
function getValue2(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  const abs2 = Math.abs(propValue);
  const transformed = transformer(abs2);
  if (propValue >= 0) {
    return transformed;
  }
  if (typeof transformed === "number") {
    return -transformed;
  }
  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue2(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  if (keys.indexOf(prop) === -1) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style2(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge_default, {});
}
function margin(props) {
  return style2(props, marginKeys);
}
function padding(props) {
  return style2(props, paddingKeys);
}
function spacing(props) {
  return style2(props, spacingKeys);
}
var properties, directions, aliases, getCssProperties, marginKeys, paddingKeys, spacingKeys, spacing_default;
var init_spacing = __esm({
  "node_modules/@mui/system/esm/spacing.js"() {
    init_responsivePropType();
    init_breakpoints();
    init_style();
    init_merge();
    init_memoize();
    properties = {
      m: "margin",
      p: "padding"
    };
    directions = {
      t: "Top",
      r: "Right",
      b: "Bottom",
      l: "Left",
      x: ["Left", "Right"],
      y: ["Top", "Bottom"]
    };
    aliases = {
      marginX: "mx",
      marginY: "my",
      paddingX: "px",
      paddingY: "py"
    };
    getCssProperties = memoize2((prop) => {
      if (prop.length > 2) {
        if (aliases[prop]) {
          prop = aliases[prop];
        } else {
          return [prop];
        }
      }
      const [a, b] = prop.split("");
      const property = properties[a];
      const direction = directions[b] || "";
      return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
    });
    marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
    paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
    spacingKeys = [...marginKeys, ...paddingKeys];
    margin.propTypes = true ? marginKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    margin.filterProps = marginKeys;
    padding.propTypes = true ? paddingKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    padding.filterProps = paddingKeys;
    spacing.propTypes = true ? spacingKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    spacing.filterProps = spacingKeys;
    spacing_default = spacing;
  }
});

// node_modules/@mui/system/esm/borders.js
function getBorder(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
var border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, borders, borders_default;
var init_borders = __esm({
  "node_modules/@mui/system/esm/borders.js"() {
    init_responsivePropType();
    init_style();
    init_compose();
    init_spacing();
    init_breakpoints();
    border = style_default({
      prop: "border",
      themeKey: "borders",
      transform: getBorder
    });
    borderTop = style_default({
      prop: "borderTop",
      themeKey: "borders",
      transform: getBorder
    });
    borderRight = style_default({
      prop: "borderRight",
      themeKey: "borders",
      transform: getBorder
    });
    borderBottom = style_default({
      prop: "borderBottom",
      themeKey: "borders",
      transform: getBorder
    });
    borderLeft = style_default({
      prop: "borderLeft",
      themeKey: "borders",
      transform: getBorder
    });
    borderColor = style_default({
      prop: "borderColor",
      themeKey: "palette"
    });
    borderTopColor = style_default({
      prop: "borderTopColor",
      themeKey: "palette"
    });
    borderRightColor = style_default({
      prop: "borderRightColor",
      themeKey: "palette"
    });
    borderBottomColor = style_default({
      prop: "borderBottomColor",
      themeKey: "palette"
    });
    borderLeftColor = style_default({
      prop: "borderLeftColor",
      themeKey: "palette"
    });
    borderRadius = (props) => {
      if (props.borderRadius !== void 0 && props.borderRadius !== null) {
        const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
        const styleFromPropValue = (propValue) => ({
          borderRadius: getValue2(transformer, propValue)
        });
        return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
      }
      return null;
    };
    borderRadius.propTypes = true ? {
      borderRadius: responsivePropType_default
    } : {};
    borderRadius.filterProps = ["borderRadius"];
    borders = compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius);
    borders_default = borders;
  }
});

// node_modules/@mui/system/esm/display.js
var displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace, display_default;
var init_display = __esm({
  "node_modules/@mui/system/esm/display.js"() {
    init_style();
    init_compose();
    displayPrint = style_default({
      prop: "displayPrint",
      cssProperty: false,
      transform: (value) => ({
        "@media print": {
          display: value
        }
      })
    });
    displayRaw = style_default({
      prop: "display"
    });
    overflow = style_default({
      prop: "overflow"
    });
    textOverflow = style_default({
      prop: "textOverflow"
    });
    visibility = style_default({
      prop: "visibility"
    });
    whiteSpace = style_default({
      prop: "whiteSpace"
    });
    display_default = compose_default(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);
  }
});

// node_modules/@mui/system/esm/flexbox.js
var flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf, flexbox, flexbox_default;
var init_flexbox = __esm({
  "node_modules/@mui/system/esm/flexbox.js"() {
    init_style();
    init_compose();
    flexBasis = style_default({
      prop: "flexBasis"
    });
    flexDirection = style_default({
      prop: "flexDirection"
    });
    flexWrap = style_default({
      prop: "flexWrap"
    });
    justifyContent = style_default({
      prop: "justifyContent"
    });
    alignItems = style_default({
      prop: "alignItems"
    });
    alignContent = style_default({
      prop: "alignContent"
    });
    order = style_default({
      prop: "order"
    });
    flex = style_default({
      prop: "flex"
    });
    flexGrow = style_default({
      prop: "flexGrow"
    });
    flexShrink = style_default({
      prop: "flexShrink"
    });
    alignSelf = style_default({
      prop: "alignSelf"
    });
    justifyItems = style_default({
      prop: "justifyItems"
    });
    justifySelf = style_default({
      prop: "justifySelf"
    });
    flexbox = compose_default(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
    flexbox_default = flexbox;
  }
});

// node_modules/@mui/system/esm/cssGrid.js
var gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea, grid, cssGrid_default;
var init_cssGrid = __esm({
  "node_modules/@mui/system/esm/cssGrid.js"() {
    init_style();
    init_compose();
    init_spacing();
    init_breakpoints();
    init_responsivePropType();
    gap = (props) => {
      if (props.gap !== void 0 && props.gap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "gap");
        const styleFromPropValue = (propValue) => ({
          gap: getValue2(transformer, propValue)
        });
        return handleBreakpoints(props, props.gap, styleFromPropValue);
      }
      return null;
    };
    gap.propTypes = true ? {
      gap: responsivePropType_default
    } : {};
    gap.filterProps = ["gap"];
    columnGap = (props) => {
      if (props.columnGap !== void 0 && props.columnGap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap");
        const styleFromPropValue = (propValue) => ({
          columnGap: getValue2(transformer, propValue)
        });
        return handleBreakpoints(props, props.columnGap, styleFromPropValue);
      }
      return null;
    };
    columnGap.propTypes = true ? {
      columnGap: responsivePropType_default
    } : {};
    columnGap.filterProps = ["columnGap"];
    rowGap = (props) => {
      if (props.rowGap !== void 0 && props.rowGap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap");
        const styleFromPropValue = (propValue) => ({
          rowGap: getValue2(transformer, propValue)
        });
        return handleBreakpoints(props, props.rowGap, styleFromPropValue);
      }
      return null;
    };
    rowGap.propTypes = true ? {
      rowGap: responsivePropType_default
    } : {};
    rowGap.filterProps = ["rowGap"];
    gridColumn = style_default({
      prop: "gridColumn"
    });
    gridRow = style_default({
      prop: "gridRow"
    });
    gridAutoFlow = style_default({
      prop: "gridAutoFlow"
    });
    gridAutoColumns = style_default({
      prop: "gridAutoColumns"
    });
    gridAutoRows = style_default({
      prop: "gridAutoRows"
    });
    gridTemplateColumns = style_default({
      prop: "gridTemplateColumns"
    });
    gridTemplateRows = style_default({
      prop: "gridTemplateRows"
    });
    gridTemplateAreas = style_default({
      prop: "gridTemplateAreas"
    });
    gridArea = style_default({
      prop: "gridArea"
    });
    grid = compose_default(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
    cssGrid_default = grid;
  }
});

// node_modules/@mui/system/esm/positions.js
var position2, zIndex, top, right, bottom, left, positions_default;
var init_positions = __esm({
  "node_modules/@mui/system/esm/positions.js"() {
    init_style();
    init_compose();
    position2 = style_default({
      prop: "position"
    });
    zIndex = style_default({
      prop: "zIndex",
      themeKey: "zIndex"
    });
    top = style_default({
      prop: "top"
    });
    right = style_default({
      prop: "right"
    });
    bottom = style_default({
      prop: "bottom"
    });
    left = style_default({
      prop: "left"
    });
    positions_default = compose_default(position2, zIndex, top, right, bottom, left);
  }
});

// node_modules/@mui/system/esm/palette.js
var color, bgcolor, backgroundColor, palette, palette_default;
var init_palette = __esm({
  "node_modules/@mui/system/esm/palette.js"() {
    init_style();
    init_compose();
    color = style_default({
      prop: "color",
      themeKey: "palette"
    });
    bgcolor = style_default({
      prop: "bgcolor",
      cssProperty: "backgroundColor",
      themeKey: "palette"
    });
    backgroundColor = style_default({
      prop: "backgroundColor",
      themeKey: "palette"
    });
    palette = compose_default(color, bgcolor, backgroundColor);
    palette_default = palette;
  }
});

// node_modules/@mui/system/esm/shadows.js
var boxShadow, shadows_default;
var init_shadows = __esm({
  "node_modules/@mui/system/esm/shadows.js"() {
    init_style();
    boxShadow = style_default({
      prop: "boxShadow",
      themeKey: "shadows"
    });
    shadows_default = boxShadow;
  }
});

// node_modules/@mui/system/esm/sizing.js
function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
var width, maxWidth, minWidth, height, maxHeight, minHeight, sizeWidth, sizeHeight, boxSizing, sizing, sizing_default;
var init_sizing = __esm({
  "node_modules/@mui/system/esm/sizing.js"() {
    init_style();
    init_compose();
    init_breakpoints();
    width = style_default({
      prop: "width",
      transform
    });
    maxWidth = (props) => {
      if (props.maxWidth !== void 0 && props.maxWidth !== null) {
        const styleFromPropValue = (propValue) => {
          var _props$theme, _props$theme$breakpoi, _props$theme$breakpoi2;
          const breakpoint = ((_props$theme = props.theme) == null ? void 0 : (_props$theme$breakpoi = _props$theme.breakpoints) == null ? void 0 : (_props$theme$breakpoi2 = _props$theme$breakpoi.values) == null ? void 0 : _props$theme$breakpoi2[propValue]) || values[propValue];
          return {
            maxWidth: breakpoint || transform(propValue)
          };
        };
        return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
      }
      return null;
    };
    maxWidth.filterProps = ["maxWidth"];
    minWidth = style_default({
      prop: "minWidth",
      transform
    });
    height = style_default({
      prop: "height",
      transform
    });
    maxHeight = style_default({
      prop: "maxHeight",
      transform
    });
    minHeight = style_default({
      prop: "minHeight",
      transform
    });
    sizeWidth = style_default({
      prop: "size",
      cssProperty: "width",
      transform
    });
    sizeHeight = style_default({
      prop: "size",
      cssProperty: "height",
      transform
    });
    boxSizing = style_default({
      prop: "boxSizing"
    });
    sizing = compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
    sizing_default = sizing;
  }
});

// node_modules/@mui/system/esm/typography.js
var fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, textTransform, lineHeight, textAlign, typographyVariant, typography, typography_default;
var init_typography = __esm({
  "node_modules/@mui/system/esm/typography.js"() {
    init_style();
    init_compose();
    fontFamily = style_default({
      prop: "fontFamily",
      themeKey: "typography"
    });
    fontSize = style_default({
      prop: "fontSize",
      themeKey: "typography"
    });
    fontStyle = style_default({
      prop: "fontStyle",
      themeKey: "typography"
    });
    fontWeight = style_default({
      prop: "fontWeight",
      themeKey: "typography"
    });
    letterSpacing = style_default({
      prop: "letterSpacing"
    });
    textTransform = style_default({
      prop: "textTransform"
    });
    lineHeight = style_default({
      prop: "lineHeight"
    });
    textAlign = style_default({
      prop: "textAlign"
    });
    typographyVariant = style_default({
      prop: "typography",
      cssProperty: false,
      themeKey: "typography"
    });
    typography = compose_default(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
    typography_default = typography;
  }
});

// node_modules/@mui/system/esm/getThemeValue.js
var filterPropsMapping, styleFunctionMapping, propToStyleFunction;
var init_getThemeValue = __esm({
  "node_modules/@mui/system/esm/getThemeValue.js"() {
    init_borders();
    init_display();
    init_flexbox();
    init_cssGrid();
    init_positions();
    init_palette();
    init_shadows();
    init_sizing();
    init_spacing();
    init_typography();
    filterPropsMapping = {
      borders: borders_default.filterProps,
      display: display_default.filterProps,
      flexbox: flexbox_default.filterProps,
      grid: cssGrid_default.filterProps,
      positions: positions_default.filterProps,
      palette: palette_default.filterProps,
      shadows: shadows_default.filterProps,
      sizing: sizing_default.filterProps,
      spacing: spacing_default.filterProps,
      typography: typography_default.filterProps
    };
    styleFunctionMapping = {
      borders: borders_default,
      display: display_default,
      flexbox: flexbox_default,
      grid: cssGrid_default,
      positions: positions_default,
      palette: palette_default,
      shadows: shadows_default,
      sizing: sizing_default,
      spacing: spacing_default,
      typography: typography_default
    };
    propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
      filterPropsMapping[styleFnName].forEach((propName) => {
        acc[propName] = styleFunctionMapping[styleFnName];
      });
      return acc;
    }, {});
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
}
function unstable_createStyleFunctionSx(styleFunctionMapping2 = styleFunctionMapping) {
  const propToStyleFunction2 = Object.keys(styleFunctionMapping2).reduce((acc, styleFnName) => {
    styleFunctionMapping2[styleFnName].filterProps.forEach((propName) => {
      acc[propName] = styleFunctionMapping2[styleFnName];
    });
    return acc;
  }, {});
  function getThemeValue(prop, value, theme) {
    const inputProps = {
      [prop]: value,
      theme
    };
    const styleFunction = propToStyleFunction2[prop];
    return styleFunction ? styleFunction(inputProps) : {
      [prop]: value
    };
  }
  function styleFunctionSx2(props) {
    const {
      sx: sx2,
      theme = {}
    } = props || {};
    if (!sx2) {
      return null;
    }
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === "function") {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== "object") {
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css2 = emptyBreakpoints;
      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== void 0) {
          if (typeof value === "object") {
            if (propToStyleFunction2[styleKey]) {
              css2 = merge_default(css2, getThemeValue(styleKey, value, theme));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, (x) => ({
                [styleKey]: x
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css2[styleKey] = styleFunctionSx2({
                  sx: value,
                  theme
                });
              } else {
                css2 = merge_default(css2, breakpointsValues);
              }
            }
          } else {
            css2 = merge_default(css2, getThemeValue(styleKey, value, theme));
          }
        }
      });
      return removeUnusedBreakpoints(breakpointsKeys, css2);
    }
    return Array.isArray(sx2) ? sx2.map(traverse) : traverse(sx2);
  }
  return styleFunctionSx2;
}
var styleFunctionSx, styleFunctionSx_default;
var init_styleFunctionSx = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js"() {
    init_merge();
    init_getThemeValue();
    init_breakpoints();
    styleFunctionSx = unstable_createStyleFunctionSx();
    styleFunctionSx.filterProps = ["sx"];
    styleFunctionSx_default = styleFunctionSx;
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js
function extendSxProp(props) {
  const {
    sx: inSx
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === "function") {
    finalSx = (...args) => {
      const result = inSx(...args);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return _extends({}, systemProps, result);
    };
  } else {
    finalSx = _extends({}, systemProps, inSx);
  }
  return _extends({}, otherProps, {
    sx: finalSx
  });
}
var _excluded4, splitProps;
var init_extendSxProp = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    init_getThemeValue();
    _excluded4 = ["sx"];
    splitProps = (props) => {
      const result = {
        systemProps: {},
        otherProps: {}
      };
      Object.keys(props).forEach((prop) => {
        if (propToStyleFunction[prop]) {
          result.systemProps[prop] = props[prop];
        } else {
          result.otherProps[prop] = props[prop];
        }
      });
      return result;
    };
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/index.js
var init_styleFunctionSx2 = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/index.js"() {
    init_styleFunctionSx();
    init_styleFunctionSx();
    init_extendSxProp();
  }
});

// node_modules/@mui/system/esm/sx/sx.js
function sx(styles2) {
  return ({
    theme
  }) => styleFunctionSx_default({
    sx: styles2,
    theme
  });
}
var sx_default;
var init_sx = __esm({
  "node_modules/@mui/system/esm/sx/sx.js"() {
    init_styleFunctionSx2();
    sx_default = sx;
  }
});

// node_modules/@mui/system/esm/sx/index.js
var init_sx2 = __esm({
  "node_modules/@mui/system/esm/sx/index.js"() {
    init_sx();
  }
});

// node_modules/@mui/system/esm/colorManipulator.js
function clamp(value, min2 = 0, max2 = 1) {
  if (true) {
    if (value < min2 || value > max2) {
      console.error(`MUI: The value provided ${value} is out of range [${min2}, ${max2}].`);
    }
  }
  return Math.min(Math.max(min2, value), max2);
}
function hexToRgb(color2) {
  color2 = color2.slice(1);
  const re = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
  let colors = color2.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function decomposeColor(color2) {
  if (color2.type) {
    return color2;
  }
  if (color2.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color2));
  }
  const marker = color2.indexOf("(");
  const type = color2.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(true ? `MUI: Unsupported \`${color2}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color2));
  }
  let values2 = color2.substring(marker + 1, color2.length - 1);
  let colorSpace;
  if (type === "color") {
    values2 = values2.split(" ");
    colorSpace = values2.shift();
    if (values2.length === 4 && values2[3].charAt(0) === "/") {
      values2[3] = values2[3].slice(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(true ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values2 = values2.split(",");
  }
  values2 = values2.map((value) => parseFloat(value));
  return {
    type,
    values: values2,
    colorSpace
  };
}
function recomposeColor(color2) {
  const {
    type,
    colorSpace
  } = color2;
  let {
    values: values2
  } = color2;
  if (type.indexOf("rgb") !== -1) {
    values2 = values2.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf("hsl") !== -1) {
    values2[1] = `${values2[1]}%`;
    values2[2] = `${values2[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values2 = `${colorSpace} ${values2.join(" ")}`;
  } else {
    values2 = `${values2.join(", ")}`;
  }
  return `${type}(${values2})`;
}
function rgbToHex(color2) {
  if (color2.indexOf("#") === 0) {
    return color2;
  }
  const {
    values: values2
  } = decomposeColor(color2);
  return `#${values2.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join("")}`;
}
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  const {
    values: values2
  } = color2;
  const h = values2[0];
  const s = values2[1] / 100;
  const l = values2[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (color2.type === "hsla") {
    type += "a";
    rgb.push(values2[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function getLuminance(color2) {
  color2 = decomposeColor(color2);
  let rgb = color2.type === "hsl" ? decomposeColor(hslToRgb(color2)).values : color2.values;
  rgb = rgb.map((val) => {
    if (color2.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function alpha(color2, value) {
  color2 = decomposeColor(color2);
  value = clamp(value);
  if (color2.type === "rgb" || color2.type === "hsl") {
    color2.type += "a";
  }
  if (color2.type === "color") {
    color2.values[3] = `/${value}`;
  } else {
    color2.values[3] = value;
  }
  return recomposeColor(color2);
}
function darken(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clamp(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] *= 1 - coefficient;
  } else if (color2.type.indexOf("rgb") !== -1 || color2.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color2);
}
function lighten(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clamp(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] += (100 - color2.values[2]) * coefficient;
  } else if (color2.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (255 - color2.values[i]) * coefficient;
    }
  } else if (color2.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (1 - color2.values[i]) * coefficient;
    }
  }
  return recomposeColor(color2);
}
function emphasize(color2, coefficient = 0.15) {
  return getLuminance(color2) > 0.5 ? darken(color2, coefficient) : lighten(color2, coefficient);
}
var colorChannel;
var init_colorManipulator = __esm({
  "node_modules/@mui/system/esm/colorManipulator.js"() {
    init_esm();
    colorChannel = (color2) => {
      const decomposedColor = decomposeColor(color2);
      return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.indexOf("hsl") !== -1 && idx !== 0 ? `${val}%` : val).join(" ");
    };
  }
});

// node_modules/@mui/private-theming/index.js
var init_private_theming = __esm({
  "node_modules/@mui/private-theming/index.js"() {
    init_ThemeProvider();
    init_ThemeProvider();
    init_useTheme();
  }
});

// node_modules/@mui/system/esm/createTheme/createBreakpoints.js
function createBreakpoints(breakpoints) {
  const {
    values: values2 = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
    unit = "px",
    step = 5
  } = breakpoints, other = _objectWithoutPropertiesLoose(breakpoints, _excluded5);
  const sortedValues = sortBreakpointsValues(values2);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start2, end2) {
    const endIndex = keys.indexOf(end2);
    return `@media (min-width:${typeof values2[start2] === "number" ? values2[start2] : start2}${unit}) and (max-width:${(endIndex !== -1 && typeof values2[keys[endIndex]] === "number" ? values2[keys[endIndex]] : end2) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function not(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
  }
  return _extends({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}
var _excluded5, sortBreakpointsValues;
var init_createBreakpoints = __esm({
  "node_modules/@mui/system/esm/createTheme/createBreakpoints.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    _excluded5 = ["values", "unit", "step"];
    sortBreakpointsValues = (values2) => {
      const breakpointsAsArray = Object.keys(values2).map((key) => ({
        key,
        val: values2[key]
      })) || [];
      breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
      return breakpointsAsArray.reduce((acc, obj) => {
        return _extends({}, acc, {
          [obj.key]: obj.val
        });
      }, {});
    };
  }
});

// node_modules/@mui/system/esm/createTheme/shape.js
var shape, shape_default;
var init_shape = __esm({
  "node_modules/@mui/system/esm/createTheme/shape.js"() {
    shape = {
      borderRadius: 4
    };
    shape_default = shape;
  }
});

// node_modules/@mui/system/esm/createTheme/createSpacing.js
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const transform2 = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing2 = (...argsInput) => {
    if (true) {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform2(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing2.mui = true;
  return spacing2;
}
var init_createSpacing = __esm({
  "node_modules/@mui/system/esm/createTheme/createSpacing.js"() {
    init_spacing();
  }
});

// node_modules/@mui/system/esm/createTheme/createTheme.js
function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded6);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    components: {},
    palette: _extends({
      mode: "light"
    }, paletteInput),
    spacing: spacing2,
    shape: _extends({}, shape_default, shapeInput)
  }, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}
var _excluded6, createTheme_default;
var init_createTheme = __esm({
  "node_modules/@mui/system/esm/createTheme/createTheme.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    init_createBreakpoints();
    init_shape();
    init_createSpacing();
    _excluded6 = ["breakpoints", "palette", "spacing", "shape"];
    createTheme_default = createTheme;
  }
});

// node_modules/@mui/system/esm/createTheme/index.js
var init_createTheme2 = __esm({
  "node_modules/@mui/system/esm/createTheme/index.js"() {
    init_createTheme();
  }
});

// node_modules/@mui/system/esm/useThemeWithoutDefault.js
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme3(defaultTheme4 = null) {
  const contextTheme = useTheme();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme4 : contextTheme;
}
var useThemeWithoutDefault_default;
var init_useThemeWithoutDefault = __esm({
  "node_modules/@mui/system/esm/useThemeWithoutDefault.js"() {
    init_private_theming();
    useThemeWithoutDefault_default = useTheme3;
  }
});

// node_modules/@mui/system/esm/useTheme.js
function useTheme4(defaultTheme4 = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme4);
}
var systemDefaultTheme, useTheme_default;
var init_useTheme2 = __esm({
  "node_modules/@mui/system/esm/useTheme.js"() {
    init_createTheme2();
    init_useThemeWithoutDefault();
    systemDefaultTheme = createTheme_default();
    useTheme_default = useTheme4;
  }
});

// node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js
function InnerThemeProvider(props) {
  const theme = useTheme_default();
  return (0, import_jsx_runtime11.jsx)(ThemeContext.Provider, {
    value: typeof theme === "object" ? theme : {},
    children: props.children
  });
}
function ThemeProvider2(props) {
  const {
    children,
    theme: localTheme
  } = props;
  return (0, import_jsx_runtime11.jsx)(ThemeProvider_default, {
    theme: localTheme,
    children: (0, import_jsx_runtime11.jsx)(InnerThemeProvider, {
      children
    })
  });
}
var React13, import_prop_types11, import_jsx_runtime11, ThemeProvider_default2;
var init_ThemeProvider2 = __esm({
  "node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js"() {
    React13 = __toESM(require_react());
    import_prop_types11 = __toESM(require_prop_types());
    init_private_theming();
    init_esm();
    init_styled_engine();
    init_useTheme2();
    import_jsx_runtime11 = __toESM(require_jsx_runtime());
    true ? InnerThemeProvider.propTypes = {
      children: import_prop_types11.default.node
    } : void 0;
    true ? ThemeProvider2.propTypes = {
      children: import_prop_types11.default.node,
      theme: import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object]).isRequired
    } : void 0;
    if (true) {
      true ? ThemeProvider2.propTypes = exactProp(ThemeProvider2.propTypes) : void 0;
    }
    ThemeProvider_default2 = ThemeProvider2;
  }
});

// node_modules/@mui/system/esm/ThemeProvider/index.js
var init_ThemeProvider3 = __esm({
  "node_modules/@mui/system/esm/ThemeProvider/index.js"() {
    init_ThemeProvider2();
  }
});

// node_modules/@mui/system/esm/createBox.js
function createBox(options = {}) {
  const {
    defaultTheme: defaultTheme4,
    defaultClassName = "MuiBox-root",
    generateClassName,
    styleFunctionSx: styleFunctionSx2 = styleFunctionSx_default
  } = options;
  const BoxRoot = styled("div")(styleFunctionSx2);
  const Box2 = React14.forwardRef(function Box3(inProps, ref) {
    const theme = useTheme_default(defaultTheme4);
    const _extendSxProp = extendSxProp(inProps), {
      className,
      component = "div"
    } = _extendSxProp, other = _objectWithoutPropertiesLoose(_extendSxProp, _excluded7);
    return (0, import_jsx_runtime12.jsx)(BoxRoot, _extends({
      as: component,
      ref,
      className: clsx_m_default(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme
    }, other));
  });
  return Box2;
}
var React14, import_jsx_runtime12, _excluded7;
var init_createBox = __esm({
  "node_modules/@mui/system/esm/createBox.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React14 = __toESM(require_react());
    init_clsx_m();
    init_styled_engine();
    init_styleFunctionSx2();
    init_useTheme2();
    import_jsx_runtime12 = __toESM(require_jsx_runtime());
    _excluded7 = ["className", "component"];
  }
});

// node_modules/@mui/system/esm/Box/Box.js
var import_prop_types12, Box;
var init_Box = __esm({
  "node_modules/@mui/system/esm/Box/Box.js"() {
    import_prop_types12 = __toESM(require_prop_types());
    init_createBox();
    Box = createBox();
    true ? Box.propTypes = {
      children: import_prop_types12.default.node,
      component: import_prop_types12.default.elementType,
      sx: import_prop_types12.default.oneOfType([import_prop_types12.default.arrayOf(import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object, import_prop_types12.default.bool])), import_prop_types12.default.func, import_prop_types12.default.object])
    } : void 0;
  }
});

// node_modules/@mui/system/esm/Box/index.js
var init_Box2 = __esm({
  "node_modules/@mui/system/esm/Box/index.js"() {
    init_Box();
  }
});

// node_modules/@mui/system/esm/propsToClassKey.js
function isEmpty3(string) {
  return string.length === 0;
}
function propsToClassKey(props) {
  const {
    variant
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
  let classKey = variant || "";
  Object.keys(other).sort().forEach((key) => {
    if (key === "color") {
      classKey += isEmpty3(classKey) ? props[key] : capitalize(props[key]);
    } else {
      classKey += `${isEmpty3(classKey) ? key : capitalize(key)}${capitalize(props[key].toString())}`;
    }
  });
  return classKey;
}
var _excluded8;
var init_propsToClassKey = __esm({
  "node_modules/@mui/system/esm/propsToClassKey.js"() {
    init_objectWithoutPropertiesLoose();
    init_esm();
    _excluded8 = ["variant"];
  }
});

// node_modules/@mui/system/esm/createStyled.js
function isEmpty4(obj) {
  return Object.keys(obj).length === 0;
}
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
function createStyled3(input = {}) {
  const {
    defaultTheme: defaultTheme4 = systemDefaultTheme2,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
    styleFunctionSx: styleFunctionSx2 = styleFunctionSx_default
  } = input;
  return (tag, inputOptions = {}) => {
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions, options = _objectWithoutPropertiesLoose(inputOptions, _excluded9);
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" || false;
    const skipSx = inputSkipSx || false;
    let label;
    if (true) {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
      }
    }
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root") {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp;
    }
    const defaultStyledResolver = styled(tag, _extends({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));
    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map((stylesArg) => {
        return typeof stylesArg === "function" && stylesArg.__emotion_real !== stylesArg ? (_ref) => {
          let {
            theme: themeInput
          } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded22);
          return stylesArg(_extends({
            theme: isEmpty4(themeInput) ? defaultTheme4 : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty4(props.theme) ? defaultTheme4 : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);
          if (styleOverrides) {
            const resolvedStyleOverrides = {};
            Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
              resolvedStyleOverrides[slotKey] = typeof slotStyle === "function" ? slotStyle(_extends({}, props, {
                theme
              })) : slotStyle;
            });
            return overridesResolver(props, resolvedStyleOverrides);
          }
          return null;
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty4(props.theme) ? defaultTheme4 : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty4(props.theme) ? defaultTheme4 : props.theme;
          return styleFunctionSx2(_extends({}, props, {
            theme
          }));
        });
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === "function" && styleArg.__emotion_real !== styleArg) {
        transformedStyleArg = (_ref2) => {
          let {
            theme: themeInput
          } = _ref2, other = _objectWithoutPropertiesLoose(_ref2, _excluded32);
          return styleArg(_extends({
            theme: isEmpty4(themeInput) ? defaultTheme4 : themeInput
          }, other));
        };
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      if (true) {
        let displayName;
        if (componentName) {
          displayName = `${componentName}${componentSlot || ""}`;
        }
        if (displayName === void 0) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }
        Component.displayName = displayName;
      }
      return Component;
    };
    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }
    return muiStyledResolver;
  };
}
var _excluded9, _excluded22, _excluded32, getStyleOverrides, getVariantStyles, variantsResolver, systemDefaultTheme2, lowercaseFirstLetter;
var init_createStyled = __esm({
  "node_modules/@mui/system/esm/createStyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_styled_engine();
    init_esm();
    init_createTheme2();
    init_propsToClassKey();
    init_styleFunctionSx2();
    _excluded9 = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
    _excluded22 = ["theme"];
    _excluded32 = ["theme"];
    getStyleOverrides = (name, theme) => {
      if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
        return theme.components[name].styleOverrides;
      }
      return null;
    };
    getVariantStyles = (name, theme) => {
      let variants = [];
      if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
        variants = theme.components[name].variants;
      }
      const variantsStyles = {};
      variants.forEach((definition) => {
        const key = propsToClassKey(definition.props);
        variantsStyles[key] = definition.style;
      });
      return variantsStyles;
    };
    variantsResolver = (props, styles2, theme, name) => {
      var _theme$components, _theme$components$nam;
      const {
        ownerState = {}
      } = props;
      const variantsStyles = [];
      const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;
      if (themeVariants) {
        themeVariants.forEach((themeVariant) => {
          let isMatch = true;
          Object.keys(themeVariant.props).forEach((key) => {
            if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
              isMatch = false;
            }
          });
          if (isMatch) {
            variantsStyles.push(styles2[propsToClassKey(themeVariant.props)]);
          }
        });
      }
      return variantsStyles;
    };
    systemDefaultTheme2 = createTheme_default();
    lowercaseFirstLetter = (string) => {
      return string.charAt(0).toLowerCase() + string.slice(1);
    };
  }
});

// node_modules/@mui/system/esm/styled.js
var styled2, styled_default;
var init_styled = __esm({
  "node_modules/@mui/system/esm/styled.js"() {
    init_createStyled();
    styled2 = createStyled3();
    styled_default = styled2;
  }
});

// node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}
var init_getThemeProps = __esm({
  "node_modules/@mui/system/esm/useThemeProps/getThemeProps.js"() {
    init_esm();
  }
});

// node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme: defaultTheme4
}) {
  const theme = useTheme_default(defaultTheme4);
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}
var init_useThemeProps = __esm({
  "node_modules/@mui/system/esm/useThemeProps/useThemeProps.js"() {
    init_getThemeProps();
    init_useTheme2();
  }
});

// node_modules/@mui/system/esm/useThemeProps/index.js
var init_useThemeProps2 = __esm({
  "node_modules/@mui/system/esm/useThemeProps/index.js"() {
    init_useThemeProps();
    init_getThemeProps();
  }
});

// node_modules/@mui/system/esm/cssVars/cssVarsParser.js
function cssVarsParser(theme, options) {
  const {
    prefix: prefix2,
    shouldSkipGeneratingVar
  } = options || {};
  const css2 = {};
  const vars = {};
  const parsedTheme = {};
  walkObjectDeep(theme, (keys, value, arrayKeys) => {
    if (typeof value === "string" || typeof value === "number") {
      if (!shouldSkipGeneratingVar || shouldSkipGeneratingVar && !shouldSkipGeneratingVar(keys, value)) {
        const cssVar = `--${prefix2 ? `${prefix2}-` : ""}${keys.join("-")}`;
        Object.assign(css2, {
          [cssVar]: getCssValue(keys, value)
        });
        assignNestedKeys(vars, keys, `var(${cssVar})`, arrayKeys);
      }
    }
    assignNestedKeys(parsedTheme, keys, value, arrayKeys);
  }, (keys) => keys[0] === "vars");
  return {
    css: css2,
    vars,
    parsedTheme
  };
}
var assignNestedKeys, walkObjectDeep, getCssValue;
var init_cssVarsParser = __esm({
  "node_modules/@mui/system/esm/cssVars/cssVarsParser.js"() {
    assignNestedKeys = (obj, keys, value, arrayKeys = []) => {
      let temp = obj;
      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          if (Array.isArray(temp)) {
            temp[Number(k)] = value;
          } else if (temp && typeof temp === "object") {
            temp[k] = value;
          }
        } else if (temp && typeof temp === "object") {
          if (!temp[k]) {
            temp[k] = arrayKeys.includes(k) ? [] : {};
          }
          temp = temp[k];
        }
      });
    };
    walkObjectDeep = (obj, callback, shouldSkipPaths) => {
      function recurse(object, parentKeys = [], arrayKeys = []) {
        Object.entries(object).forEach(([key, value]) => {
          if (!shouldSkipPaths || shouldSkipPaths && !shouldSkipPaths([...parentKeys, key])) {
            if (value !== void 0 && value !== null) {
              if (typeof value === "object" && Object.keys(value).length > 0) {
                recurse(value, [...parentKeys, key], Array.isArray(value) ? [...arrayKeys, key] : arrayKeys);
              } else {
                callback([...parentKeys, key], value, arrayKeys);
              }
            }
          }
        });
      }
      recurse(obj);
    };
    getCssValue = (keys, value) => {
      if (typeof value === "number") {
        if (["lineHeight", "fontWeight", "opacity", "zIndex"].some((prop) => keys.includes(prop))) {
          return value;
        }
        const lastKey = keys[keys.length - 1];
        if (lastKey.toLowerCase().indexOf("opacity") >= 0) {
          return value;
        }
        return `${value}px`;
      }
      return value;
    };
  }
});

// node_modules/@mui/system/esm/cssVars/getInitColorSchemeScript.js
function getInitColorSchemeScript(options) {
  const {
    enableColorScheme = true,
    enableSystem = false,
    defaultLightColorScheme = "light",
    defaultDarkColorScheme = "dark",
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
    colorSchemeNode = "document.documentElement"
  } = options || {};
  return (0, import_jsx_runtime13.jsx)("script", {
    dangerouslySetInnerHTML: {
      __html: `(function() { try {
        var mode = localStorage.getItem('${modeStorageKey}');
        var cssColorScheme = mode;
        var colorScheme = '';
        if (mode === 'system' || (!mode && !!${enableSystem})) {
          // handle system mode
          var mql = window.matchMedia('(prefers-color-scheme: dark)');
          if (mql.matches) {
            cssColorScheme = 'dark';
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
          } else {
            cssColorScheme = 'light';
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
          }
        }
        if (mode === 'light') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
        }
        if (mode === 'dark') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
        }
        if (colorScheme) {
          ${colorSchemeNode}.setAttribute('${attribute}', colorScheme);
        }
        if (${enableColorScheme} && !!cssColorScheme) {
          ${colorSchemeNode}.style.setProperty('color-scheme', cssColorScheme);
        }
      } catch (e) {} })();`
    }
  });
}
var React15, import_jsx_runtime13, DEFAULT_MODE_STORAGE_KEY, DEFAULT_COLOR_SCHEME_STORAGE_KEY, DEFAULT_ATTRIBUTE;
var init_getInitColorSchemeScript = __esm({
  "node_modules/@mui/system/esm/cssVars/getInitColorSchemeScript.js"() {
    React15 = __toESM(require_react());
    import_jsx_runtime13 = __toESM(require_jsx_runtime());
    DEFAULT_MODE_STORAGE_KEY = "mode";
    DEFAULT_COLOR_SCHEME_STORAGE_KEY = "color-scheme";
    DEFAULT_ATTRIBUTE = "data-color-scheme";
  }
});

// node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js
function getSystemMode(mode) {
  if (typeof window !== "undefined" && mode === "system") {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    if (mql.matches) {
      return "dark";
    }
    return "light";
  }
  return void 0;
}
function processState(state, callback) {
  if (state.mode === "light" || state.mode === "system" && state.systemMode === "light") {
    return callback("light");
  }
  if (state.mode === "dark" || state.mode === "system" && state.systemMode === "dark") {
    return callback("dark");
  }
  return void 0;
}
function getColorScheme(state) {
  return processState(state, (mode) => {
    if (mode === "light") {
      return state.lightColorScheme;
    }
    if (mode === "dark") {
      return state.darkColorScheme;
    }
    return void 0;
  });
}
function resolveValue(key, defaultValue) {
  if (typeof window === "undefined") {
    return void 0;
  }
  let value;
  try {
    value = localStorage.getItem(key) || void 0;
  } catch (e) {
  }
  return value || defaultValue;
}
function useCurrentColorScheme(options) {
  const {
    defaultMode = "light",
    defaultLightColorScheme,
    defaultDarkColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    storageWindow = typeof window === "undefined" ? void 0 : window
  } = options;
  const joinedColorSchemes = supportedColorSchemes.join(",");
  const [state, setState] = React16.useState(() => {
    const initialMode = resolveValue(modeStorageKey, defaultMode);
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      lightColorScheme: resolveValue(`${colorSchemeStorageKey}-light`) || defaultLightColorScheme,
      darkColorScheme: resolveValue(`${colorSchemeStorageKey}-dark`) || defaultDarkColorScheme
    };
  });
  const colorScheme = getColorScheme(state);
  const setMode = React16.useCallback((mode) => {
    setState((currentState) => {
      const newMode = !mode ? defaultMode : mode;
      if (mode === currentState.mode) {
        return currentState;
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(modeStorageKey, newMode);
      }
      return _extends({}, currentState, {
        mode: newMode,
        systemMode: getSystemMode(newMode)
      });
    });
  }, [modeStorageKey, defaultMode]);
  const setColorScheme = React16.useCallback((value) => {
    if (!value || typeof value === "string") {
      if (value && !joinedColorSchemes.includes(value)) {
        console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
      } else {
        setState((currentState) => {
          const newState = _extends({}, currentState);
          if (!value) {
            newState.lightColorScheme = defaultLightColorScheme;
            newState.darkColorScheme = defaultDarkColorScheme;
            return newState;
          }
          processState(currentState, (mode) => {
            localStorage.setItem(`${colorSchemeStorageKey}-${mode}`, value);
            if (mode === "light") {
              newState.lightColorScheme = value;
            }
            if (mode === "dark") {
              newState.darkColorScheme = value;
            }
          });
          return newState;
        });
      }
    } else if (value.light && !joinedColorSchemes.includes(value.light) || value.dark && !joinedColorSchemes.includes(value.dark)) {
      console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
    } else {
      setState((currentState) => {
        const newState = _extends({}, currentState);
        if (value.light || value.light === null) {
          newState.lightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
        }
        if (value.dark || value.dark === null) {
          newState.darkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;
        }
        return newState;
      });
      if (value.light) {
        localStorage.setItem(`${colorSchemeStorageKey}-light`, value.light);
      }
      if (value.dark) {
        localStorage.setItem(`${colorSchemeStorageKey}-dark`, value.dark);
      }
    }
  }, [joinedColorSchemes, colorSchemeStorageKey, defaultLightColorScheme, defaultDarkColorScheme]);
  const handleMediaQuery = React16.useCallback((e) => {
    if (state.mode === "system") {
      setState((currentState) => _extends({}, currentState, {
        systemMode: e != null && e.matches ? "dark" : "light"
      }));
    }
  }, [state.mode]);
  const mediaListener = React16.useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;
  React16.useEffect(() => {
    const handler = (...args) => mediaListener.current(...args);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addListener(handler);
    handler(media);
    return () => media.removeListener(handler);
  }, []);
  React16.useEffect(() => {
    if (state.mode) {
      localStorage.setItem(modeStorageKey, state.mode);
    }
    processState(state, (mode) => {
      if (mode === "light") {
        localStorage.setItem(`${colorSchemeStorageKey}-light`, state.lightColorScheme);
      }
      if (mode === "dark") {
        localStorage.setItem(`${colorSchemeStorageKey}-dark`, state.darkColorScheme);
      }
    });
  }, [state, colorSchemeStorageKey, modeStorageKey]);
  React16.useEffect(() => {
    const handleStorage = (event) => {
      const value = event.newValue;
      if (typeof event.key === "string" && event.key.startsWith(colorSchemeStorageKey) && (!value || joinedColorSchemes.match(value))) {
        if (event.key.endsWith("light")) {
          setColorScheme({
            light: value
          });
        }
        if (event.key.endsWith("dark")) {
          setColorScheme({
            dark: value
          });
        }
      }
      if (event.key === modeStorageKey && (!value || ["light", "dark", "system"].includes(value))) {
        setMode(value || defaultMode);
      }
    };
    if (storageWindow) {
      storageWindow.addEventListener("storage", handleStorage);
      return () => storageWindow.removeEventListener("storage", handleStorage);
    }
    return void 0;
  }, [setColorScheme, setMode, modeStorageKey, colorSchemeStorageKey, joinedColorSchemes, defaultMode, storageWindow]);
  return _extends({}, state, {
    colorScheme,
    setMode,
    setColorScheme
  });
}
var React16;
var init_useCurrentColorScheme = __esm({
  "node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js"() {
    init_extends();
    React16 = __toESM(require_react());
    init_getInitColorSchemeScript();
  }
});

// node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
function createCssVarsProvider(options) {
  const {
    theme: defaultTheme4 = {},
    attribute: defaultAttribute = DEFAULT_ATTRIBUTE,
    modeStorageKey: defaultModeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey: defaultColorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    defaultMode: desisgnSystemMode = "light",
    defaultColorScheme: designSystemColorScheme,
    disableTransitionOnChange: designSystemTransitionOnChange = false,
    enableColorScheme: designSystemEnableColorScheme = true,
    shouldSkipGeneratingVar: designSystemShouldSkipGeneratingVar,
    resolveTheme
  } = options;
  if (!defaultTheme4.colorSchemes || typeof designSystemColorScheme === "string" && !defaultTheme4.colorSchemes[designSystemColorScheme] || typeof designSystemColorScheme === "object" && !defaultTheme4.colorSchemes[designSystemColorScheme == null ? void 0 : designSystemColorScheme.light] || typeof designSystemColorScheme === "object" && !defaultTheme4.colorSchemes[designSystemColorScheme == null ? void 0 : designSystemColorScheme.dark]) {
    console.error(`MUI: \`${designSystemColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
  }
  const ColorSchemeContext = React17.createContext(void 0);
  const useColorScheme = () => {
    const value = React17.useContext(ColorSchemeContext);
    if (!value) {
      throw new Error(true ? `MUI: \`useColorScheme\` must be called under <CssVarsProvider />` : formatMuiErrorMessage(19));
    }
    return value;
  };
  function CssVarsProvider({
    children,
    theme: themeProp = defaultTheme4,
    modeStorageKey = defaultModeStorageKey,
    colorSchemeStorageKey = defaultColorSchemeStorageKey,
    attribute = defaultAttribute,
    defaultMode = desisgnSystemMode,
    defaultColorScheme = designSystemColorScheme,
    disableTransitionOnChange = designSystemTransitionOnChange,
    enableColorScheme = designSystemEnableColorScheme,
    storageWindow = typeof window === "undefined" ? void 0 : window,
    documentNode = typeof document === "undefined" ? void 0 : document,
    colorSchemeNode = typeof document === "undefined" ? void 0 : document.documentElement,
    colorSchemeSelector = ":root",
    shouldSkipGeneratingVar = designSystemShouldSkipGeneratingVar
  }) {
    const hasMounted = React17.useRef(false);
    const {
      colorSchemes = {},
      components = {},
      cssVarPrefix
    } = themeProp, restThemeProp = _objectWithoutPropertiesLoose(themeProp, _excluded10);
    const allColorSchemes = Object.keys(colorSchemes);
    const defaultLightColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
    const {
      mode,
      setMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme,
      setColorScheme
    } = useCurrentColorScheme({
      supportedColorSchemes: allColorSchemes,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey,
      colorSchemeStorageKey,
      defaultMode,
      storageWindow
    });
    const resolvedColorScheme = (() => {
      if (!colorScheme) {
        if (defaultMode === "dark") {
          return defaultDarkColorScheme;
        }
        return defaultLightColorScheme;
      }
      return colorScheme;
    })();
    let theme = restThemeProp;
    const {
      css: rootCss,
      vars: rootVars,
      parsedTheme
    } = cssVarsParser(theme, {
      prefix: cssVarPrefix,
      shouldSkipGeneratingVar
    });
    theme = _extends({}, parsedTheme, {
      components,
      colorSchemes,
      cssVarPrefix,
      vars: rootVars,
      getColorSchemeSelector: (targetColorScheme) => `[${attribute}="${targetColorScheme}"] &`
    });
    const defaultColorSchemeStyleSheet = {};
    const otherColorSchemesStyleSheet = {};
    Object.entries(colorSchemes).forEach(([key, scheme]) => {
      const {
        css: css2,
        vars,
        parsedTheme: parsedScheme
      } = cssVarsParser(scheme, {
        prefix: cssVarPrefix,
        shouldSkipGeneratingVar
      });
      theme.vars = deepmerge(theme.vars, vars);
      if (key === resolvedColorScheme) {
        theme = _extends({}, theme, parsedScheme);
        if (theme.palette) {
          theme.palette.mode = mode;
          theme.palette.colorScheme = resolvedColorScheme;
        }
      }
      const resolvedDefaultColorScheme = (() => {
        if (typeof defaultColorScheme === "string") {
          return defaultColorScheme;
        }
        if (defaultMode === "dark") {
          return defaultColorScheme.dark;
        }
        return defaultColorScheme.light;
      })();
      if (key === resolvedDefaultColorScheme) {
        defaultColorSchemeStyleSheet[colorSchemeSelector] = css2;
      } else {
        otherColorSchemesStyleSheet[`${colorSchemeSelector === ":root" ? "" : colorSchemeSelector}[${attribute}="${key}"]`] = css2;
      }
    });
    React17.useEffect(() => {
      if (colorScheme && colorSchemeNode) {
        colorSchemeNode.setAttribute(attribute, colorScheme);
      }
    }, [colorScheme, attribute, colorSchemeNode]);
    useEnhancedEffect_default(() => {
      if (!mode || !enableColorScheme || !colorSchemeNode) {
        return void 0;
      }
      const priorColorScheme = colorSchemeNode.style.getPropertyValue("color-scheme");
      if (mode === "system") {
        colorSchemeNode.style.setProperty("color-scheme", systemMode);
      } else {
        colorSchemeNode.style.setProperty("color-scheme", mode);
      }
      return () => {
        colorSchemeNode.style.setProperty("color-scheme", priorColorScheme);
      };
    }, [mode, systemMode, enableColorScheme, colorSchemeNode]);
    React17.useEffect(() => {
      let timer;
      if (disableTransitionOnChange && hasMounted.current && documentNode) {
        const css2 = documentNode.createElement("style");
        css2.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
        documentNode.head.appendChild(css2);
        (() => window.getComputedStyle(documentNode.body))();
        timer = setTimeout(() => {
          documentNode.head.removeChild(css2);
        }, 1);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [colorScheme, disableTransitionOnChange, documentNode]);
    React17.useEffect(() => {
      hasMounted.current = true;
      return () => {
        hasMounted.current = false;
      };
    }, []);
    return (0, import_jsx_runtime15.jsxs)(ColorSchemeContext.Provider, {
      value: {
        mode,
        setMode,
        lightColorScheme,
        darkColorScheme,
        colorScheme,
        setColorScheme,
        allColorSchemes
      },
      children: [(0, import_jsx_runtime14.jsx)(GlobalStyles, {
        styles: {
          [colorSchemeSelector]: rootCss
        }
      }), (0, import_jsx_runtime14.jsx)(GlobalStyles, {
        styles: defaultColorSchemeStyleSheet
      }), (0, import_jsx_runtime14.jsx)(GlobalStyles, {
        styles: otherColorSchemesStyleSheet
      }), (0, import_jsx_runtime14.jsx)(ThemeProvider_default2, {
        theme: resolveTheme ? resolveTheme(theme) : theme,
        children
      })]
    });
  }
  true ? CssVarsProvider.propTypes = {
    attribute: import_prop_types13.default.string,
    children: import_prop_types13.default.node,
    colorSchemeNode: import_prop_types13.default.any,
    colorSchemeSelector: import_prop_types13.default.string,
    colorSchemeStorageKey: import_prop_types13.default.string,
    defaultColorScheme: import_prop_types13.default.oneOfType([import_prop_types13.default.string, import_prop_types13.default.object]),
    defaultMode: import_prop_types13.default.string,
    disableTransitionOnChange: import_prop_types13.default.bool,
    documentNode: import_prop_types13.default.any,
    enableColorScheme: import_prop_types13.default.bool,
    modeStorageKey: import_prop_types13.default.string,
    shouldSkipGeneratingVar: import_prop_types13.default.func,
    storageWindow: import_prop_types13.default.any,
    theme: import_prop_types13.default.object
  } : void 0;
  const getInitColorSchemeScript2 = (params) => getInitColorSchemeScript(_extends({
    attribute: defaultAttribute,
    colorSchemeStorageKey: defaultColorSchemeStorageKey,
    modeStorageKey: defaultModeStorageKey,
    enableColorScheme: designSystemEnableColorScheme
  }, params));
  return {
    CssVarsProvider,
    useColorScheme,
    getInitColorSchemeScript: getInitColorSchemeScript2
  };
}
var React17, import_prop_types13, import_jsx_runtime14, import_jsx_runtime15, _excluded10, DISABLE_CSS_TRANSITION;
var init_createCssVarsProvider = __esm({
  "node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    React17 = __toESM(require_react());
    import_prop_types13 = __toESM(require_prop_types());
    init_esm();
    init_styled_engine();
    init_cssVarsParser();
    init_ThemeProvider3();
    init_getInitColorSchemeScript();
    init_useCurrentColorScheme();
    import_jsx_runtime14 = __toESM(require_jsx_runtime());
    import_jsx_runtime15 = __toESM(require_jsx_runtime());
    _excluded10 = ["colorSchemes", "components", "cssVarPrefix"];
    DISABLE_CSS_TRANSITION = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
  }
});

// node_modules/@mui/system/esm/cssVars/createGetCssVar.js
function createGetCssVar(prefix2 = "") {
  function appendVar(...vars) {
    if (!vars.length) {
      return "";
    }
    const value = vars[0];
    if (typeof value === "string" && !value.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))/)) {
      return `, var(--${prefix2 ? `${prefix2}-` : ""}${value}${appendVar(...vars.slice(1))})`;
    }
    return `, ${value}`;
  }
  const getCssVar = (field, ...fallbacks) => {
    return `var(--${prefix2 ? `${prefix2}-` : ""}${field}${appendVar(...fallbacks)})`;
  };
  return getCssVar;
}
var init_createGetCssVar = __esm({
  "node_modules/@mui/system/esm/cssVars/createGetCssVar.js"() {
  }
});

// node_modules/@mui/system/esm/Container/createContainer.js
function createContainer(options = {}) {
  const {
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps: useThemeProps3 = useThemePropsDefault,
    componentName = "MuiContainer"
  } = options;
  const ContainerRoot = createStyledComponent(({
    theme,
    ownerState
  }) => _extends({
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    display: "block"
  }, !ownerState.disableGutters && {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  }), ({
    theme,
    ownerState
  }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
    const breakpoint = breakpointValueKey;
    const value = theme.breakpoints.values[breakpoint];
    if (value !== 0) {
      acc[theme.breakpoints.up(breakpoint)] = {
        maxWidth: `${value}${theme.breakpoints.unit}`
      };
    }
    return acc;
  }, {}), ({
    theme,
    ownerState
  }) => _extends({}, ownerState.maxWidth === "xs" && {
    [theme.breakpoints.up("xs")]: {
      maxWidth: Math.max(theme.breakpoints.values.xs, 444)
    }
  }, ownerState.maxWidth && ownerState.maxWidth !== "xs" && {
    [theme.breakpoints.up(ownerState.maxWidth)]: {
      maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`
    }
  }));
  const Container2 = React18.forwardRef(function Container3(inProps, ref) {
    const props = useThemeProps3(inProps);
    const {
      className,
      component = "div",
      disableGutters = false,
      fixed = false,
      maxWidth: maxWidth2 = "lg"
    } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
    const ownerState = _extends({}, props, {
      component,
      disableGutters,
      fixed,
      maxWidth: maxWidth2
    });
    const classes = useUtilityClasses2(ownerState, componentName);
    return (0, import_jsx_runtime16.jsx)(ContainerRoot, _extends({
      as: component,
      ownerState,
      className: clsx_m_default(classes.root, className),
      ref
    }, other));
  });
  true ? Container2.propTypes = {
    children: import_prop_types14.default.node,
    classes: import_prop_types14.default.object,
    className: import_prop_types14.default.string,
    component: import_prop_types14.default.elementType,
    disableGutters: import_prop_types14.default.bool,
    fixed: import_prop_types14.default.bool,
    maxWidth: import_prop_types14.default.oneOfType([import_prop_types14.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types14.default.string]),
    sx: import_prop_types14.default.oneOfType([import_prop_types14.default.arrayOf(import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object, import_prop_types14.default.bool])), import_prop_types14.default.func, import_prop_types14.default.object])
  } : void 0;
  return Container2;
}
var React18, import_prop_types14, import_jsx_runtime16, _excluded11, defaultTheme, defaultCreateStyledComponent, useThemePropsDefault, useUtilityClasses2;
var init_createContainer = __esm({
  "node_modules/@mui/system/esm/Container/createContainer.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    React18 = __toESM(require_react());
    import_prop_types14 = __toESM(require_prop_types());
    init_clsx_m();
    init_esm();
    init_useThemeProps2();
    init_styled();
    init_createTheme2();
    import_jsx_runtime16 = __toESM(require_jsx_runtime());
    _excluded11 = ["className", "component", "disableGutters", "fixed", "maxWidth", "classes"];
    defaultTheme = createTheme_default();
    defaultCreateStyledComponent = styled_default("div", {
      name: "MuiContainer",
      slot: "Root",
      overridesResolver: (props, styles2) => {
        const {
          ownerState
        } = props;
        return [styles2.root, styles2[`maxWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fixed && styles2.fixed, ownerState.disableGutters && styles2.disableGutters];
      }
    });
    useThemePropsDefault = (inProps) => useThemeProps({
      props: inProps,
      name: "MuiContainer",
      defaultTheme
    });
    useUtilityClasses2 = (ownerState, componentName) => {
      const getContainerUtilityClass = (slot) => {
        return generateUtilityClass(componentName, slot);
      };
      const {
        classes,
        fixed,
        disableGutters,
        maxWidth: maxWidth2
      } = ownerState;
      const slots = {
        root: ["root", maxWidth2 && `maxWidth${capitalize(String(maxWidth2))}`, fixed && "fixed", disableGutters && "disableGutters"]
      };
      return composeClasses(slots, getContainerUtilityClass, classes);
    };
  }
});

// node_modules/@mui/system/esm/Container/Container.js
var import_prop_types15, Container;
var init_Container = __esm({
  "node_modules/@mui/system/esm/Container/Container.js"() {
    import_prop_types15 = __toESM(require_prop_types());
    init_createContainer();
    Container = createContainer();
    true ? Container.propTypes = {
      children: import_prop_types15.default.node,
      classes: import_prop_types15.default.object,
      component: import_prop_types15.default.elementType,
      disableGutters: import_prop_types15.default.bool,
      fixed: import_prop_types15.default.bool,
      maxWidth: import_prop_types15.default.oneOfType([import_prop_types15.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types15.default.string]),
      sx: import_prop_types15.default.oneOfType([import_prop_types15.default.arrayOf(import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object, import_prop_types15.default.bool])), import_prop_types15.default.func, import_prop_types15.default.object])
    } : void 0;
  }
});

// node_modules/@mui/system/esm/Container/containerClasses.js
var containerClasses;
var init_containerClasses = __esm({
  "node_modules/@mui/system/esm/Container/containerClasses.js"() {
    init_esm();
    containerClasses = generateUtilityClasses("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
  }
});

// node_modules/@mui/system/esm/Container/index.js
var init_Container2 = __esm({
  "node_modules/@mui/system/esm/Container/index.js"() {
    init_Container();
    init_containerClasses();
    init_containerClasses();
  }
});

// node_modules/@mui/system/esm/Unstable_Grid/gridGenerator.js
var traverseBreakpoints, generateGridSizeStyles, generateGridOffsetStyles, generateGridColumnsStyles, generateGridRowSpacingStyles, generateGridColumnSpacingStyles, generateGridDirectionStyles, generateGridStyles, generateSizeClassNames, generateSpacingClassNames;
var init_gridGenerator = __esm({
  "node_modules/@mui/system/esm/Unstable_Grid/gridGenerator.js"() {
    init_extends();
    traverseBreakpoints = (breakpoints, responsize, iterator) => {
      const smallestBreakpoint = breakpoints.keys[0];
      if (Array.isArray(responsize)) {
        responsize.forEach((breakpointValue, index) => {
          iterator((responsizeStyles, style3) => {
            if (index <= breakpoints.keys.length - 1) {
              if (index === 0) {
                Object.assign(responsizeStyles, style3);
              } else {
                responsizeStyles[breakpoints.up(breakpoints.keys[index])] = style3;
              }
            }
          }, breakpointValue);
        });
      } else if (responsize && typeof responsize === "object") {
        const keys = Object.keys(responsize).length > breakpoints.keys.length ? breakpoints.keys : Object.keys(responsize);
        keys.forEach((key) => {
          if (breakpoints.keys.indexOf(key) !== -1) {
            const breakpointValue = responsize[key];
            if (breakpointValue !== void 0) {
              iterator((responsizeStyles, style3) => {
                if (smallestBreakpoint === key) {
                  Object.assign(responsizeStyles, style3);
                } else {
                  responsizeStyles[breakpoints.up(key)] = style3;
                }
              }, breakpointValue);
            }
          }
        });
      } else if (typeof responsize === "number" || typeof responsize === "string") {
        iterator((responsizeStyles, style3) => {
          Object.assign(responsizeStyles, style3);
        }, responsize);
      }
    };
    generateGridSizeStyles = ({
      theme,
      ownerState
    }) => {
      const styles2 = {};
      traverseBreakpoints(theme.breakpoints, ownerState.gridSize, (appendStyle, value) => {
        let style3 = {};
        if (value === true) {
          style3 = {
            flexBasis: 0,
            flexGrow: 1,
            maxWidth: "100%"
          };
        }
        if (value === "auto") {
          style3 = {
            flexBasis: "auto",
            flexGrow: 0,
            flexShrink: 0,
            maxWidth: "none",
            width: "auto"
          };
        }
        if (typeof value === "number") {
          style3 = {
            flexGrow: 0,
            flexBasis: "auto",
            width: `calc(100% * ${value} / var(--Grid-columns)${ownerState.nested && ownerState.container ? ` + var(--Grid-columnSpacing)` : ""})`
          };
        }
        appendStyle(styles2, style3);
      });
      return styles2;
    };
    generateGridOffsetStyles = ({
      theme,
      ownerState
    }) => {
      const styles2 = {};
      traverseBreakpoints(theme.breakpoints, ownerState.gridOffset, (appendStyle, value) => {
        let style3 = {};
        if (value === "auto") {
          style3 = {
            marginLeft: "auto"
          };
        }
        if (typeof value === "number") {
          style3 = {
            marginLeft: value === 0 ? "0px" : `calc(100% * ${value} / var(--Grid-columns))`
          };
        }
        appendStyle(styles2, style3);
      });
      return styles2;
    };
    generateGridColumnsStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const styles2 = {
        "--Grid-columns": 12
      };
      traverseBreakpoints(theme.breakpoints, ownerState.columns, (appendStyle, value) => {
        appendStyle(styles2, {
          "--Grid-columns": value
        });
      });
      return styles2;
    };
    generateGridRowSpacingStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const styles2 = {};
      traverseBreakpoints(theme.breakpoints, ownerState.rowSpacing, (appendStyle, value) => {
        var _theme$spacing;
        appendStyle(styles2, {
          "--Grid-rowSpacing": typeof value === "string" ? value : (_theme$spacing = theme.spacing) == null ? void 0 : _theme$spacing.call(theme, value)
        });
      });
      return styles2;
    };
    generateGridColumnSpacingStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const styles2 = {};
      traverseBreakpoints(theme.breakpoints, ownerState.columnSpacing, (appendStyle, value) => {
        var _theme$spacing2;
        appendStyle(styles2, {
          "--Grid-columnSpacing": typeof value === "string" ? value : (_theme$spacing2 = theme.spacing) == null ? void 0 : _theme$spacing2.call(theme, value)
        });
      });
      return styles2;
    };
    generateGridDirectionStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const styles2 = {};
      traverseBreakpoints(theme.breakpoints, ownerState.direction, (appendStyle, value) => {
        appendStyle(styles2, {
          flexDirection: value
        });
      });
      return styles2;
    };
    generateGridStyles = ({
      ownerState
    }) => {
      return _extends({
        minWidth: 0,
        boxSizing: "border-box"
      }, ownerState.container ? _extends({
        display: "flex",
        flexWrap: "wrap"
      }, ownerState.wrap && ownerState.wrap !== "wrap" && {
        flexWrap: ownerState.wrap
      }, {
        margin: `calc(var(--Grid-rowSpacing) / -2) calc(var(--Grid-columnSpacing) / -2)`
      }, ownerState.disableEqualOverflow && {
        margin: `calc(var(--Grid-rowSpacing) * -1) 0px 0px calc(var(--Grid-columnSpacing) * -1)`
      }, ownerState.nested ? _extends({
        padding: `calc(var(--Grid-nested-rowSpacing) / 2) calc(var(--Grid-nested-columnSpacing) / 2)`
      }, (ownerState.disableEqualOverflow || ownerState.parentDisableEqualOverflow) && {
        padding: `calc(var(--Grid-nested-rowSpacing)) 0px 0px calc(var(--Grid-nested-columnSpacing))`
      }) : {
        "--Grid-nested-rowSpacing": "var(--Grid-rowSpacing)",
        "--Grid-nested-columnSpacing": "var(--Grid-columnSpacing)"
      }) : _extends({
        padding: `calc(var(--Grid-rowSpacing) / 2) calc(var(--Grid-columnSpacing) / 2)`
      }, ownerState.disableEqualOverflow && {
        padding: `calc(var(--Grid-rowSpacing)) 0px 0px calc(var(--Grid-columnSpacing))`
      }));
    };
    generateSizeClassNames = (gridSize) => {
      const classNames = [];
      Object.entries(gridSize).forEach(([key, value]) => {
        if (value !== false && value !== void 0) {
          classNames.push(`grid-${key}-${String(value)}`);
        }
      });
      return classNames;
    };
    generateSpacingClassNames = (spacing2, smallestBreakpoint = "xs") => {
      function isValidSpacing(val) {
        if (val === void 0) {
          return false;
        }
        return typeof val === "string" && !Number.isNaN(Number(val)) || typeof val === "number" && val > 0;
      }
      if (isValidSpacing(spacing2)) {
        return [`spacing-${smallestBreakpoint}-${String(spacing2)}`];
      }
      if (typeof spacing2 === "object" && !Array.isArray(spacing2)) {
        const classNames = [];
        Object.entries(spacing2).forEach(([key, value]) => {
          if (isValidSpacing(value)) {
            classNames.push(`spacing-${key}-${String(value)}`);
          }
        });
        return classNames;
      }
      return [];
    };
  }
});

// node_modules/@mui/system/esm/Unstable_Grid/createGrid.js
function useThemePropsDefault2(props) {
  return useThemeProps({
    props,
    name: "MuiGrid",
    defaultTheme: defaultTheme2
  });
}
function createGrid(options = {}) {
  const {
    createStyledComponent = defaultCreateStyledComponent2,
    useThemeProps: useThemeProps3 = useThemePropsDefault2,
    componentName = "MuiGrid"
  } = options;
  const NestedContext = React19.createContext(false);
  const OverflowContext = React19.createContext(void 0);
  const useUtilityClasses17 = (ownerState, theme) => {
    const {
      container,
      direction,
      spacing: spacing2,
      wrap,
      gridSize
    } = ownerState;
    const slots = {
      root: ["root", container && "container", direction !== "row" && `direction-xs-${String(direction)}`, wrap !== "wrap" && `wrap-xs-${String(wrap)}`, ...generateSizeClassNames(gridSize), ...container ? generateSpacingClassNames(spacing2, theme.breakpoints.keys[0]) : []]
    };
    return composeClasses(slots, (slot) => generateUtilityClass(componentName, slot), {});
  };
  const GridRoot = createStyledComponent(generateGridColumnsStyles, generateGridColumnSpacingStyles, generateGridRowSpacingStyles, generateGridSizeStyles, generateGridDirectionStyles, generateGridStyles, generateGridOffsetStyles);
  const Grid2 = React19.forwardRef(function Grid3(inProps, ref) {
    var _inProps$columns, _inProps$spacing, _ref, _inProps$rowSpacing, _ref2, _inProps$columnSpacin, _ref3, _disableEqualOverflow;
    const theme = useTheme_default();
    const themeProps = useThemeProps3(inProps);
    const props = extendSxProp(themeProps);
    const nested = React19.useContext(NestedContext);
    const overflow2 = React19.useContext(OverflowContext);
    const {
      className,
      columns: columnsProp = 12,
      container = false,
      component = "div",
      direction = "row",
      wrap = "wrap",
      spacing: spacingProp = 0,
      rowSpacing: rowSpacingProp = spacingProp,
      columnSpacing: columnSpacingProp = spacingProp,
      disableEqualOverflow: themeDisableEqualOverflow
    } = props, rest = _objectWithoutPropertiesLoose(props, _excluded12);
    let disableEqualOverflow = themeDisableEqualOverflow;
    if (nested && themeDisableEqualOverflow !== void 0) {
      disableEqualOverflow = inProps.disableEqualOverflow;
    }
    const gridSize = {};
    const gridOffset = {};
    const other = {};
    Object.entries(rest).forEach(([key, val]) => {
      if (theme.breakpoints.values[key] !== void 0) {
        gridSize[key] = val;
      } else if (theme.breakpoints.values[key.replace("Offset", "")] !== void 0) {
        gridOffset[key.replace("Offset", "")] = val;
      } else {
        other[key] = val;
      }
    });
    const columns = (_inProps$columns = inProps.columns) != null ? _inProps$columns : nested ? void 0 : columnsProp;
    const spacing2 = (_inProps$spacing = inProps.spacing) != null ? _inProps$spacing : nested ? void 0 : spacingProp;
    const rowSpacing = (_ref = (_inProps$rowSpacing = inProps.rowSpacing) != null ? _inProps$rowSpacing : inProps.spacing) != null ? _ref : nested ? void 0 : rowSpacingProp;
    const columnSpacing = (_ref2 = (_inProps$columnSpacin = inProps.columnSpacing) != null ? _inProps$columnSpacin : inProps.spacing) != null ? _ref2 : nested ? void 0 : columnSpacingProp;
    const ownerState = _extends({}, props, {
      nested,
      columns,
      container,
      direction,
      wrap,
      spacing: spacing2,
      rowSpacing,
      columnSpacing,
      gridSize,
      gridOffset,
      disableEqualOverflow: (_ref3 = (_disableEqualOverflow = disableEqualOverflow) != null ? _disableEqualOverflow : overflow2) != null ? _ref3 : false,
      parentDisableEqualOverflow: overflow2
    });
    const classes = useUtilityClasses17(ownerState, theme);
    let result = (0, import_jsx_runtime17.jsx)(GridRoot, _extends({
      ref,
      as: component,
      ownerState,
      className: clsx_m_default(classes.root, className)
    }, other));
    if (!nested) {
      result = (0, import_jsx_runtime17.jsx)(NestedContext.Provider, {
        value: true,
        children: result
      });
    }
    if (disableEqualOverflow !== void 0 && disableEqualOverflow !== (overflow2 != null ? overflow2 : false)) {
      result = (0, import_jsx_runtime17.jsx)(OverflowContext.Provider, {
        value: disableEqualOverflow,
        children: result
      });
    }
    return result;
  });
  true ? Grid2.propTypes = {
    children: import_prop_types16.default.node,
    className: import_prop_types16.default.string,
    columns: import_prop_types16.default.oneOfType([import_prop_types16.default.arrayOf(import_prop_types16.default.number), import_prop_types16.default.number, import_prop_types16.default.object]),
    columnSpacing: import_prop_types16.default.oneOfType([import_prop_types16.default.arrayOf(import_prop_types16.default.oneOfType([import_prop_types16.default.number, import_prop_types16.default.string])), import_prop_types16.default.number, import_prop_types16.default.object, import_prop_types16.default.string]),
    component: import_prop_types16.default.elementType,
    container: import_prop_types16.default.bool,
    direction: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types16.default.arrayOf(import_prop_types16.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types16.default.object]),
    disableEqualOverflow: import_prop_types16.default.bool,
    lg: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["auto"]), import_prop_types16.default.number, import_prop_types16.default.bool]),
    lgOffset: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["auto"]), import_prop_types16.default.number]),
    md: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["auto"]), import_prop_types16.default.number, import_prop_types16.default.bool]),
    mdOffset: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["auto"]), import_prop_types16.default.number]),
    rowSpacing: import_prop_types16.default.oneOfType([import_prop_types16.default.arrayOf(import_prop_types16.default.oneOfType([import_prop_types16.default.number, import_prop_types16.default.string])), import_prop_types16.default.number, import_prop_types16.default.object, import_prop_types16.default.string]),
    sm: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["auto"]), import_prop_types16.default.number, import_prop_types16.default.bool]),
    smOffset: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["auto"]), import_prop_types16.default.number]),
    spacing: import_prop_types16.default.oneOfType([import_prop_types16.default.arrayOf(import_prop_types16.default.oneOfType([import_prop_types16.default.number, import_prop_types16.default.string])), import_prop_types16.default.number, import_prop_types16.default.object, import_prop_types16.default.string]),
    sx: import_prop_types16.default.oneOfType([import_prop_types16.default.arrayOf(import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object, import_prop_types16.default.bool])), import_prop_types16.default.func, import_prop_types16.default.object]),
    wrap: import_prop_types16.default.oneOf(["nowrap", "wrap-reverse", "wrap"]),
    xl: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["auto"]), import_prop_types16.default.number, import_prop_types16.default.bool]),
    xlOffset: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["auto"]), import_prop_types16.default.number]),
    xs: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["auto"]), import_prop_types16.default.number, import_prop_types16.default.bool]),
    xsOffset: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["auto"]), import_prop_types16.default.number])
  } : void 0;
  return Grid2;
}
var React19, import_prop_types16, import_jsx_runtime17, _excluded12, defaultTheme2, defaultCreateStyledComponent2;
var init_createGrid = __esm({
  "node_modules/@mui/system/esm/Unstable_Grid/createGrid.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React19 = __toESM(require_react());
    import_prop_types16 = __toESM(require_prop_types());
    init_clsx_m();
    init_esm();
    init_styled();
    init_useThemeProps2();
    init_useTheme2();
    init_styleFunctionSx2();
    init_createTheme2();
    init_gridGenerator();
    import_jsx_runtime17 = __toESM(require_jsx_runtime());
    _excluded12 = ["className", "columns", "container", "component", "direction", "wrap", "spacing", "rowSpacing", "columnSpacing", "disableEqualOverflow"];
    defaultTheme2 = createTheme_default();
    defaultCreateStyledComponent2 = styled_default("div", {
      name: "MuiGrid",
      slot: "Root",
      overridesResolver: (props, styles2) => styles2.root
    });
  }
});

// node_modules/@mui/system/esm/Unstable_Grid/Grid.js
var import_prop_types17, Grid;
var init_Grid = __esm({
  "node_modules/@mui/system/esm/Unstable_Grid/Grid.js"() {
    import_prop_types17 = __toESM(require_prop_types());
    init_createGrid();
    Grid = createGrid();
    true ? Grid.propTypes = {
      children: import_prop_types17.default.node,
      columns: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.number), import_prop_types17.default.number, import_prop_types17.default.object]),
      columnSpacing: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.number, import_prop_types17.default.string])), import_prop_types17.default.number, import_prop_types17.default.object, import_prop_types17.default.string]),
      container: import_prop_types17.default.bool,
      direction: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types17.default.arrayOf(import_prop_types17.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types17.default.object]),
      disableEqualOverflow: import_prop_types17.default.bool,
      lg: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["auto"]), import_prop_types17.default.number, import_prop_types17.default.bool]),
      lgOffset: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["auto"]), import_prop_types17.default.number]),
      md: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["auto"]), import_prop_types17.default.number, import_prop_types17.default.bool]),
      mdOffset: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["auto"]), import_prop_types17.default.number]),
      rowSpacing: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.number, import_prop_types17.default.string])), import_prop_types17.default.number, import_prop_types17.default.object, import_prop_types17.default.string]),
      sm: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["auto"]), import_prop_types17.default.number, import_prop_types17.default.bool]),
      smOffset: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["auto"]), import_prop_types17.default.number]),
      spacing: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.number, import_prop_types17.default.string])), import_prop_types17.default.number, import_prop_types17.default.object, import_prop_types17.default.string]),
      sx: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object, import_prop_types17.default.bool])), import_prop_types17.default.func, import_prop_types17.default.object]),
      wrap: import_prop_types17.default.oneOf(["nowrap", "wrap-reverse", "wrap"]),
      xl: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["auto"]), import_prop_types17.default.number, import_prop_types17.default.bool]),
      xlOffset: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["auto"]), import_prop_types17.default.number]),
      xs: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["auto"]), import_prop_types17.default.number, import_prop_types17.default.bool]),
      xsOffset: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["auto"]), import_prop_types17.default.number])
    } : void 0;
  }
});

// node_modules/@mui/system/esm/Unstable_Grid/GridProps.js
var init_GridProps = __esm({
  "node_modules/@mui/system/esm/Unstable_Grid/GridProps.js"() {
  }
});

// node_modules/@mui/system/esm/Unstable_Grid/gridClasses.js
var SPACINGS, DIRECTIONS, WRAPS, GRID_SIZES, gridClasses;
var init_gridClasses = __esm({
  "node_modules/@mui/system/esm/Unstable_Grid/gridClasses.js"() {
    init_esm();
    SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    DIRECTIONS = ["column-reverse", "column", "row-reverse", "row"];
    WRAPS = ["nowrap", "wrap-reverse", "wrap"];
    GRID_SIZES = ["auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    gridClasses = generateUtilityClasses("MuiGrid", [
      "root",
      "container",
      "item",
      ...SPACINGS.map((spacing2) => `spacing-xs-${spacing2}`),
      ...DIRECTIONS.map((direction) => `direction-xs-${direction}`),
      ...WRAPS.map((wrap) => `wrap-xs-${wrap}`),
      ...GRID_SIZES.map((size) => `grid-xs-${size}`),
      ...GRID_SIZES.map((size) => `grid-sm-${size}`),
      ...GRID_SIZES.map((size) => `grid-md-${size}`),
      ...GRID_SIZES.map((size) => `grid-lg-${size}`),
      ...GRID_SIZES.map((size) => `grid-xl-${size}`)
    ]);
  }
});

// node_modules/@mui/system/esm/Unstable_Grid/index.js
var init_Unstable_Grid = __esm({
  "node_modules/@mui/system/esm/Unstable_Grid/index.js"() {
    init_Grid();
    init_createGrid();
    init_GridProps();
    init_gridClasses();
    init_gridClasses();
  }
});

// node_modules/@mui/system/esm/index.js
var init_esm2 = __esm({
  "node_modules/@mui/system/esm/index.js"() {
    init_styled_engine();
    init_borders();
    init_borders();
    init_breakpoints();
    init_breakpoints();
    init_compose();
    init_display();
    init_flexbox();
    init_flexbox();
    init_cssGrid();
    init_cssGrid();
    init_palette();
    init_palette();
    init_positions();
    init_positions();
    init_shadows();
    init_sizing();
    init_sizing();
    init_spacing();
    init_spacing();
    init_style();
    init_typography();
    init_typography();
    init_styleFunctionSx2();
    init_sx2();
    init_getThemeValue();
    init_Box2();
    init_createBox();
    init_createStyled();
    init_createStyled();
    init_styled();
    init_createTheme2();
    init_createBreakpoints();
    init_createSpacing();
    init_shape();
    init_useThemeProps2();
    init_useTheme2();
    init_useThemeWithoutDefault();
    init_colorManipulator();
    init_ThemeProvider3();
    init_createCssVarsProvider();
    init_createGetCssVar();
    init_createContainer();
    init_Container2();
    init_Container2();
    init_Grid();
    init_Unstable_Grid();
  }
});

// node_modules/@mui/material/styles/createTransitions.js
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function createTransitions(inputTransitions) {
  const mergedEasing = _extends({}, easing, inputTransitions.easing);
  const mergedDuration = _extends({}, duration, inputTransitions.duration);
  const create = (props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options, other = _objectWithoutPropertiesLoose(options, _excluded13);
    if (true) {
      const isString = (value) => typeof value === "string";
      const isNumber = (value) => !isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  return _extends({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}
var _excluded13, easing, duration;
var init_createTransitions = __esm({
  "node_modules/@mui/material/styles/createTransitions.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    _excluded13 = ["duration", "easing", "delay"];
    easing = {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    };
    duration = {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    };
  }
});

// node_modules/@mui/base/BadgeUnstyled/useBadge.js
function useBadge(parameters) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false
  } = parameters;
  const prevProps = usePreviousProps_default({
    badgeContent: badgeContentProp,
    max: maxProp
  });
  let invisible = invisibleProp;
  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }
  const {
    badgeContent,
    max: max2 = maxProp
  } = invisible ? prevProps : parameters;
  const displayValue = badgeContent && Number(badgeContent) > max2 ? `${max2}+` : badgeContent;
  return {
    badgeContent,
    invisible,
    max: max2,
    displayValue
  };
}
var init_useBadge = __esm({
  "node_modules/@mui/base/BadgeUnstyled/useBadge.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/BadgeUnstyled/badgeUnstyledClasses.js
function getBadgeUnstyledUtilityClass(slot) {
  return generateUtilityClass("BaseBadge", slot);
}
var badgeUnstyledClasses;
var init_badgeUnstyledClasses = __esm({
  "node_modules/@mui/base/BadgeUnstyled/badgeUnstyledClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    badgeUnstyledClasses = generateUtilityClasses("BaseBadge", ["root", "badge", "invisible"]);
  }
});

// node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js
var React20, import_prop_types18, import_jsx_runtime18, import_jsx_runtime19, _excluded14, useUtilityClasses3, BadgeUnstyled, BadgeUnstyled_default;
var init_BadgeUnstyled = __esm({
  "node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React20 = __toESM(require_react());
    import_prop_types18 = __toESM(require_prop_types());
    init_composeClasses();
    init_useBadge();
    init_badgeUnstyledClasses();
    init_utils();
    import_jsx_runtime18 = __toESM(require_jsx_runtime());
    import_jsx_runtime19 = __toESM(require_jsx_runtime());
    _excluded14 = ["badgeContent", "component", "children", "components", "componentsProps", "invisible", "max", "showZero"];
    useUtilityClasses3 = (ownerState) => {
      const {
        invisible
      } = ownerState;
      const slots = {
        root: ["root"],
        badge: ["badge", invisible && "invisible"]
      };
      return composeClasses(slots, getBadgeUnstyledUtilityClass, void 0);
    };
    BadgeUnstyled = React20.forwardRef(function BadgeUnstyled2(props, ref) {
      const {
        component,
        children,
        components = {},
        componentsProps = {},
        max: maxProp = 99,
        showZero = false
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded14);
      const {
        badgeContent,
        max: max2,
        displayValue,
        invisible
      } = useBadge(_extends({}, props, {
        max: maxProp
      }));
      const ownerState = _extends({}, props, {
        badgeContent,
        invisible,
        max: max2,
        showZero
      });
      const classes = useUtilityClasses3(ownerState);
      const Root = component || components.Root || "span";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState,
        className: classes.root
      });
      const Badge = components.Badge || "span";
      const badgeProps = useSlotProps({
        elementType: Badge,
        externalSlotProps: componentsProps.badge,
        ownerState,
        className: classes.badge
      });
      return (0, import_jsx_runtime19.jsxs)(Root, _extends({}, rootProps, {
        children: [children, (0, import_jsx_runtime18.jsx)(Badge, _extends({}, badgeProps, {
          children: displayValue
        }))]
      }));
    });
    true ? BadgeUnstyled.propTypes = {
      badgeContent: import_prop_types18.default.node,
      children: import_prop_types18.default.node,
      component: import_prop_types18.default.elementType,
      components: import_prop_types18.default.shape({
        Badge: import_prop_types18.default.elementType,
        Root: import_prop_types18.default.elementType
      }),
      componentsProps: import_prop_types18.default.shape({
        badge: import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object]),
        root: import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object])
      }),
      invisible: import_prop_types18.default.bool,
      max: import_prop_types18.default.number,
      showZero: import_prop_types18.default.bool
    } : void 0;
    BadgeUnstyled_default = BadgeUnstyled;
  }
});

// node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.types.js
var init_BadgeUnstyled_types = __esm({
  "node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/BadgeUnstyled/index.js
var init_BadgeUnstyled2 = __esm({
  "node_modules/@mui/base/BadgeUnstyled/index.js"() {
    init_BadgeUnstyled();
    init_useBadge();
    init_useBadge();
    init_BadgeUnstyled_types();
    init_badgeUnstyledClasses();
    init_badgeUnstyledClasses();
  }
});

// node_modules/@mui/base/ButtonUnstyled/buttonUnstyledClasses.js
function getButtonUnstyledUtilityClass(slot) {
  return generateUtilityClass("ButtonUnstyled", slot);
}
var buttonUnstyledClasses;
var init_buttonUnstyledClasses = __esm({
  "node_modules/@mui/base/ButtonUnstyled/buttonUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    buttonUnstyledClasses = generateUtilityClasses("ButtonUnstyled", ["root", "active", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/ButtonUnstyled/useButton.js
function useButton(parameters) {
  const {
    disabled = false,
    focusableWhenDisabled,
    href,
    ref,
    tabIndex,
    to,
    type
  } = parameters;
  const buttonRef = React21.useRef();
  const [active, setActive] = React21.useState(false);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React21.useState(false);
  if (disabled && !focusableWhenDisabled && focusVisible) {
    setFocusVisible(false);
  }
  React21.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const [hostElementName, setHostElementName] = React21.useState("");
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    if (focusVisible) {
      event.preventDefault();
    }
    (_otherHandlers$onMous = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
  };
  const createHandleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu2;
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      var _otherHandlers$onFocu;
      setFocusVisible(true);
      (_otherHandlers$onFocu = otherHandlers.onFocusVisible) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    }
    (_otherHandlers$onFocu2 = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu2.call(otherHandlers, event);
  };
  const isNativeButton = () => {
    const button = buttonRef.current;
    return hostElementName === "BUTTON" || hostElementName === "INPUT" && ["button", "submit", "reset"].includes(button == null ? void 0 : button.type) || hostElementName === "A" && (button == null ? void 0 : button.href);
  };
  const createHandleClick = (otherHandlers) => (event) => {
    if (!disabled) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
    }
  };
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    if (event.target === event.currentTarget && !disabled) {
      setActive(true);
    }
    (_otherHandlers$onMous2 = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
  };
  const createHandleMouseUp = (otherHandlers) => (event) => {
    var _otherHandlers$onMous3;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_otherHandlers$onMous3 = otherHandlers.onMouseUp) == null ? void 0 : _otherHandlers$onMous3.call(otherHandlers, event);
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (event.target === event.currentTarget && event.key === " " && !disabled) {
      setActive(true);
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === "Enter" && !disabled) {
      var _otherHandlers$onClic2;
      (_otherHandlers$onClic2 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic2.call(otherHandlers, event);
      event.preventDefault();
    }
  };
  const createHandleKeyUp = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyU;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null ? void 0 : _otherHandlers$onKeyU.call(otherHandlers, event);
    if (event.target === event.currentTarget && !isNativeButton() && !disabled && event.key === " " && !event.defaultPrevented) {
      var _otherHandlers$onClic3;
      (_otherHandlers$onClic3 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic3.call(otherHandlers, event);
    }
  };
  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);
  const updateRef = (instance) => {
    var _instance$tagName;
    setHostElementName((_instance$tagName = instance == null ? void 0 : instance.tagName) != null ? _instance$tagName : "");
    setRef(handleRef, instance);
  };
  const buttonProps = {};
  if (hostElementName === "BUTTON") {
    buttonProps.type = type != null ? type : "button";
    if (focusableWhenDisabled) {
      buttonProps["aria-disabled"] = disabled;
    } else {
      buttonProps.disabled = disabled;
    }
  } else if (hostElementName !== "") {
    if (!href && !to) {
      buttonProps.role = "button";
      buttonProps.tabIndex = tabIndex != null ? tabIndex : 0;
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
      buttonProps.tabIndex = focusableWhenDisabled ? tabIndex != null ? tabIndex : 0 : -1;
    }
  }
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    delete externalEventHandlers.onFocusVisible;
    return _extends({
      type
    }, externalEventHandlers, buttonProps, {
      onBlur: createHandleBlur(externalEventHandlers),
      onClick: createHandleClick(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      onMouseUp: createHandleMouseUp(externalEventHandlers),
      ref: updateRef
    });
  };
  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    disabled,
    active
  };
}
var React21;
var init_useButton = __esm({
  "node_modules/@mui/base/ButtonUnstyled/useButton.js"() {
    init_extends();
    React21 = __toESM(require_react());
    init_esm();
    init_extractEventHandlers();
  }
});

// node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js
var React22, import_prop_types19, import_jsx_runtime20, _excluded15, useUtilityClasses4, ButtonUnstyled;
var init_ButtonUnstyled = __esm({
  "node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React22 = __toESM(require_react());
    import_prop_types19 = __toESM(require_prop_types());
    init_composeClasses();
    init_buttonUnstyledClasses();
    init_useButton();
    init_utils();
    import_jsx_runtime20 = __toESM(require_jsx_runtime());
    _excluded15 = ["action", "children", "component", "components", "componentsProps", "disabled", "focusableWhenDisabled", "onBlur", "onClick", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseLeave"];
    useUtilityClasses4 = (ownerState) => {
      const {
        active,
        disabled,
        focusVisible
      } = ownerState;
      const slots = {
        root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active"]
      };
      return composeClasses(slots, getButtonUnstyledUtilityClass, {});
    };
    ButtonUnstyled = React22.forwardRef(function ButtonUnstyled2(props, forwardedRef) {
      var _ref;
      const {
        action,
        children,
        component,
        components = {},
        componentsProps = {},
        focusableWhenDisabled = false
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded15);
      const buttonRef = React22.useRef();
      const {
        active,
        focusVisible,
        setFocusVisible,
        getRootProps
      } = useButton(_extends({}, props, {
        focusableWhenDisabled
      }));
      React22.useImperativeHandle(action, () => ({
        focusVisible: () => {
          setFocusVisible(true);
          buttonRef.current.focus();
        }
      }), [setFocusVisible]);
      const ownerState = _extends({}, props, {
        active,
        focusableWhenDisabled,
        focusVisible
      });
      const classes = useUtilityClasses4(ownerState);
      const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "button";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalForwardedProps: other,
        externalSlotProps: componentsProps.root,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime20.jsx)(Root, _extends({}, rootProps, {
        children
      }));
    });
    true ? ButtonUnstyled.propTypes = {
      action: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.shape({
        current: import_prop_types19.default.shape({
          focusVisible: import_prop_types19.default.func.isRequired
        })
      })]),
      children: import_prop_types19.default.node,
      component: import_prop_types19.default.elementType,
      components: import_prop_types19.default.shape({
        Root: import_prop_types19.default.elementType
      }),
      componentsProps: import_prop_types19.default.shape({
        root: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object])
      }),
      disabled: import_prop_types19.default.bool,
      focusableWhenDisabled: import_prop_types19.default.bool,
      onBlur: import_prop_types19.default.func,
      onClick: import_prop_types19.default.func,
      onFocus: import_prop_types19.default.func,
      onFocusVisible: import_prop_types19.default.func,
      onKeyDown: import_prop_types19.default.func,
      onKeyUp: import_prop_types19.default.func,
      onMouseLeave: import_prop_types19.default.func
    } : void 0;
  }
});

// node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.types.js
var init_ButtonUnstyled_types = __esm({
  "node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/ButtonUnstyled/useButton.types.js
var init_useButton_types = __esm({
  "node_modules/@mui/base/ButtonUnstyled/useButton.types.js"() {
  }
});

// node_modules/@mui/base/ButtonUnstyled/index.js
var init_ButtonUnstyled2 = __esm({
  "node_modules/@mui/base/ButtonUnstyled/index.js"() {
    init_ButtonUnstyled();
    init_buttonUnstyledClasses();
    init_ButtonUnstyled_types();
    init_useButton();
    init_useButton_types();
  }
});

// node_modules/@mui/base/FormControlUnstyled/FormControlUnstyledContext.js
var React23, FormControlUnstyledContext, FormControlUnstyledContext_default;
var init_FormControlUnstyledContext = __esm({
  "node_modules/@mui/base/FormControlUnstyled/FormControlUnstyledContext.js"() {
    React23 = __toESM(require_react());
    FormControlUnstyledContext = React23.createContext(void 0);
    if (true) {
      FormControlUnstyledContext.displayName = "FormControlUnstyledContext";
    }
    FormControlUnstyledContext_default = FormControlUnstyledContext;
  }
});

// node_modules/@mui/base/FormControlUnstyled/formControlUnstyledClasses.js
function getFormControlUnstyledUtilityClass(slot) {
  return generateUtilityClass("BaseFormControl", slot);
}
var formControlUnstyledClasses;
var init_formControlUnstyledClasses = __esm({
  "node_modules/@mui/base/FormControlUnstyled/formControlUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    formControlUnstyledClasses = generateUtilityClasses("BaseFormControl", ["root", "disabled", "error", "filled", "focused", "required"]);
  }
});

// node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== "";
}
function useUtilityClasses5(ownerState) {
  const {
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focused && "focused", error && "error", filled && "filled", required && "required"]
  };
  return composeClasses(slots, getFormControlUnstyledUtilityClass, {});
}
var React24, import_prop_types20, import_jsx_runtime21, _excluded16, FormControlUnstyled;
var init_FormControlUnstyled = __esm({
  "node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React24 = __toESM(require_react());
    import_prop_types20 = __toESM(require_prop_types());
    init_esm();
    init_FormControlUnstyledContext();
    init_formControlUnstyledClasses();
    init_utils();
    init_composeClasses();
    import_jsx_runtime21 = __toESM(require_jsx_runtime());
    _excluded16 = ["defaultValue", "children", "component", "components", "componentsProps", "disabled", "error", "onChange", "required", "value"];
    FormControlUnstyled = React24.forwardRef(function FormControlUnstyled2(props, ref) {
      var _ref;
      const {
        defaultValue,
        children,
        component,
        components = {},
        componentsProps = {},
        disabled = false,
        error = false,
        onChange,
        required = false,
        value: incomingValue
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded16);
      const [value, setValue] = useControlled({
        controlled: incomingValue,
        default: defaultValue,
        name: "FormControl",
        state: "value"
      });
      const filled = hasValue(value);
      const [focused, setFocused] = React24.useState(false);
      if (disabled && focused) {
        setFocused(false);
      }
      const ownerState = _extends({}, props, {
        disabled,
        error,
        filled,
        focused,
        required
      });
      const handleChange = (event) => {
        setValue(event.target.value);
        onChange == null ? void 0 : onChange(event);
      };
      const childContext = {
        disabled,
        error,
        filled,
        focused,
        onBlur: () => {
          setFocused(false);
        },
        onChange: handleChange,
        onFocus: () => {
          setFocused(true);
        },
        required,
        value: value != null ? value : ""
      };
      const classes = useUtilityClasses5(ownerState);
      const renderChildren = () => {
        if (typeof children === "function") {
          return children(childContext);
        }
        return children;
      };
      const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref,
          children: renderChildren()
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime21.jsx)(FormControlUnstyledContext_default.Provider, {
        value: childContext,
        children: (0, import_jsx_runtime21.jsx)(Root, _extends({}, rootProps))
      });
    });
    true ? FormControlUnstyled.propTypes = {
      children: import_prop_types20.default.oneOfType([import_prop_types20.default.node, import_prop_types20.default.func]),
      component: import_prop_types20.default.elementType,
      components: import_prop_types20.default.shape({
        Root: import_prop_types20.default.elementType
      }),
      componentsProps: import_prop_types20.default.shape({
        root: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object])
      }),
      defaultValue: import_prop_types20.default.any,
      disabled: import_prop_types20.default.bool,
      error: import_prop_types20.default.bool,
      onChange: import_prop_types20.default.func,
      required: import_prop_types20.default.bool,
      value: import_prop_types20.default.any
    } : void 0;
  }
});

// node_modules/@mui/base/FormControlUnstyled/useFormControlUnstyledContext.js
function useFormControlUnstyledContext() {
  return React25.useContext(FormControlUnstyledContext_default);
}
var React25;
var init_useFormControlUnstyledContext = __esm({
  "node_modules/@mui/base/FormControlUnstyled/useFormControlUnstyledContext.js"() {
    React25 = __toESM(require_react());
    init_FormControlUnstyledContext();
  }
});

// node_modules/@mui/base/FormControlUnstyled/index.js
var init_FormControlUnstyled2 = __esm({
  "node_modules/@mui/base/FormControlUnstyled/index.js"() {
    init_FormControlUnstyled();
    init_FormControlUnstyledContext();
    init_formControlUnstyledClasses();
    init_formControlUnstyledClasses();
    init_useFormControlUnstyledContext();
  }
});

// node_modules/@mui/base/InputUnstyled/inputUnstyledClasses.js
var inputBaseClasses, inputUnstyledClasses_default;
var init_inputUnstyledClasses = __esm({
  "node_modules/@mui/base/InputUnstyled/inputUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    inputBaseClasses = generateUtilityClasses("MuiInput", ["root", "formControl", "focused", "disabled", "error", "multiline", "input", "inputMultiline", "inputTypeSearch", "adornedStart", "adornedEnd"]);
    inputUnstyledClasses_default = inputBaseClasses;
  }
});

// node_modules/@mui/base/InputUnstyled/useInput.js
function useInput(parameters) {
  const {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    required: requiredProp = false,
    value: valueProp
  } = parameters;
  const formControlContext = useFormControlUnstyledContext();
  let defaultValue;
  let disabled;
  let error;
  let required;
  let value;
  if (formControlContext) {
    var _formControlContext$d, _formControlContext$e, _formControlContext$r;
    defaultValue = void 0;
    disabled = (_formControlContext$d = formControlContext.disabled) != null ? _formControlContext$d : false;
    error = (_formControlContext$e = formControlContext.error) != null ? _formControlContext$e : false;
    required = (_formControlContext$r = formControlContext.required) != null ? _formControlContext$r : false;
    value = formControlContext.value;
    if (true) {
      const definedLocalProps = ["defaultValue", "disabled", "error", "required", "value"].filter((prop) => parameters[prop] !== void 0);
      if (definedLocalProps.length > 0) {
        console.warn(["MUI: You have set props on an input that is inside a FormControlUnstyled.", "Set these props on a FormControlUnstyled instead. Otherwise they will be ignored.", `Ignored props: ${definedLocalProps.join(", ")}`].join("\n"));
      }
    }
  } else {
    defaultValue = defaultValueProp;
    disabled = disabledProp;
    error = errorProp;
    required = requiredProp;
    value = valueProp;
  }
  const {
    current: isControlled
  } = React26.useRef(value != null);
  const handleInputRefWarning = React26.useCallback((instance) => {
    if (true) {
      if (instance && instance.nodeName !== "INPUT" && !instance.focus) {
        console.error(["MUI: You have provided a `components.Input` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join("\n"));
      }
    }
  }, []);
  const inputRef = React26.useRef(null);
  const handleInputRef = useForkRef(inputRef, handleInputRefWarning);
  const [focused, setFocused] = React26.useState(false);
  React26.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false);
      onBlur == null ? void 0 : onBlur();
    }
  }, [formControlContext, disabled, focused, onBlur]);
  const handleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    if (formControlContext != null && formControlContext.disabled) {
      event.stopPropagation();
      return;
    }
    (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    if (formControlContext && formControlContext.onFocus) {
      var _formControlContext$o;
      formControlContext == null ? void 0 : (_formControlContext$o = formControlContext.onFocus) == null ? void 0 : _formControlContext$o.call(formControlContext);
    } else {
      setFocused(true);
    }
  };
  const handleBlur2 = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };
  const handleChange = (otherHandlers) => (event, ...args) => {
    var _formControlContext$o2, _otherHandlers$onChan;
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(true ? `MUI: Expected valid input target. Did you use a custom \`components.Input\` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.` : formatMuiErrorMessage(17));
      }
    }
    formControlContext == null ? void 0 : (_formControlContext$o2 = formControlContext.onChange) == null ? void 0 : _formControlContext$o2.call(formControlContext, event);
    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event, ...args);
  };
  const handleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
  };
  const getRootProps = (externalProps = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters, ["onBlur", "onChange", "onFocus"]);
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: handleClick(externalEventHandlers)
    });
  };
  const getInputProps = (externalProps = {}) => {
    const propsEventHandlers = {
      onBlur,
      onChange,
      onFocus
    };
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    const mergedEventHandlers = _extends({}, externalProps, externalEventHandlers, {
      onBlur: handleBlur2(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers)
    });
    return _extends({}, mergedEventHandlers, {
      "aria-invalid": error || void 0,
      defaultValue,
      ref: handleInputRef,
      value,
      required,
      disabled
    });
  };
  return {
    disabled,
    error,
    focused,
    formControlContext,
    getInputProps,
    getRootProps,
    required,
    value
  };
}
var React26;
var init_useInput = __esm({
  "node_modules/@mui/base/InputUnstyled/useInput.js"() {
    init_extends();
    init_esm();
    React26 = __toESM(require_react());
    init_esm();
    init_FormControlUnstyled2();
    init_extractEventHandlers();
  }
});

// node_modules/@mui/base/InputUnstyled/InputUnstyled.js
var React27, import_prop_types21, import_jsx_runtime22, import_jsx_runtime23, _excluded17, _excluded23, InputUnstyled;
var init_InputUnstyled = __esm({
  "node_modules/@mui/base/InputUnstyled/InputUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React27 = __toESM(require_react());
    import_prop_types21 = __toESM(require_prop_types());
    init_isHostComponent();
    init_inputUnstyledClasses();
    init_useInput();
    init_utils();
    import_jsx_runtime22 = __toESM(require_jsx_runtime());
    import_jsx_runtime23 = __toESM(require_jsx_runtime());
    _excluded17 = ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "component", "components", "componentsProps", "defaultValue", "disabled", "endAdornment", "error", "id", "maxRows", "minRows", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "rows", "type", "startAdornment", "value"];
    _excluded23 = ["ownerState"];
    InputUnstyled = React27.forwardRef(function InputUnstyled2(props, forwardedRef) {
      var _ref, _components$Input;
      const {
        "aria-describedby": ariaDescribedby,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        autoComplete,
        autoFocus,
        className,
        component,
        components = {},
        componentsProps = {},
        defaultValue,
        disabled,
        endAdornment,
        error,
        id,
        maxRows,
        minRows,
        multiline = false,
        name,
        onClick,
        onChange,
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur,
        placeholder,
        readOnly,
        required,
        rows,
        type = "text",
        startAdornment,
        value
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded17);
      const {
        getRootProps,
        getInputProps,
        focused,
        formControlContext,
        error: errorState,
        disabled: disabledState
      } = useInput({
        disabled,
        defaultValue,
        error,
        onBlur,
        onClick,
        onChange,
        onFocus,
        required,
        value
      });
      const ownerState = _extends({}, props, {
        disabled: disabledState,
        error: errorState,
        focused,
        formControlContext,
        multiline,
        type
      });
      const rootStateClasses = {
        [inputUnstyledClasses_default.disabled]: disabledState,
        [inputUnstyledClasses_default.error]: errorState,
        [inputUnstyledClasses_default.focused]: focused,
        [inputUnstyledClasses_default.formControl]: Boolean(formControlContext),
        [inputUnstyledClasses_default.multiline]: multiline,
        [inputUnstyledClasses_default.adornedStart]: Boolean(startAdornment),
        [inputUnstyledClasses_default.adornedEnd]: Boolean(endAdornment)
      };
      const inputStateClasses = {
        [inputUnstyledClasses_default.disabled]: disabledState,
        [inputUnstyledClasses_default.multiline]: multiline
      };
      const propsToForward = {
        "aria-describedby": ariaDescribedby,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        autoComplete,
        autoFocus,
        id,
        onKeyDown,
        onKeyUp,
        name,
        placeholder,
        readOnly,
        type
      };
      const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: [inputUnstyledClasses_default.root, rootStateClasses, className]
      });
      let Input = (_components$Input = components.Input) != null ? _components$Input : "input";
      let inputProps = useSlotProps({
        elementType: Input,
        getSlotProps: (otherHandlers) => getInputProps(_extends({}, otherHandlers, propsToForward)),
        externalSlotProps: componentsProps.input,
        ownerState,
        className: [inputUnstyledClasses_default.input, inputStateClasses]
      });
      if (multiline) {
        var _components$Textarea, _components$Textarea2;
        const hasHostTextarea = isHostComponent_default((_components$Textarea = components.Textarea) != null ? _components$Textarea : "textarea");
        const inputPropsWithoutOwnerState = _objectWithoutPropertiesLoose(inputProps, _excluded23);
        if (rows) {
          if (true) {
            if (minRows || maxRows) {
              console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.");
            }
          }
        }
        inputProps = _extends({}, !hasHostTextarea && {
          minRows: rows || minRows,
          maxRows: rows || maxRows
        }, hasHostTextarea ? inputPropsWithoutOwnerState : inputProps, {
          type: void 0
        });
        Input = (_components$Textarea2 = components.Textarea) != null ? _components$Textarea2 : "textarea";
      }
      return (0, import_jsx_runtime23.jsxs)(Root, _extends({}, rootProps, {
        children: [startAdornment, (0, import_jsx_runtime22.jsx)(Input, _extends({}, inputProps)), endAdornment]
      }));
    });
    true ? InputUnstyled.propTypes = {
      "aria-describedby": import_prop_types21.default.string,
      "aria-label": import_prop_types21.default.string,
      "aria-labelledby": import_prop_types21.default.string,
      autoComplete: import_prop_types21.default.string,
      autoFocus: import_prop_types21.default.bool,
      children: import_prop_types21.default.node,
      className: import_prop_types21.default.string,
      component: import_prop_types21.default.elementType,
      components: import_prop_types21.default.shape({
        Input: import_prop_types21.default.elementType,
        Root: import_prop_types21.default.elementType,
        Textarea: import_prop_types21.default.elementType
      }),
      componentsProps: import_prop_types21.default.shape({
        input: import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.object]),
        root: import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.object])
      }),
      defaultValue: import_prop_types21.default.any,
      disabled: import_prop_types21.default.bool,
      endAdornment: import_prop_types21.default.node,
      error: import_prop_types21.default.bool,
      id: import_prop_types21.default.string,
      maxRows: import_prop_types21.default.number,
      minRows: import_prop_types21.default.number,
      multiline: import_prop_types21.default.bool,
      name: import_prop_types21.default.string,
      onBlur: import_prop_types21.default.func,
      onChange: import_prop_types21.default.func,
      onClick: import_prop_types21.default.func,
      onFocus: import_prop_types21.default.func,
      onKeyDown: import_prop_types21.default.func,
      onKeyUp: import_prop_types21.default.func,
      placeholder: import_prop_types21.default.string,
      readOnly: import_prop_types21.default.bool,
      required: import_prop_types21.default.bool,
      rows: import_prop_types21.default.number,
      startAdornment: import_prop_types21.default.node,
      type: import_prop_types21.default.oneOf(["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"]),
      value: import_prop_types21.default.any
    } : void 0;
  }
});

// node_modules/@mui/base/InputUnstyled/InputUnstyled.types.js
var init_InputUnstyled_types = __esm({
  "node_modules/@mui/base/InputUnstyled/InputUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/InputUnstyled/useInput.types.js
var init_useInput_types = __esm({
  "node_modules/@mui/base/InputUnstyled/useInput.types.js"() {
  }
});

// node_modules/@mui/base/InputUnstyled/index.js
var init_InputUnstyled2 = __esm({
  "node_modules/@mui/base/InputUnstyled/index.js"() {
    init_InputUnstyled();
    init_InputUnstyled_types();
    init_useInput();
    init_useInput_types();
    init_inputUnstyledClasses();
    init_inputUnstyledClasses();
  }
});

// node_modules/@mui/base/ListboxUnstyled/useListbox.types.js
var ActionTypes;
var init_useListbox_types = __esm({
  "node_modules/@mui/base/ListboxUnstyled/useListbox.types.js"() {
    (function(ActionTypes2) {
      ActionTypes2["blur"] = "blur";
      ActionTypes2["focus"] = "focus";
      ActionTypes2["keyDown"] = "keyDown";
      ActionTypes2["optionClick"] = "optionClick";
      ActionTypes2["optionHover"] = "optionHover";
      ActionTypes2["optionsChange"] = "optionsChange";
      ActionTypes2["setValue"] = "setValue";
      ActionTypes2["setHighlight"] = "setHighlight";
      ActionTypes2["textNavigation"] = "textNagivation";
    })(ActionTypes || (ActionTypes = {}));
  }
});

// node_modules/@mui/base/ListboxUnstyled/defaultListboxReducer.js
function findValidOptionToHighlight(index, lookupDirection, options, focusDisabled, isOptionDisabled, wrapAround) {
  if (options.length === 0 || options.every((o, i) => isOptionDisabled(o, i))) {
    return -1;
  }
  let nextFocus = index;
  for (; ; ) {
    if (!wrapAround && lookupDirection === "next" && nextFocus === options.length || !wrapAround && lookupDirection === "previous" && nextFocus === -1) {
      return -1;
    }
    const nextFocusDisabled = focusDisabled ? false : isOptionDisabled(options[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += lookupDirection === "next" ? 1 : -1;
      if (wrapAround) {
        nextFocus = (nextFocus + options.length) % options.length;
      }
    } else {
      return nextFocus;
    }
  }
}
function getNewHighlightedOption(options, previouslyHighlightedOption, diff, lookupDirection, highlightDisabled, isOptionDisabled, wrapAround, optionComparer) {
  var _options$nextIndex;
  const maxIndex = options.length - 1;
  const defaultHighlightedIndex = -1;
  let nextIndexCandidate;
  const previouslyHighlightedIndex = previouslyHighlightedOption == null ? -1 : options.findIndex((option) => optionComparer(option, previouslyHighlightedOption));
  if (diff === "reset") {
    var _options$defaultHighl;
    return defaultHighlightedIndex === -1 ? null : (_options$defaultHighl = options[defaultHighlightedIndex]) != null ? _options$defaultHighl : null;
  }
  if (diff === "start") {
    nextIndexCandidate = 0;
  } else if (diff === "end") {
    nextIndexCandidate = maxIndex;
  } else {
    const newIndex = previouslyHighlightedIndex + diff;
    if (newIndex < 0) {
      if (!wrapAround && previouslyHighlightedIndex !== -1 || Math.abs(diff) > 1) {
        nextIndexCandidate = 0;
      } else {
        nextIndexCandidate = maxIndex;
      }
    } else if (newIndex > maxIndex) {
      if (!wrapAround || Math.abs(diff) > 1) {
        nextIndexCandidate = maxIndex;
      } else {
        nextIndexCandidate = 0;
      }
    } else {
      nextIndexCandidate = newIndex;
    }
  }
  const nextIndex = findValidOptionToHighlight(nextIndexCandidate, lookupDirection, options, highlightDisabled, isOptionDisabled, wrapAround);
  return (_options$nextIndex = options[nextIndex]) != null ? _options$nextIndex : null;
}
function handleOptionSelection(option, state, props) {
  const {
    multiple,
    optionComparer = (o, v) => o === v,
    isOptionDisabled = () => false
  } = props;
  const {
    selectedValue
  } = state;
  const optionIndex = props.options.findIndex((o) => props.optionComparer(option, o));
  if (isOptionDisabled(option, optionIndex)) {
    return state;
  }
  if (multiple) {
    var _ref, _ref2;
    const selectedValues = (_ref = selectedValue) != null ? _ref : [];
    const newSelectedValues = selectedValues.some((sv) => optionComparer(sv, option)) ? selectedValue.filter((v) => !optionComparer(v, option)) : [...(_ref2 = selectedValue) != null ? _ref2 : [], option];
    return {
      selectedValue: newSelectedValues,
      highlightedValue: option
    };
  }
  if (selectedValue != null && optionComparer(option, selectedValue)) {
    return state;
  }
  return {
    selectedValue: option,
    highlightedValue: option
  };
}
function handleKeyDown(event, state, props) {
  const {
    options,
    isOptionDisabled,
    disableListWrap,
    disabledItemsFocusable,
    optionComparer
  } = props;
  const moveHighlight = (diff, direction, wrapAround) => {
    return getNewHighlightedOption(options, state.highlightedValue, diff, direction, disabledItemsFocusable != null ? disabledItemsFocusable : false, isOptionDisabled != null ? isOptionDisabled : () => false, wrapAround, optionComparer);
  };
  switch (event.key) {
    case "Home":
      return _extends({}, state, {
        highlightedValue: moveHighlight("start", "next", false)
      });
    case "End":
      return _extends({}, state, {
        highlightedValue: moveHighlight("end", "previous", false)
      });
    case "PageUp":
      return _extends({}, state, {
        highlightedValue: moveHighlight(-pageSize2, "previous", false)
      });
    case "PageDown":
      return _extends({}, state, {
        highlightedValue: moveHighlight(pageSize2, "next", false)
      });
    case "ArrowUp":
      return _extends({}, state, {
        highlightedValue: moveHighlight(-1, "previous", !(disableListWrap != null ? disableListWrap : false))
      });
    case "ArrowDown":
      return _extends({}, state, {
        highlightedValue: moveHighlight(1, "next", !(disableListWrap != null ? disableListWrap : false))
      });
    case "Enter":
    case " ":
      if (state.highlightedValue === null) {
        return state;
      }
      return handleOptionSelection(state.highlightedValue, state, props);
    default:
      break;
  }
  return state;
}
function handleBlur(state) {
  return _extends({}, state, {
    highlightedValue: null
  });
}
function handleTextNavigation(state, searchString, props) {
  const {
    options,
    isOptionDisabled,
    disableListWrap,
    disabledItemsFocusable,
    optionComparer,
    optionStringifier
  } = props;
  const moveHighlight = (previouslyHighlightedOption) => {
    return getNewHighlightedOption(options, previouslyHighlightedOption, 1, "next", disabledItemsFocusable != null ? disabledItemsFocusable : false, isOptionDisabled != null ? isOptionDisabled : () => false, !(disableListWrap != null ? disableListWrap : false), optionComparer);
  };
  const startWithCurrentOption = searchString.length > 1;
  let nextOption = startWithCurrentOption ? state.highlightedValue : moveHighlight(state.highlightedValue);
  for (let index = 0; index < options.length; index += 1) {
    if (!nextOption || !startWithCurrentOption && state.highlightedValue === nextOption) {
      return state;
    }
    if (textCriteriaMatches(nextOption, searchString, optionStringifier) && (!isOptionDisabled(nextOption, options.indexOf(nextOption)) || disabledItemsFocusable)) {
      return _extends({}, state, {
        highlightedValue: nextOption
      });
    }
    nextOption = moveHighlight(nextOption);
  }
  return state;
}
function handleOptionsChange(options, previousOptions, state, props) {
  var _options$find, _options$find2;
  const {
    multiple,
    optionComparer
  } = props;
  const newHighlightedOption = state.highlightedValue == null ? null : (_options$find = options.find((option) => optionComparer(option, state.highlightedValue))) != null ? _options$find : null;
  if (multiple) {
    var _ref3;
    const selectedValues = (_ref3 = state.selectedValue) != null ? _ref3 : [];
    const newSelectedValues = selectedValues.filter((selectedValue) => options.some((option) => optionComparer(option, selectedValue)));
    return {
      highlightedValue: newHighlightedOption,
      selectedValue: newSelectedValues
    };
  }
  const newSelectedValue = (_options$find2 = options.find((option) => optionComparer(option, state.selectedValue))) != null ? _options$find2 : null;
  return {
    highlightedValue: newHighlightedOption,
    selectedValue: newSelectedValue
  };
}
function defaultListboxReducer(state, action) {
  const {
    type
  } = action;
  switch (type) {
    case ActionTypes.keyDown:
      return handleKeyDown(action.event, state, action.props);
    case ActionTypes.optionClick:
      return handleOptionSelection(action.option, state, action.props);
    case ActionTypes.blur:
      return handleBlur(state);
    case ActionTypes.setValue:
      return _extends({}, state, {
        selectedValue: action.value
      });
    case ActionTypes.setHighlight:
      return _extends({}, state, {
        highlightedValue: action.highlight
      });
    case ActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, action.props);
    case ActionTypes.optionsChange:
      return handleOptionsChange(action.options, action.previousOptions, state, action.props);
    default:
      return state;
  }
}
var pageSize2, textCriteriaMatches;
var init_defaultListboxReducer = __esm({
  "node_modules/@mui/base/ListboxUnstyled/defaultListboxReducer.js"() {
    init_extends();
    init_useListbox_types();
    pageSize2 = 5;
    textCriteriaMatches = (nextFocus, searchString, stringifyOption) => {
      var _stringifyOption;
      const text = (_stringifyOption = stringifyOption(nextFocus)) == null ? void 0 : _stringifyOption.trim().toLowerCase();
      if (!text || text.length === 0) {
        return false;
      }
      return text.indexOf(searchString) === 0;
    };
  }
});

// node_modules/@mui/base/ListboxUnstyled/useControllableReducer.js
function getControlledState(internalState, props) {
  if (props.value !== void 0) {
    return _extends({}, internalState, {
      selectedValue: props.value
    });
  }
  return internalState;
}
function areOptionsEqual(option1, option2, optionComparer) {
  if (option1 === option2) {
    return true;
  }
  if (option1 === null || option2 === null) {
    return false;
  }
  return optionComparer(option1, option2);
}
function useStateChangeDetection(nextState, internalPreviousState, propsRef) {
  React28.useEffect(() => {
    if (!propsRef.current) {
      return;
    }
    const previousState = getControlledState(internalPreviousState, propsRef.current);
    const {
      multiple,
      optionComparer
    } = propsRef.current;
    if (multiple) {
      var _previousState$select;
      const previousSelectedValues = (_previousState$select = previousState == null ? void 0 : previousState.selectedValue) != null ? _previousState$select : [];
      const nextSelectedValues = nextState.selectedValue;
      const onChange = propsRef.current.onChange;
      if (!areArraysEqual(nextSelectedValues, previousSelectedValues, optionComparer)) {
        onChange == null ? void 0 : onChange(nextSelectedValues);
      }
    } else {
      const previousSelectedValue = previousState == null ? void 0 : previousState.selectedValue;
      const nextSelectedValue = nextState.selectedValue;
      const onChange = propsRef.current.onChange;
      if (!areOptionsEqual(nextSelectedValue, previousSelectedValue, optionComparer)) {
        onChange == null ? void 0 : onChange(nextSelectedValue);
      }
    }
  }, [nextState.selectedValue, internalPreviousState, propsRef]);
  React28.useEffect(() => {
    if (!propsRef.current) {
      return;
    }
    if (!areOptionsEqual(internalPreviousState.highlightedValue, nextState.highlightedValue, propsRef.current.optionComparer)) {
      var _propsRef$current, _propsRef$current$onH;
      (_propsRef$current = propsRef.current) == null ? void 0 : (_propsRef$current$onH = _propsRef$current.onHighlightChange) == null ? void 0 : _propsRef$current$onH.call(_propsRef$current, nextState.highlightedValue);
    }
  }, [nextState.highlightedValue, internalPreviousState.highlightedValue, propsRef]);
}
function useControllableReducer(internalReducer, externalReducer, props) {
  var _ref;
  const {
    value,
    defaultValue
  } = props;
  const propsRef = React28.useRef(props);
  propsRef.current = props;
  const initialSelectedValue = (_ref = value === void 0 ? defaultValue : value) != null ? _ref : props.multiple ? [] : null;
  const initalState = {
    highlightedValue: null,
    selectedValue: initialSelectedValue
  };
  const combinedReducer = React28.useCallback((state, action) => {
    if (externalReducer) {
      return externalReducer(getControlledState(state, propsRef.current), action);
    }
    return internalReducer(getControlledState(state, propsRef.current), action);
  }, [externalReducer, internalReducer, propsRef]);
  const [nextState, dispatch] = React28.useReducer(combinedReducer, initalState);
  const previousState = React28.useRef(initalState);
  React28.useEffect(() => {
    previousState.current = nextState;
  }, [previousState, nextState]);
  useStateChangeDetection(nextState, previousState.current, propsRef);
  return [getControlledState(nextState, propsRef.current), dispatch];
}
var React28;
var init_useControllableReducer = __esm({
  "node_modules/@mui/base/ListboxUnstyled/useControllableReducer.js"() {
    init_extends();
    React28 = __toESM(require_react());
    init_areArraysEqual();
  }
});

// node_modules/@mui/base/ListboxUnstyled/useListbox.js
function useListbox(props) {
  var _props$optionIdGenera, _options$highlightedI;
  const {
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = "activeDescendant",
    id: idProp,
    isOptionDisabled = defaultIsOptionDisabled,
    listboxRef: externalListboxRef,
    multiple = false,
    optionComparer = defaultOptionComparer,
    optionStringifier = defaultOptionStringifier,
    options,
    stateReducer: externalReducer
  } = props;
  const id = useId(idProp);
  function defaultIdGenerator(_, index) {
    return `${id}-option-${index}`;
  }
  const optionIdGenerator = (_props$optionIdGenera = props.optionIdGenerator) != null ? _props$optionIdGenera : defaultIdGenerator;
  const propsWithDefaults = _extends({}, props, {
    disabledItemsFocusable,
    disableListWrap,
    focusManagement,
    isOptionDisabled,
    multiple,
    optionComparer,
    optionStringifier
  });
  const listboxRef = React29.useRef(null);
  const handleRef = useForkRef(externalListboxRef, listboxRef);
  const textCriteriaRef = React29.useRef({
    searchString: "",
    lastTime: null
  });
  const [{
    highlightedValue,
    selectedValue
  }, dispatch] = useControllableReducer(defaultListboxReducer, externalReducer, propsWithDefaults);
  const highlightedIndex = React29.useMemo(() => {
    return highlightedValue == null ? -1 : options.findIndex((option) => optionComparer(option, highlightedValue));
  }, [highlightedValue, options, optionComparer]);
  const previousOptions = React29.useRef([]);
  React29.useEffect(() => {
    if (areArraysEqual(previousOptions.current, options, optionComparer)) {
      return;
    }
    dispatch({
      type: ActionTypes.optionsChange,
      options,
      previousOptions: previousOptions.current,
      props: propsWithDefaults
    });
    previousOptions.current = options;
  }, [options, optionComparer, dispatch]);
  const setSelectedValue = React29.useCallback((option) => {
    dispatch({
      type: ActionTypes.setValue,
      value: option
    });
  }, [dispatch]);
  const setHighlightedValue = React29.useCallback((option) => {
    dispatch({
      type: ActionTypes.setHighlight,
      highlight: option
    });
  }, [dispatch]);
  const createHandleOptionClick = (option, other) => (event) => {
    var _other$onClick;
    (_other$onClick = other.onClick) == null ? void 0 : _other$onClick.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    dispatch({
      type: ActionTypes.optionClick,
      option,
      event,
      props: propsWithDefaults
    });
  };
  const createHandleOptionMouseOver = (option, other) => (event) => {
    var _other$onMouseOver;
    (_other$onMouseOver = other.onMouseOver) == null ? void 0 : _other$onMouseOver.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    dispatch({
      type: ActionTypes.optionHover,
      option,
      event,
      props: propsWithDefaults
    });
  };
  const createHandleKeyDown = (other) => (event) => {
    var _other$onKeyDown;
    (_other$onKeyDown = other.onKeyDown) == null ? void 0 : _other$onKeyDown.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    const keysToPreventDefault = ["ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"];
    if (focusManagement === "activeDescendant") {
      keysToPreventDefault.push(" ", "Enter");
    }
    if (keysToPreventDefault.includes(event.key)) {
      event.preventDefault();
    }
    dispatch({
      type: ActionTypes.keyDown,
      event,
      props: propsWithDefaults
    });
    if (event.key.length === 1 && event.key !== " ") {
      const textCriteria = textCriteriaRef.current;
      const lowerKey = event.key.toLowerCase();
      const currentTime = performance.now();
      if (textCriteria.searchString.length > 0 && textCriteria.lastTime && currentTime - textCriteria.lastTime > TEXT_NAVIGATION_RESET_TIMEOUT) {
        textCriteria.searchString = lowerKey;
      } else if (textCriteria.searchString.length !== 1 || lowerKey !== textCriteria.searchString) {
        textCriteria.searchString += lowerKey;
      }
      textCriteria.lastTime = currentTime;
      dispatch({
        type: ActionTypes.textNavigation,
        searchString: textCriteria.searchString,
        props: propsWithDefaults
      });
    }
  };
  const createHandleBlur = (other) => (event) => {
    var _other$onBlur, _listboxRef$current;
    (_other$onBlur = other.onBlur) == null ? void 0 : _other$onBlur.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    if ((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(document.activeElement)) {
      return;
    }
    dispatch({
      type: ActionTypes.blur,
      event,
      props: propsWithDefaults
    });
  };
  const getRootProps = (otherHandlers = {}) => {
    return _extends({}, otherHandlers, {
      "aria-activedescendant": focusManagement === "activeDescendant" && highlightedValue != null ? optionIdGenerator(highlightedValue, highlightedIndex) : void 0,
      id,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
      role: "listbox",
      tabIndex: focusManagement === "DOM" ? -1 : 0,
      ref: handleRef
    });
  };
  const getOptionState = (option) => {
    let selected;
    const index = options.findIndex((opt) => optionComparer(opt, option));
    if (multiple) {
      var _ref;
      selected = ((_ref = selectedValue) != null ? _ref : []).some((value) => value != null && optionComparer(option, value));
    } else {
      selected = optionComparer(option, selectedValue);
    }
    const disabled = isOptionDisabled(option, index);
    return {
      selected,
      disabled,
      highlighted: highlightedIndex === index
    };
  };
  const getOptionTabIndex = (optionState) => {
    if (focusManagement === "activeDescendant") {
      return void 0;
    }
    if (!optionState.highlighted) {
      return -1;
    }
    if (optionState.disabled && !disabledItemsFocusable) {
      return -1;
    }
    return 0;
  };
  const getOptionProps = (option, otherHandlers = {}) => {
    const optionState = getOptionState(option);
    const index = options.findIndex((opt) => optionComparer(opt, option));
    return _extends({}, otherHandlers, {
      "aria-disabled": optionState.disabled || void 0,
      "aria-selected": optionState.selected,
      tabIndex: getOptionTabIndex(optionState),
      id: optionIdGenerator(option, index),
      onClick: createHandleOptionClick(option, otherHandlers),
      onMouseOver: createHandleOptionMouseOver(option, otherHandlers),
      role: "option"
    });
  };
  React29.useDebugValue({
    highlightedOption: options[highlightedIndex],
    selectedOption: selectedValue
  });
  return {
    getRootProps,
    getOptionProps,
    getOptionState,
    highlightedOption: (_options$highlightedI = options[highlightedIndex]) != null ? _options$highlightedI : null,
    selectedOption: selectedValue,
    setSelectedValue,
    setHighlightedValue
  };
}
var React29, TEXT_NAVIGATION_RESET_TIMEOUT, defaultOptionComparer, defaultIsOptionDisabled, defaultOptionStringifier;
var init_useListbox = __esm({
  "node_modules/@mui/base/ListboxUnstyled/useListbox.js"() {
    init_extends();
    React29 = __toESM(require_react());
    init_esm();
    init_useListbox_types();
    init_defaultListboxReducer();
    init_useControllableReducer();
    init_areArraysEqual();
    TEXT_NAVIGATION_RESET_TIMEOUT = 500;
    defaultOptionComparer = (optionA, optionB) => optionA === optionB;
    defaultIsOptionDisabled = () => false;
    defaultOptionStringifier = (option) => typeof option === "string" ? option : String(option);
  }
});

// node_modules/@mui/base/ListboxUnstyled/index.js
var init_ListboxUnstyled = __esm({
  "node_modules/@mui/base/ListboxUnstyled/index.js"() {
    init_useListbox();
    init_defaultListboxReducer();
    init_useListbox_types();
  }
});

// node_modules/@mui/base/MenuUnstyled/MenuUnstyledContext.js
var React30, MenuUnstyledContext, MenuUnstyledContext_default;
var init_MenuUnstyledContext = __esm({
  "node_modules/@mui/base/MenuUnstyled/MenuUnstyledContext.js"() {
    React30 = __toESM(require_react());
    MenuUnstyledContext = React30.createContext(null);
    MenuUnstyledContext.displayName = "MenuUnstyledContext";
    MenuUnstyledContext_default = MenuUnstyledContext;
  }
});

// node_modules/@mui/base/MenuUnstyled/menuUnstyledClasses.js
function getMenuUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiMenuUnstyled", slot);
}
var menuUnstyledClasses;
var init_menuUnstyledClasses = __esm({
  "node_modules/@mui/base/MenuUnstyled/menuUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    menuUnstyledClasses = generateUtilityClasses("MuiMenuUnstyled", ["root", "listbox", "expanded"]);
  }
});

// node_modules/@mui/base/MenuUnstyled/useMenu.js
function stateReducer(state, action) {
  if (action.type === ActionTypes.blur || action.type === ActionTypes.optionHover || action.type === ActionTypes.setValue) {
    return state;
  }
  const newState = defaultListboxReducer(state, action);
  if (action.type !== ActionTypes.setHighlight && newState.highlightedValue === null && action.props.options.length > 0) {
    return _extends({}, newState, {
      highlightedValue: action.props.options[0]
    });
  }
  return newState;
}
function useMenu(parameters = {}) {
  const {
    listboxRef: listboxRefProp,
    open = false,
    onClose,
    listboxId
  } = parameters;
  const [menuItems, setMenuItems] = React31.useState({});
  const listboxRef = React31.useRef(null);
  const handleRef = useForkRef(listboxRef, listboxRefProp);
  const registerItem = React31.useCallback((id, metadata) => {
    setMenuItems((previousState) => {
      const newState = _extends({}, previousState);
      newState[id] = metadata;
      return newState;
    });
  }, []);
  const unregisterItem = React31.useCallback((id) => {
    setMenuItems((previousState) => {
      const newState = _extends({}, previousState);
      delete newState[id];
      return newState;
    });
  }, []);
  const {
    getOptionState,
    getOptionProps,
    getRootProps,
    highlightedOption,
    setHighlightedValue: setListboxHighlight
  } = useListbox({
    options: Object.keys(menuItems),
    optionStringifier: (id) => {
      var _menuItems$id$ref$cur;
      return menuItems[id].label || ((_menuItems$id$ref$cur = menuItems[id].ref.current) == null ? void 0 : _menuItems$id$ref$cur.innerText);
    },
    isOptionDisabled: (id) => {
      var _menuItems$id;
      return (menuItems == null ? void 0 : (_menuItems$id = menuItems[id]) == null ? void 0 : _menuItems$id.disabled) || false;
    },
    listboxRef: handleRef,
    focusManagement: "DOM",
    id: listboxId,
    stateReducer,
    disabledItemsFocusable: true
  });
  const highlightFirstItem = React31.useCallback(() => {
    if (Object.keys(menuItems).length > 0) {
      setListboxHighlight(menuItems[Object.keys(menuItems)[0]].id);
    }
  }, [menuItems, setListboxHighlight]);
  const highlightLastItem = React31.useCallback(() => {
    if (Object.keys(menuItems).length > 0) {
      setListboxHighlight(menuItems[Object.keys(menuItems)[Object.keys(menuItems).length - 1]].id);
    }
  }, [menuItems, setListboxHighlight]);
  React31.useEffect(() => {
    if (!open) {
      highlightFirstItem();
    }
  }, [open, highlightFirstItem]);
  const createHandleKeyDown = (otherHandlers) => (e) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, e);
    if (e.defaultPrevented) {
      return;
    }
    if (e.key === "Escape" && open) {
      onClose == null ? void 0 : onClose();
    }
  };
  const createHandleBlur = (otherHandlers) => (e) => {
    var _otherHandlers$onBlur, _listboxRef$current;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, e);
    if (!((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(e.relatedTarget))) {
      onClose == null ? void 0 : onClose();
    }
  };
  React31.useEffect(() => {
    var _listboxRef$current2;
    if ((_listboxRef$current2 = listboxRef.current) != null && _listboxRef$current2.contains(document.activeElement) && highlightedOption !== null) {
      var _menuItems$highlighte, _menuItems$highlighte2;
      menuItems == null ? void 0 : (_menuItems$highlighte = menuItems[highlightedOption]) == null ? void 0 : (_menuItems$highlighte2 = _menuItems$highlighte.ref.current) == null ? void 0 : _menuItems$highlighte2.focus();
    }
  }, [highlightedOption, menuItems]);
  const getListboxProps = (otherHandlers = {}) => {
    const rootProps = getRootProps(_extends({}, otherHandlers, {
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers)
    }));
    return _extends({}, otherHandlers, rootProps, {
      role: "menu"
    });
  };
  const getItemState = (id) => {
    const {
      disabled,
      highlighted
    } = getOptionState(id);
    return {
      disabled,
      highlighted
    };
  };
  React31.useDebugValue({
    menuItems,
    highlightedOption
  });
  return {
    registerItem,
    unregisterItem,
    menuItems,
    getListboxProps,
    getItemState,
    getItemProps: getOptionProps,
    highlightedOption,
    highlightFirstItem,
    highlightLastItem
  };
}
var React31;
var init_useMenu = __esm({
  "node_modules/@mui/base/MenuUnstyled/useMenu.js"() {
    init_extends();
    React31 = __toESM(require_react());
    init_esm();
    init_ListboxUnstyled();
  }
});

// node_modules/@popperjs/core/lib/enums.js
var top2, bottom2, right2, left2, auto, basePlacements, start, end, clippingParents, viewport, popper, reference, variationPlacements, placements, beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite, modifierPhases;
var init_enums = __esm({
  "node_modules/@popperjs/core/lib/enums.js"() {
    top2 = "top";
    bottom2 = "bottom";
    right2 = "right";
    left2 = "left";
    auto = "auto";
    basePlacements = [top2, bottom2, right2, left2];
    start = "start";
    end = "end";
    clippingParents = "clippingParents";
    viewport = "viewport";
    popper = "popper";
    reference = "reference";
    variationPlacements = basePlacements.reduce(function(acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []);
    beforeRead = "beforeRead";
    read = "read";
    afterRead = "afterRead";
    beforeMain = "beforeMain";
    main = "main";
    afterMain = "afterMain";
    beforeWrite = "beforeWrite";
    write = "write";
    afterWrite = "afterWrite";
    modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
var init_getNodeName = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getNodeName.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node2) {
  if (node2 == null) {
    return window;
  }
  if (node2.toString() !== "[object Window]") {
    var ownerDocument2 = node2.ownerDocument;
    return ownerDocument2 ? ownerDocument2.defaultView || window : window;
  }
  return node2;
}
var init_getWindow = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindow.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node2) {
  var OwnElement = getWindow(node2).Element;
  return node2 instanceof OwnElement || node2 instanceof Element;
}
function isHTMLElement(node2) {
  var OwnElement = getWindow(node2).HTMLElement;
  return node2 instanceof OwnElement || node2 instanceof HTMLElement;
}
function isShadowRoot(node2) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node2).ShadowRoot;
  return node2 instanceof OwnElement || node2 instanceof ShadowRoot;
}
var init_instanceOf = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/instanceOf.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style3 = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style3);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style3 = styleProperties.reduce(function(style4, property) {
        style4[property] = "";
        return style4;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style3);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default;
var init_applyStyles = __esm({
  "node_modules/@popperjs/core/lib/modifiers/applyStyles.js"() {
    init_getNodeName();
    init_instanceOf();
    applyStyles_default = {
      name: "applyStyles",
      enabled: true,
      phase: "write",
      fn: applyStyles,
      effect,
      requires: ["computeStyles"]
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var init_getBasePlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getBasePlacement.js"() {
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/math.js
var max, min, round;
var init_math = __esm({
  "node_modules/@popperjs/core/lib/utils/math.js"() {
    max = Math.max;
    min = Math.min;
    round = Math.round;
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
var init_getBoundingClientRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js"() {
    init_instanceOf();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width2 = element.offsetWidth;
  var height2 = element.offsetHeight;
  if (Math.abs(clientRect.width - width2) <= 1) {
    width2 = clientRect.width;
  }
  if (Math.abs(clientRect.height - height2) <= 1) {
    height2 = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width2,
    height: height2
  };
}
var init_getLayoutRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js"() {
    init_getBoundingClientRect();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next2 = child;
    do {
      if (next2 && parent.isSameNode(next2)) {
        return true;
      }
      next2 = next2.parentNode || next2.host;
    } while (next2);
  }
  return false;
}
var init_contains = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/contains.js"() {
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
var init_getComputedStyle = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
var init_isTableElement = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/isTableElement.js"() {
    init_getNodeName();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
var init_getDocumentElement = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js"() {
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
var init_getParentNode = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getParentNode.js"() {
    init_getNodeName();
    init_getDocumentElement();
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css2 = getComputedStyle(currentNode);
    if (css2.transform !== "none" || css2.perspective !== "none" || css2.contain === "paint" || ["transform", "perspective"].indexOf(css2.willChange) !== -1 || isFirefox && css2.willChange === "filter" || isFirefox && css2.filter && css2.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
var init_getOffsetParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js"() {
    init_getWindow();
    init_getNodeName();
    init_getComputedStyle();
    init_instanceOf();
    init_isTableElement();
    init_getParentNode();
  }
});

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
var init_getMainAxisFromPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}
var init_within = __esm({
  "node_modules/@popperjs/core/lib/utils/within.js"() {
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
var init_getFreshSideObject = __esm({
  "node_modules/@popperjs/core/lib/utils/getFreshSideObject.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
var init_mergePaddingObject = __esm({
  "node_modules/@popperjs/core/lib/utils/mergePaddingObject.js"() {
    init_getFreshSideObject();
  }
});

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var init_expandToHashMap = __esm({
  "node_modules/@popperjs/core/lib/utils/expandToHashMap.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/arrow.js
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left2, right2].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top2 : left2;
  var maxProp = axis === "y" ? bottom2 : right2;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (true) {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var toPaddingObject, arrow_default;
var init_arrow = __esm({
  "node_modules/@popperjs/core/lib/modifiers/arrow.js"() {
    init_getBasePlacement();
    init_getLayoutRect();
    init_contains();
    init_getOffsetParent();
    init_getMainAxisFromPlacement();
    init_within();
    init_mergePaddingObject();
    init_expandToHashMap();
    init_enums();
    init_instanceOf();
    toPaddingObject = function toPaddingObject2(padding2, state) {
      padding2 = typeof padding2 === "function" ? padding2(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding2;
      return mergePaddingObject(typeof padding2 !== "number" ? padding2 : expandToHashMap(padding2, basePlacements));
    };
    arrow_default = {
      name: "arrow",
      enabled: true,
      phase: "main",
      fn: arrow,
      effect: effect2,
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"]
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}
var init_getVariation = __esm({
  "node_modules/@popperjs/core/lib/utils/getVariation.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position3 = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left2;
  var sideY = top2;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position3 === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top2 || (placement === left2 || placement === right2) && variation === end) {
      sideY = bottom2;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left2 || (placement === top2 || placement === bottom2) && variation === end) {
      sideX = right2;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position3
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var unsetSides, computeStyles_default;
var init_computeStyles = __esm({
  "node_modules/@popperjs/core/lib/modifiers/computeStyles.js"() {
    init_enums();
    init_getOffsetParent();
    init_getWindow();
    init_getDocumentElement();
    init_getComputedStyle();
    init_getBasePlacement();
    init_getVariation();
    init_math();
    unsetSides = {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
    };
    computeStyles_default = {
      name: "computeStyles",
      enabled: true,
      phase: "beforeWrite",
      fn: computeStyles,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var passive, eventListeners_default;
var init_eventListeners = __esm({
  "node_modules/@popperjs/core/lib/modifiers/eventListeners.js"() {
    init_getWindow();
    passive = {
      passive: true
    };
    eventListeners_default = {
      name: "eventListeners",
      enabled: true,
      phase: "write",
      fn: function fn() {
      },
      effect: effect3,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash2[matched];
  });
}
var hash2;
var init_getOppositePlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getOppositePlacement.js"() {
    hash2 = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash3[matched];
  });
}
var hash3;
var init_getOppositeVariationPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js"() {
    hash3 = {
      start: "end",
      end: "start"
    };
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node2) {
  var win = getWindow(node2);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
var init_getWindowScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
var init_getWindowScrollBarX = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js"() {
    init_getBoundingClientRect();
    init_getDocumentElement();
    init_getWindowScroll();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width2 = html.clientWidth;
  var height2 = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width2 = visualViewport.width;
    height2 = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width: width2,
    height: height2,
    x: x + getWindowScrollBarX(element),
    y
  };
}
var init_getViewportRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js"() {
    init_getWindow();
    init_getDocumentElement();
    init_getWindowScrollBarX();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width2 = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height2 = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width2;
  }
  return {
    width: width2,
    height: height2,
    x,
    y
  };
}
var init_getDocumentRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js"() {
    init_getDocumentElement();
    init_getComputedStyle();
    init_getWindowScrollBarX();
    init_getWindowScroll();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow2 = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow2 + overflowY + overflowX);
}
var init_isScrollParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js"() {
    init_getComputedStyle();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node2) {
  if (["html", "body", "#document"].indexOf(getNodeName(node2)) >= 0) {
    return node2.ownerDocument.body;
  }
  if (isHTMLElement(node2) && isScrollParent(node2)) {
    return node2;
  }
  return getScrollParent(getParentNode(node2));
}
var init_getScrollParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js"() {
    init_getParentNode();
    init_isScrollParent();
    init_getNodeName();
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
var init_listScrollParents = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js"() {
    init_getScrollParent();
    init_getParentNode();
    init_getWindow();
    init_isScrollParent();
  }
});

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
var init_rectToClientRect = __esm({
  "node_modules/@popperjs/core/lib/utils/rectToClientRect.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
var init_getClippingRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js"() {
    init_enums();
    init_getViewportRect();
    init_getDocumentRect();
    init_listScrollParents();
    init_getOffsetParent();
    init_getDocumentElement();
    init_getComputedStyle();
    init_instanceOf();
    init_getBoundingClientRect();
    init_getParentNode();
    init_contains();
    init_getNodeName();
    init_rectToClientRect();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top2:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom2:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right2:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left2:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}
var init_computeOffsets = __esm({
  "node_modules/@popperjs/core/lib/utils/computeOffsets.js"() {
    init_getBasePlacement();
    init_getVariation();
    init_getMainAxisFromPlacement();
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding2 = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding2 !== "number" ? padding2 : expandToHashMap(padding2, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right2, bottom2].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top2, bottom2].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
var init_detectOverflow = __esm({
  "node_modules/@popperjs/core/lib/utils/detectOverflow.js"() {
    init_getClippingRect();
    init_getDocumentElement();
    init_getBoundingClientRect();
    init_computeOffsets();
    init_rectToClientRect();
    init_enums();
    init_instanceOf();
    init_mergePaddingObject();
    init_expandToHashMap();
  }
});

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding2 = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (true) {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding: padding2
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
var init_computeAutoPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js"() {
    init_getVariation();
    init_enums();
    init_detectOverflow();
    init_getBasePlacement();
  }
});

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding2 = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding: padding2,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top2, bottom2].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow2 = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding: padding2
    });
    var mainVariationSide = isVertical ? isStartVariation ? right2 : left2 : isStartVariation ? bottom2 : top2;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow2[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow2[mainVariationSide] <= 0, overflow2[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default;
var init_flip = __esm({
  "node_modules/@popperjs/core/lib/modifiers/flip.js"() {
    init_getOppositePlacement();
    init_getBasePlacement();
    init_getOppositeVariationPlacement();
    init_detectOverflow();
    init_computeAutoPlacement();
    init_enums();
    init_getVariation();
    flip_default = {
      name: "flip",
      enabled: true,
      phase: "main",
      fn: flip,
      requiresIfExists: ["offset"],
      data: {
        _skip: false
      }
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow2, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow2.top - rect.height - preventedOffsets.y,
    right: overflow2.right - rect.width + preventedOffsets.x,
    bottom: overflow2.bottom - rect.height + preventedOffsets.y,
    left: overflow2.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow2) {
  return [top2, right2, bottom2, left2].some(function(side) {
    return overflow2[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default;
var init_hide = __esm({
  "node_modules/@popperjs/core/lib/modifiers/hide.js"() {
    init_enums();
    init_detectOverflow();
    hide_default = {
      name: "hide",
      enabled: true,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: hide
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left2, top2].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left2, right2].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default;
var init_offset = __esm({
  "node_modules/@popperjs/core/lib/modifiers/offset.js"() {
    init_getBasePlacement();
    init_enums();
    offset_default = {
      name: "offset",
      enabled: true,
      phase: "main",
      requires: ["popperOffsets"],
      fn: offset
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default;
var init_popperOffsets = __esm({
  "node_modules/@popperjs/core/lib/modifiers/popperOffsets.js"() {
    init_computeOffsets();
    popperOffsets_default = {
      name: "popperOffsets",
      enabled: true,
      phase: "read",
      fn: popperOffsets,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
var init_getAltAxis = __esm({
  "node_modules/@popperjs/core/lib/utils/getAltAxis.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding2 = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow2 = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding: padding2,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top2 : left2;
    var altSide = mainAxis === "y" ? bottom2 : right2;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow2[mainSide];
    var max2 = offset2 - overflow2[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top2 : left2;
    var _altSide = mainAxis === "x" ? bottom2 : right2;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow2[_mainSide];
    var _max = _offset - overflow2[_altSide];
    var isOriginSide = [top2, left2].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default;
var init_preventOverflow = __esm({
  "node_modules/@popperjs/core/lib/modifiers/preventOverflow.js"() {
    init_enums();
    init_getBasePlacement();
    init_getMainAxisFromPlacement();
    init_getAltAxis();
    init_within();
    init_getLayoutRect();
    init_getOffsetParent();
    init_detectOverflow();
    init_getVariation();
    init_getFreshSideObject();
    init_math();
    preventOverflow_default = {
      name: "preventOverflow",
      enabled: true,
      phase: "main",
      fn: preventOverflow,
      requiresIfExists: ["offset"]
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/index.js
var init_modifiers = __esm({
  "node_modules/@popperjs/core/lib/modifiers/index.js"() {
    init_applyStyles();
    init_arrow();
    init_computeStyles();
    init_eventListeners();
    init_flip();
    init_hide();
    init_offset();
    init_popperOffsets();
    init_preventOverflow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
var init_getHTMLElementScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node2) {
  if (node2 === getWindow(node2) || !isHTMLElement(node2)) {
    return getWindowScroll(node2);
  } else {
    return getHTMLElementScroll(node2);
  }
}
var init_getNodeScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js"() {
    init_getWindowScroll();
    init_getWindow();
    init_instanceOf();
    init_getHTMLElementScroll();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
var init_getCompositeRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js"() {
    init_getBoundingClientRect();
    init_getNodeScroll();
    init_getNodeName();
    init_instanceOf();
    init_getWindowScrollBarX();
    init_getDocumentElement();
    init_isScrollParent();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order2(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order2(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
var init_orderModifiers = __esm({
  "node_modules/@popperjs/core/lib/utils/orderModifiers.js"() {
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce2(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
var init_debounce = __esm({
  "node_modules/@popperjs/core/lib/utils/debounce.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/format.js
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}
var init_format = __esm({
  "node_modules/@popperjs/core/lib/utils/format.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/validateModifiers.js
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}
var INVALID_MODIFIER_ERROR, MISSING_DEPENDENCY_ERROR, VALID_PROPERTIES;
var init_validateModifiers = __esm({
  "node_modules/@popperjs/core/lib/utils/validateModifiers.js"() {
    init_format();
    init_enums();
    INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
    MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
    VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
  }
});

// node_modules/@popperjs/core/lib/utils/uniqueBy.js
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier2 = fn2(item);
    if (!identifiers.has(identifier2)) {
      identifiers.add(identifier2);
      return true;
    }
  });
}
var init_uniqueBy = __esm({
  "node_modules/@popperjs/core/lib/utils/uniqueBy.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var init_mergeByName = __esm({
  "node_modules/@popperjs/core/lib/utils/mergeByName.js"() {
  }
});

// node_modules/@popperjs/core/lib/createPopper.js
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin2) {
            return parseFloat(margin2);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce2(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var INVALID_ELEMENT_ERROR, INFINITE_LOOP_ERROR, DEFAULT_OPTIONS, createPopper;
var init_createPopper = __esm({
  "node_modules/@popperjs/core/lib/createPopper.js"() {
    init_getCompositeRect();
    init_getLayoutRect();
    init_listScrollParents();
    init_getOffsetParent();
    init_getComputedStyle();
    init_orderModifiers();
    init_debounce();
    init_validateModifiers();
    init_uniqueBy();
    init_getBasePlacement();
    init_mergeByName();
    init_detectOverflow();
    init_instanceOf();
    init_enums();
    INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
    INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
    DEFAULT_OPTIONS = {
      placement: "bottom",
      modifiers: [],
      strategy: "absolute"
    };
    createPopper = popperGenerator();
  }
});

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers, createPopper2;
var init_popper_lite = __esm({
  "node_modules/@popperjs/core/lib/popper-lite.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
    createPopper2 = popperGenerator({
      defaultModifiers
    });
  }
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2, createPopper3;
var init_popper = __esm({
  "node_modules/@popperjs/core/lib/popper.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    init_offset();
    init_flip();
    init_preventOverflow();
    init_arrow();
    init_hide();
    init_popper_lite();
    init_modifiers();
    defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
    createPopper3 = popperGenerator({
      defaultModifiers: defaultModifiers2
    });
  }
});

// node_modules/@popperjs/core/lib/index.js
var init_lib = __esm({
  "node_modules/@popperjs/core/lib/index.js"() {
    init_enums();
    init_modifiers();
    init_createPopper();
    init_popper();
    init_popper_lite();
  }
});

// node_modules/@mui/base/PopperUnstyled/popperUnstyledClasses.js
function getPopperUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiPopperUnstyled", slot);
}
var popperUnstyledClasses;
var init_popperUnstyledClasses = __esm({
  "node_modules/@mui/base/PopperUnstyled/popperUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    popperUnstyledClasses = generateUtilityClasses("MuiPopperUnstyled", ["root"]);
  }
});

// node_modules/@mui/base/PopperUnstyled/PopperUnstyled.js
function flipPlacement(placement, direction) {
  if (direction === "ltr") {
    return placement;
  }
  switch (placement) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return placement;
  }
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
var React32, import_prop_types22, import_jsx_runtime24, _excluded18, _excluded24, useUtilityClasses6, defaultPopperOptions, PopperTooltip, PopperUnstyled, PopperUnstyled_default;
var init_PopperUnstyled = __esm({
  "node_modules/@mui/base/PopperUnstyled/PopperUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React32 = __toESM(require_react());
    init_esm();
    init_lib();
    import_prop_types22 = __toESM(require_prop_types());
    init_composeClasses();
    init_Portal2();
    init_popperUnstyledClasses();
    init_utils();
    import_jsx_runtime24 = __toESM(require_jsx_runtime());
    _excluded18 = ["anchorEl", "children", "component", "components", "componentsProps", "direction", "disablePortal", "modifiers", "open", "ownerState", "placement", "popperOptions", "popperRef", "TransitionProps"];
    _excluded24 = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"];
    useUtilityClasses6 = () => {
      const slots = {
        root: ["root"]
      };
      return composeClasses(slots, getPopperUnstyledUtilityClass, {});
    };
    defaultPopperOptions = {};
    PopperTooltip = React32.forwardRef(function PopperTooltip2(props, ref) {
      var _ref;
      const {
        anchorEl,
        children,
        component,
        components = {},
        componentsProps = {},
        direction,
        disablePortal,
        modifiers,
        open,
        ownerState,
        placement: initialPlacement,
        popperOptions,
        popperRef: popperRefProp,
        TransitionProps
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded18);
      const tooltipRef = React32.useRef(null);
      const ownRef = useForkRef(tooltipRef, ref);
      const popperRef = React32.useRef(null);
      const handlePopperRef = useForkRef(popperRef, popperRefProp);
      const handlePopperRefRef = React32.useRef(handlePopperRef);
      useEnhancedEffect_default(() => {
        handlePopperRefRef.current = handlePopperRef;
      }, [handlePopperRef]);
      React32.useImperativeHandle(popperRefProp, () => popperRef.current, []);
      const rtlPlacement = flipPlacement(initialPlacement, direction);
      const [placement, setPlacement] = React32.useState(rtlPlacement);
      React32.useEffect(() => {
        if (popperRef.current) {
          popperRef.current.forceUpdate();
        }
      });
      useEnhancedEffect_default(() => {
        if (!anchorEl || !open) {
          return void 0;
        }
        const handlePopperUpdate = (data) => {
          setPlacement(data.placement);
        };
        const resolvedAnchorEl = resolveAnchorEl(anchorEl);
        if (true) {
          if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
            const box = resolvedAnchorEl.getBoundingClientRect();
            if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
              console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
            }
          }
        }
        let popperModifiers = [{
          name: "preventOverflow",
          options: {
            altBoundary: disablePortal
          }
        }, {
          name: "flip",
          options: {
            altBoundary: disablePortal
          }
        }, {
          name: "onUpdate",
          enabled: true,
          phase: "afterWrite",
          fn: ({
            state
          }) => {
            handlePopperUpdate(state);
          }
        }];
        if (modifiers != null) {
          popperModifiers = popperModifiers.concat(modifiers);
        }
        if (popperOptions && popperOptions.modifiers != null) {
          popperModifiers = popperModifiers.concat(popperOptions.modifiers);
        }
        const popper2 = createPopper3(resolveAnchorEl(anchorEl), tooltipRef.current, _extends({
          placement: rtlPlacement
        }, popperOptions, {
          modifiers: popperModifiers
        }));
        handlePopperRefRef.current(popper2);
        return () => {
          popper2.destroy();
          handlePopperRefRef.current(null);
        };
      }, [anchorEl, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
      const childProps = {
        placement
      };
      if (TransitionProps !== null) {
        childProps.TransitionProps = TransitionProps;
      }
      const classes = useUtilityClasses6();
      const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: {
          role: "tooltip",
          ref: ownRef
        },
        ownerState: _extends({}, props, ownerState),
        className: classes.root
      });
      return (0, import_jsx_runtime24.jsx)(Root, _extends({}, rootProps, {
        children: typeof children === "function" ? children(childProps) : children
      }));
    });
    PopperUnstyled = React32.forwardRef(function PopperUnstyled2(props, ref) {
      const {
        anchorEl,
        children,
        container: containerProp,
        direction = "ltr",
        disablePortal = false,
        keepMounted = false,
        modifiers,
        open,
        placement = "bottom",
        popperOptions = defaultPopperOptions,
        popperRef,
        style: style3,
        transition = false
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded24);
      const [exited, setExited] = React32.useState(true);
      const handleEnter = () => {
        setExited(false);
      };
      const handleExited = () => {
        setExited(true);
      };
      if (!keepMounted && !open && (!transition || exited)) {
        return null;
      }
      const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : void 0);
      return (0, import_jsx_runtime24.jsx)(Portal_default, {
        disablePortal,
        container,
        children: (0, import_jsx_runtime24.jsx)(PopperTooltip, _extends({
          anchorEl,
          direction,
          disablePortal,
          modifiers,
          ref,
          open: transition ? !exited : open,
          placement,
          popperOptions,
          popperRef
        }, other, {
          style: _extends({
            position: "fixed",
            top: 0,
            left: 0,
            display: !open && keepMounted && (!transition || exited) ? "none" : null
          }, style3),
          TransitionProps: transition ? {
            in: open,
            onEnter: handleEnter,
            onExited: handleExited
          } : null,
          children
        }))
      });
    });
    true ? PopperUnstyled.propTypes = {
      anchorEl: chainPropTypes(import_prop_types22.default.oneOfType([HTMLElementType, import_prop_types22.default.object, import_prop_types22.default.func]), (props) => {
        if (props.open) {
          const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
          if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
            const box = resolvedAnchorEl.getBoundingClientRect();
            if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
              return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
            }
          } else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) {
            return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join("\n"));
          }
        }
        return null;
      }),
      children: import_prop_types22.default.oneOfType([import_prop_types22.default.node, import_prop_types22.default.func]),
      components: import_prop_types22.default.shape({
        Root: import_prop_types22.default.elementType
      }),
      componentsProps: import_prop_types22.default.shape({
        root: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object])
      }),
      container: import_prop_types22.default.oneOfType([HTMLElementType, import_prop_types22.default.func]),
      direction: import_prop_types22.default.oneOf(["ltr", "rtl"]),
      disablePortal: import_prop_types22.default.bool,
      keepMounted: import_prop_types22.default.bool,
      modifiers: import_prop_types22.default.arrayOf(import_prop_types22.default.shape({
        data: import_prop_types22.default.object,
        effect: import_prop_types22.default.func,
        enabled: import_prop_types22.default.bool,
        fn: import_prop_types22.default.func,
        name: import_prop_types22.default.any,
        options: import_prop_types22.default.object,
        phase: import_prop_types22.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
        requires: import_prop_types22.default.arrayOf(import_prop_types22.default.string),
        requiresIfExists: import_prop_types22.default.arrayOf(import_prop_types22.default.string)
      })),
      open: import_prop_types22.default.bool.isRequired,
      placement: import_prop_types22.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
      popperOptions: import_prop_types22.default.shape({
        modifiers: import_prop_types22.default.array,
        onFirstUpdate: import_prop_types22.default.func,
        placement: import_prop_types22.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
        strategy: import_prop_types22.default.oneOf(["absolute", "fixed"])
      }),
      popperRef: refType_default,
      style: import_prop_types22.default.object,
      transition: import_prop_types22.default.bool
    } : void 0;
    PopperUnstyled_default = PopperUnstyled;
  }
});

// node_modules/@mui/base/PopperUnstyled/index.js
var init_PopperUnstyled2 = __esm({
  "node_modules/@mui/base/PopperUnstyled/index.js"() {
    init_PopperUnstyled();
  }
});

// node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js
function getUtilityClasses(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ["root", open && "expanded"],
    listbox: ["listbox", open && "expanded"]
  };
  return composeClasses(slots, getMenuUnstyledUtilityClass, {});
}
var React33, import_prop_types23, import_jsx_runtime25, _excluded19, MenuUnstyled;
var init_MenuUnstyled = __esm({
  "node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React33 = __toESM(require_react());
    import_prop_types23 = __toESM(require_prop_types());
    init_esm();
    init_MenuUnstyledContext();
    init_menuUnstyledClasses();
    init_useMenu();
    init_composeClasses();
    init_PopperUnstyled2();
    init_useSlotProps();
    import_jsx_runtime25 = __toESM(require_jsx_runtime());
    _excluded19 = ["actions", "anchorEl", "children", "component", "components", "componentsProps", "keepMounted", "listboxId", "onClose", "open"];
    MenuUnstyled = React33.forwardRef(function MenuUnstyled2(props, forwardedRef) {
      var _ref, _components$Listbox;
      const {
        actions,
        anchorEl,
        children,
        component,
        components = {},
        componentsProps = {},
        keepMounted = false,
        listboxId,
        onClose,
        open = false
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded19);
      const {
        registerItem,
        unregisterItem,
        getListboxProps,
        getItemProps,
        getItemState,
        highlightFirstItem,
        highlightLastItem
      } = useMenu({
        open,
        onClose,
        listboxId
      });
      React33.useImperativeHandle(actions, () => ({
        highlightFirstItem,
        highlightLastItem
      }), [highlightFirstItem, highlightLastItem]);
      const ownerState = _extends({}, props, {
        open
      });
      const classes = getUtilityClasses(ownerState);
      const Root = (_ref = component != null ? component : components.Root) != null ? _ref : PopperUnstyled_default;
      const rootProps = useSlotProps({
        elementType: Root,
        externalForwardedProps: other,
        externalSlotProps: componentsProps.root,
        additionalProps: {
          anchorEl,
          open,
          keepMounted,
          role: void 0,
          ref: forwardedRef
        },
        className: classes.root,
        ownerState
      });
      const Listbox = (_components$Listbox = components.Listbox) != null ? _components$Listbox : "ul";
      const listboxProps = useSlotProps({
        elementType: Listbox,
        getSlotProps: getListboxProps,
        externalSlotProps: componentsProps.listbox,
        ownerState,
        className: classes.listbox
      });
      const contextValue = {
        registerItem,
        unregisterItem,
        getItemState,
        getItemProps,
        open
      };
      return (0, import_jsx_runtime25.jsx)(Root, _extends({}, rootProps, {
        children: (0, import_jsx_runtime25.jsx)(Listbox, _extends({}, listboxProps, {
          children: (0, import_jsx_runtime25.jsx)(MenuUnstyledContext_default.Provider, {
            value: contextValue,
            children
          })
        }))
      }));
    });
    true ? MenuUnstyled.propTypes = {
      actions: refType_default,
      anchorEl: import_prop_types23.default.oneOfType([HTMLElementType, import_prop_types23.default.object, import_prop_types23.default.func]),
      children: import_prop_types23.default.node,
      component: import_prop_types23.default.elementType,
      components: import_prop_types23.default.shape({
        Listbox: import_prop_types23.default.elementType,
        Root: import_prop_types23.default.elementType
      }),
      componentsProps: import_prop_types23.default.shape({
        listbox: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
        root: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object])
      }),
      keepMounted: import_prop_types23.default.bool,
      listboxId: import_prop_types23.default.string,
      onClose: import_prop_types23.default.func,
      open: import_prop_types23.default.bool
    } : void 0;
  }
});

// node_modules/@mui/base/MenuUnstyled/MenuUnstyled.types.js
var init_MenuUnstyled_types = __esm({
  "node_modules/@mui/base/MenuUnstyled/MenuUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/MenuUnstyled/useMenu.types.js
var init_useMenu_types = __esm({
  "node_modules/@mui/base/MenuUnstyled/useMenu.types.js"() {
  }
});

// node_modules/@mui/base/MenuUnstyled/index.js
var init_MenuUnstyled2 = __esm({
  "node_modules/@mui/base/MenuUnstyled/index.js"() {
    init_MenuUnstyled();
    init_MenuUnstyledContext();
    init_MenuUnstyledContext();
    init_menuUnstyledClasses();
    init_menuUnstyledClasses();
    init_MenuUnstyled_types();
    init_useMenu();
    init_useMenu_types();
  }
});

// node_modules/@mui/base/MenuItemUnstyled/menuItemUnstyledClasses.js
function getMenuItemUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiMenuItemUnstyled", slot);
}
var menuItemUnstyledClasses;
var init_menuItemUnstyledClasses = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/menuItemUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    menuItemUnstyledClasses = generateUtilityClasses("MuiMenuItemUnstyled", ["root", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/MenuItemUnstyled/useMenuItem.js
function useMenuItem(props) {
  var _itemState$disabled;
  const {
    disabled = false,
    ref,
    label
  } = props;
  const id = useId();
  const menuContext = React34.useContext(MenuUnstyledContext_default);
  const itemRef = React34.useRef(null);
  const handleRef = useForkRef(itemRef, ref);
  if (menuContext === null) {
    throw new Error("MenuItemUnstyled must be used within a MenuUnstyled");
  }
  const {
    registerItem,
    unregisterItem,
    open
  } = menuContext;
  React34.useEffect(() => {
    if (id === void 0) {
      return void 0;
    }
    registerItem(id, {
      disabled,
      id,
      ref: itemRef,
      label
    });
    return () => unregisterItem(id);
  }, [id, registerItem, unregisterItem, disabled, ref, label]);
  const {
    getRootProps: getButtonProps,
    focusVisible
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    ref: handleRef
  });
  const [focusRequested, requestFocus] = React34.useState(false);
  const focusIfRequested = React34.useCallback(() => {
    if (focusRequested && itemRef.current != null) {
      itemRef.current.focus();
      requestFocus(false);
    }
  }, [focusRequested]);
  React34.useEffect(() => {
    focusIfRequested();
  });
  React34.useDebugValue({
    id,
    disabled,
    label
  });
  const itemState = menuContext.getItemState(id != null ? id : "");
  const {
    highlighted
  } = itemState != null ? itemState : {
    highlighted: false
  };
  React34.useEffect(() => {
    requestFocus(highlighted && open);
  }, [highlighted, open]);
  if (id === void 0) {
    return {
      getRootProps: (other) => _extends({}, other, getButtonProps(other), {
        role: "menuitem"
      }),
      disabled: false,
      focusVisible
    };
  }
  return {
    getRootProps: (other) => {
      const optionProps = menuContext.getItemProps(id, other);
      return _extends({}, other, getButtonProps(other), {
        tabIndex: optionProps.tabIndex,
        id: optionProps.id,
        role: "menuitem"
      });
    },
    disabled: (_itemState$disabled = itemState == null ? void 0 : itemState.disabled) != null ? _itemState$disabled : false,
    focusVisible
  };
}
var React34;
var init_useMenuItem = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/useMenuItem.js"() {
    init_extends();
    React34 = __toESM(require_react());
    init_esm();
    init_MenuUnstyled2();
    init_ButtonUnstyled2();
  }
});

// node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js
function getUtilityClasses2(ownerState) {
  const {
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  return composeClasses(slots, getMenuItemUnstyledUtilityClass, {});
}
var React35, import_prop_types24, import_jsx_runtime26, _excluded20, MenuItemUnstyled;
var init_MenuItemUnstyled = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React35 = __toESM(require_react());
    import_prop_types24 = __toESM(require_prop_types());
    init_menuItemUnstyledClasses();
    init_useMenuItem();
    init_composeClasses();
    init_useSlotProps();
    import_jsx_runtime26 = __toESM(require_jsx_runtime());
    _excluded20 = ["children", "disabled", "component", "components", "componentsProps", "label"];
    MenuItemUnstyled = React35.forwardRef(function MenuItemUnstyled2(props, ref) {
      var _ref;
      const {
        children,
        disabled: disabledProp = false,
        component,
        components = {},
        componentsProps = {},
        label
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded20);
      const {
        getRootProps,
        disabled,
        focusVisible
      } = useMenuItem({
        disabled: disabledProp,
        ref,
        label
      });
      const ownerState = _extends({}, props, {
        disabled,
        focusVisible
      });
      const classes = getUtilityClasses2(ownerState);
      const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "li";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        className: classes.root,
        ownerState
      });
      return (0, import_jsx_runtime26.jsx)(Root, _extends({}, rootProps, {
        children
      }));
    });
    true ? MenuItemUnstyled.propTypes = {
      children: import_prop_types24.default.node,
      component: import_prop_types24.default.elementType,
      components: import_prop_types24.default.shape({
        Root: import_prop_types24.default.elementType
      }),
      componentsProps: import_prop_types24.default.shape({
        root: import_prop_types24.default.oneOfType([import_prop_types24.default.func, import_prop_types24.default.object])
      }),
      disabled: import_prop_types24.default.bool,
      label: import_prop_types24.default.string
    } : void 0;
  }
});

// node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.types.js
var init_MenuItemUnstyled_types = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/MenuItemUnstyled/useMenuItem.types.js
var init_useMenuItem_types = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/useMenuItem.types.js"() {
  }
});

// node_modules/@mui/base/MenuItemUnstyled/index.js
var init_MenuItemUnstyled2 = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/index.js"() {
    init_MenuItemUnstyled();
    init_MenuItemUnstyled_types();
    init_menuItemUnstyledClasses();
    init_menuItemUnstyledClasses();
    init_useMenuItem();
    init_useMenuItem_types();
  }
});

// node_modules/@mui/base/SelectUnstyled/useSelect.types.js
function isOptionGroup(child) {
  return !!child.options;
}
var init_useSelect_types = __esm({
  "node_modules/@mui/base/SelectUnstyled/useSelect.types.js"() {
  }
});

// node_modules/@mui/base/SelectUnstyled/utils.js
function getOptionsFromChildren(children) {
  if (children == null) {
    return [];
  }
  const selectChildren = [];
  import_react10.default.Children.forEach(children, (node2) => {
    var _props, _props2, _element$props$disabl2;
    const nodeChildren = node2 == null ? void 0 : (_props = node2.props) == null ? void 0 : _props.children;
    if ((node2 == null ? void 0 : (_props2 = node2.props) == null ? void 0 : _props2.value) === void 0) {
      if (nodeChildren != null) {
        var _element$props$disabl;
        const element2 = node2;
        const group = {
          options: getOptionsFromChildren(nodeChildren),
          label: element2.props.label,
          disabled: (_element$props$disabl = element2.props.disabled) != null ? _element$props$disabl : false
        };
        selectChildren.push(group);
      }
      return;
    }
    const element = node2;
    const option = {
      value: element.props.value,
      label: element.props.label || element.props.children,
      disabled: (_element$props$disabl2 = element.props.disabled) != null ? _element$props$disabl2 : false
    };
    selectChildren.push(option);
  });
  return selectChildren != null ? selectChildren : [];
}
function flattenOptionGroups(groupedOptions, isGroupDisabled = false) {
  let flatOptions = [];
  groupedOptions.forEach((optionOrGroup) => {
    if (isOptionGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(flattenOptionGroups(optionOrGroup.options, optionOrGroup.disabled));
    } else {
      flatOptions.push(_extends({}, optionOrGroup, {
        disabled: isGroupDisabled || optionOrGroup.disabled
      }));
    }
  });
  return flatOptions;
}
var import_react10;
var init_utils2 = __esm({
  "node_modules/@mui/base/SelectUnstyled/utils.js"() {
    init_extends();
    import_react10 = __toESM(require_react());
    init_useSelect_types();
  }
});

// node_modules/@mui/base/SelectUnstyled/useSelect.js
function useSelect(props) {
  const {
    buttonRef: buttonRefProp,
    defaultValue,
    disabled = false,
    listboxId,
    listboxRef: listboxRefProp,
    multiple = false,
    onChange,
    onOpenChange,
    open = false,
    options,
    optionStringifier = defaultOptionStringifier2,
    value: valueProp
  } = props;
  const buttonRef = React37.useRef(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);
  const listboxRef = React37.useRef(null);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "SelectUnstyled",
    state: "value"
  });
  const ignoreEnterKeyUp = React37.useRef(false);
  const ignoreClick = React37.useRef(false);
  const [listboxFocusRequested, requestListboxFocus] = React37.useState(false);
  const focusListboxIfRequested = React37.useCallback(() => {
    if (listboxFocusRequested && listboxRef.current != null) {
      listboxRef.current.focus();
      requestListboxFocus(false);
    }
  }, [listboxFocusRequested]);
  const updateListboxRef = (listboxElement) => {
    listboxRef.current = listboxElement;
    focusListboxIfRequested();
  };
  const handleListboxRef = useForkRef(useForkRef(listboxRefProp, listboxRef), updateListboxRef);
  React37.useEffect(() => {
    focusListboxIfRequested();
  }, [focusListboxIfRequested]);
  React37.useEffect(() => {
    requestListboxFocus(open);
  }, [open]);
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    otherHandlers == null ? void 0 : (_otherHandlers$onMous = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
    if (!event.defaultPrevented && open) {
      ignoreClick.current = true;
    }
  };
  const createHandleButtonClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    otherHandlers == null ? void 0 : (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
    if (!event.defaultPrevented && !ignoreClick.current) {
      onOpenChange == null ? void 0 : onOpenChange(!open);
    }
    ignoreClick.current = false;
  };
  const createHandleButtonKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    otherHandlers == null ? void 0 : (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Enter") {
      ignoreEnterKeyUp.current = true;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      onOpenChange == null ? void 0 : onOpenChange(true);
    }
  };
  const createHandleListboxKeyUp = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyU;
    otherHandlers == null ? void 0 : (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null ? void 0 : _otherHandlers$onKeyU.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    const closingKeys = multiple ? ["Escape"] : ["Escape", "Enter", " "];
    if (open && !ignoreEnterKeyUp.current && closingKeys.includes(event.key)) {
      var _buttonRef$current;
      buttonRef == null ? void 0 : (_buttonRef$current = buttonRef.current) == null ? void 0 : _buttonRef$current.focus();
    }
    ignoreEnterKeyUp.current = false;
  };
  const createHandleListboxItemClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic2;
    otherHandlers == null ? void 0 : (_otherHandlers$onClic2 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic2.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (!multiple) {
      onOpenChange == null ? void 0 : onOpenChange(false);
    }
  };
  const createHandleListboxBlur = (otherHandlers) => (event) => {
    var _otherHandlers$blur;
    otherHandlers == null ? void 0 : (_otherHandlers$blur = otherHandlers.blur) == null ? void 0 : _otherHandlers$blur.call(otherHandlers, event);
    if (!event.defaultPrevented) {
      onOpenChange == null ? void 0 : onOpenChange(false);
    }
  };
  const listboxReducer = (state, action) => {
    const newState = defaultListboxReducer(state, action);
    if (action.type === ActionTypes.keyDown && !open && (action.event.key === "ArrowUp" || action.event.key === "ArrowDown")) {
      return _extends({}, newState, {
        selectedValue: newState.highlightedValue
      });
    }
    if (action.type === ActionTypes.blur || action.type === ActionTypes.setValue || action.type === ActionTypes.optionsChange) {
      return _extends({}, newState, {
        highlightedValue: newState.selectedValue
      });
    }
    return newState;
  };
  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible
  } = useButton({
    disabled,
    ref: handleButtonRef
  });
  const selectedOption = React37.useMemo(() => {
    var _props$options$find;
    return props.multiple ? props.options.filter((o) => value.includes(o.value)) : (_props$options$find = props.options.find((o) => o.value === value)) != null ? _props$options$find : null;
  }, [props.multiple, props.options, value]);
  let useListboxParameters;
  if (props.multiple) {
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: (o) => {
        var _o$disabled;
        return (_o$disabled = o == null ? void 0 : o.disabled) != null ? _o$disabled : false;
      },
      optionComparer: (o, v) => (o == null ? void 0 : o.value) === (v == null ? void 0 : v.value),
      listboxRef: handleListboxRef,
      multiple: true,
      onChange: (newOptions) => {
        const newValues = newOptions.map((o) => o.value);
        setValue(newValues);
        onChange == null ? void 0 : onChange(newValues);
      },
      options,
      optionStringifier,
      value: selectedOption
    };
  } else {
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: (o) => {
        var _o$disabled2;
        return (_o$disabled2 = o == null ? void 0 : o.disabled) != null ? _o$disabled2 : false;
      },
      optionComparer: (o, v) => (o == null ? void 0 : o.value) === (v == null ? void 0 : v.value),
      listboxRef: handleListboxRef,
      multiple: false,
      onChange: (option) => {
        var _option$value, _option$value2;
        setValue((_option$value = option == null ? void 0 : option.value) != null ? _option$value : null);
        onChange == null ? void 0 : onChange((_option$value2 = option == null ? void 0 : option.value) != null ? _option$value2 : null);
      },
      options,
      optionStringifier,
      stateReducer: listboxReducer,
      value: selectedOption
    };
  }
  const {
    getRootProps: getListboxRootProps,
    getOptionProps: getListboxOptionProps,
    getOptionState,
    highlightedOption,
    selectedOption: listboxSelectedOption
  } = useListbox(useListboxParameters);
  const getButtonProps = (otherHandlers = {}) => {
    return _extends({}, getButtonRootProps(_extends({}, otherHandlers, {
      onClick: createHandleButtonClick(otherHandlers),
      onMouseDown: createHandleMouseDown(otherHandlers),
      onKeyDown: createHandleButtonKeyDown(otherHandlers)
    })), {
      "aria-expanded": open,
      "aria-haspopup": "listbox"
    });
  };
  const getListboxProps = (otherHandlers = {}) => getListboxRootProps(_extends({}, otherHandlers, {
    onBlur: createHandleListboxBlur(otherHandlers),
    onKeyUp: createHandleListboxKeyUp(otherHandlers)
  }));
  const getOptionProps = (option, otherHandlers = {}) => {
    return getListboxOptionProps(option, _extends({}, otherHandlers, {
      onClick: createHandleListboxItemClick(otherHandlers)
    }));
  };
  React37.useDebugValue({
    selectedOption: listboxSelectedOption,
    highlightedOption,
    open
  });
  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    open,
    value
  };
}
var React37, defaultOptionStringifier2, useSelect_default;
var init_useSelect = __esm({
  "node_modules/@mui/base/SelectUnstyled/useSelect.js"() {
    init_extends();
    React37 = __toESM(require_react());
    init_esm();
    init_ButtonUnstyled2();
    init_ListboxUnstyled();
    defaultOptionStringifier2 = (option) => {
      const {
        label,
        value
      } = option;
      if (typeof label === "string") {
        return label;
      }
      if (typeof value === "string") {
        return value;
      }
      return String(option);
    };
    useSelect_default = useSelect;
  }
});

// node_modules/@mui/base/SelectUnstyled/SelectUnstyledContext.js
var React38, SelectUnstyledContext;
var init_SelectUnstyledContext = __esm({
  "node_modules/@mui/base/SelectUnstyled/SelectUnstyledContext.js"() {
    React38 = __toESM(require_react());
    SelectUnstyledContext = React38.createContext(void 0);
  }
});

// node_modules/@mui/base/SelectUnstyled/selectUnstyledClasses.js
function getSelectUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiSelectUnstyled", slot);
}
var selectUnstyledClasses;
var init_selectUnstyledClasses = __esm({
  "node_modules/@mui/base/SelectUnstyled/selectUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    selectUnstyledClasses = generateUtilityClasses("MuiSelectUnstyled", ["root", "button", "listbox", "popper", "active", "expanded", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
function defaultRenderMultipleValues(selectedOptions) {
  return (0, import_jsx_runtime27.jsx)(React39.Fragment, {
    children: selectedOptions.map((o) => o.label).join(", ")
  });
}
function useUtilityClasses7(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active", open && "expanded"],
    listbox: ["listbox", disabled && "disabled"],
    popper: ["popper"]
  };
  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}
var React39, import_prop_types25, import_jsx_runtime27, import_jsx_runtime28, _excluded21, MultiSelectUnstyled;
var init_MultiSelectUnstyled = __esm({
  "node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React39 = __toESM(require_react());
    import_prop_types25 = __toESM(require_prop_types());
    init_esm();
    init_utils2();
    init_useSelect();
    init_utils();
    init_PopperUnstyled2();
    init_SelectUnstyledContext();
    init_composeClasses();
    init_selectUnstyledClasses();
    import_jsx_runtime27 = __toESM(require_jsx_runtime());
    import_jsx_runtime28 = __toESM(require_jsx_runtime());
    _excluded21 = ["autoFocus", "children", "component", "components", "componentsProps", "defaultListboxOpen", "defaultValue", "disabled", "listboxId", "listboxOpen", "onChange", "onListboxOpenChange", "value"];
    MultiSelectUnstyled = React39.forwardRef(function MultiSelectUnstyled2(props, ref) {
      var _props$renderValue, _ref, _components$Listbox, _components$Popper;
      const {
        autoFocus,
        children,
        component,
        components = {},
        componentsProps = {},
        defaultListboxOpen = false,
        defaultValue = [],
        disabled: disabledProp,
        listboxId,
        listboxOpen: listboxOpenProp,
        onChange,
        onListboxOpenChange,
        value: valueProp
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded21);
      const renderValue = (_props$renderValue = props.renderValue) != null ? _props$renderValue : defaultRenderMultipleValues;
      const [groupedOptions, setGroupedOptions] = React39.useState([]);
      const options = React39.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
      const [listboxOpen, setListboxOpen] = useControlled({
        controlled: listboxOpenProp,
        default: defaultListboxOpen,
        name: "MultiSelectUnstyled",
        state: "listboxOpen"
      });
      React39.useEffect(() => {
        setGroupedOptions(getOptionsFromChildren(children));
      }, [children]);
      const [buttonDefined, setButtonDefined] = React39.useState(false);
      const buttonRef = React39.useRef(null);
      const listboxRef = React39.useRef(null);
      const Button = (_ref = component != null ? component : components.Root) != null ? _ref : "button";
      const ListboxRoot = (_components$Listbox = components.Listbox) != null ? _components$Listbox : "ul";
      const Popper = (_components$Popper = components.Popper) != null ? _components$Popper : PopperUnstyled_default;
      const handleButtonRefChange = (element) => {
        buttonRef.current = element;
        if (element != null) {
          setButtonDefined(true);
        }
      };
      const handleButtonRef = useForkRef(ref, handleButtonRefChange);
      React39.useEffect(() => {
        if (autoFocus) {
          buttonRef.current.focus();
        }
      }, [autoFocus]);
      const handleOpenChange = (isOpen) => {
        setListboxOpen(isOpen);
        onListboxOpenChange == null ? void 0 : onListboxOpenChange(isOpen);
      };
      const {
        buttonActive,
        buttonFocusVisible,
        disabled,
        getButtonProps,
        getListboxProps,
        getOptionProps,
        getOptionState,
        value
      } = useSelect_default({
        buttonRef: handleButtonRef,
        defaultValue,
        disabled: disabledProp,
        listboxId,
        multiple: true,
        onChange,
        onOpenChange: handleOpenChange,
        open: listboxOpen,
        options,
        value: valueProp
      });
      const ownerState = _extends({}, props, {
        active: buttonActive,
        defaultListboxOpen,
        disabled,
        focusVisible: buttonFocusVisible,
        open: listboxOpen,
        renderValue,
        value
      });
      const classes = useUtilityClasses7(ownerState);
      const selectedOptions = React39.useMemo(() => {
        if (value == null) {
          return [];
        }
        return options.filter((o) => value.includes(o.value));
      }, [options, value]);
      const buttonProps = useSlotProps({
        elementType: Button,
        getSlotProps: getButtonProps,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        ownerState,
        className: classes.root
      });
      const listboxProps = useSlotProps({
        elementType: ListboxRoot,
        getSlotProps: getListboxProps,
        externalSlotProps: componentsProps.listbox,
        additionalProps: {
          ref: listboxRef
        },
        ownerState,
        className: classes.listbox
      });
      const popperProps = useSlotProps({
        elementType: Popper,
        externalSlotProps: componentsProps.popper,
        additionalProps: {
          anchorEl: buttonRef.current,
          disablePortal: true,
          open: listboxOpen,
          placement: "bottom-start",
          role: void 0
        },
        ownerState,
        className: classes.popper
      });
      const context = {
        getOptionProps,
        getOptionState,
        listboxRef
      };
      return (0, import_jsx_runtime28.jsxs)(React39.Fragment, {
        children: [(0, import_jsx_runtime27.jsx)(Button, _extends({}, buttonProps, {
          children: renderValue(selectedOptions)
        })), buttonDefined && (0, import_jsx_runtime27.jsx)(Popper, _extends({}, popperProps, {
          children: (0, import_jsx_runtime27.jsx)(ListboxRoot, _extends({}, listboxProps, {
            children: (0, import_jsx_runtime27.jsx)(SelectUnstyledContext.Provider, {
              value: context,
              children
            })
          }))
        }))]
      });
    });
    true ? MultiSelectUnstyled.propTypes = {
      autoFocus: import_prop_types25.default.bool,
      children: import_prop_types25.default.node,
      component: import_prop_types25.default.elementType,
      components: import_prop_types25.default.shape({
        Listbox: import_prop_types25.default.elementType,
        Popper: import_prop_types25.default.elementType,
        Root: import_prop_types25.default.elementType
      }),
      componentsProps: import_prop_types25.default.shape({
        listbox: import_prop_types25.default.oneOfType([import_prop_types25.default.func, import_prop_types25.default.object]),
        popper: import_prop_types25.default.oneOfType([import_prop_types25.default.func, import_prop_types25.default.object]),
        root: import_prop_types25.default.oneOfType([import_prop_types25.default.func, import_prop_types25.default.object])
      }),
      defaultListboxOpen: import_prop_types25.default.bool,
      defaultValue: import_prop_types25.default.array,
      disabled: import_prop_types25.default.bool,
      listboxId: import_prop_types25.default.string,
      listboxOpen: import_prop_types25.default.bool,
      onChange: import_prop_types25.default.func,
      onListboxOpenChange: import_prop_types25.default.func,
      renderValue: import_prop_types25.default.func,
      value: import_prop_types25.default.array
    } : void 0;
  }
});

// node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.types.js
var init_MultiSelectUnstyled_types = __esm({
  "node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/MultiSelectUnstyled/index.js
var init_MultiSelectUnstyled2 = __esm({
  "node_modules/@mui/base/MultiSelectUnstyled/index.js"() {
    init_MultiSelectUnstyled();
    init_MultiSelectUnstyled_types();
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/optionGroupUnstyledClasses.js
function getOptionGroupUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiOptionGroupUnstyled", slot);
}
var optionGroupUnstyledClasses;
var init_optionGroupUnstyledClasses = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/optionGroupUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    optionGroupUnstyledClasses = generateUtilityClasses("MuiOptionGroupUnstyled", ["root", "label", "list"]);
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js
function useUtilityClasses8(disabled) {
  const slots = {
    root: ["root", disabled && "disabled"],
    label: ["label"],
    list: ["list"]
  };
  return composeClasses(slots, getOptionGroupUnstyledUtilityClass, {});
}
var import_react11, import_prop_types26, import_jsx_runtime29, import_jsx_runtime30, _excluded25, OptionGroupUnstyled;
var init_OptionGroupUnstyled = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    import_react11 = __toESM(require_react());
    import_prop_types26 = __toESM(require_prop_types());
    init_composeClasses();
    init_optionGroupUnstyledClasses();
    init_utils();
    import_jsx_runtime29 = __toESM(require_jsx_runtime());
    import_jsx_runtime30 = __toESM(require_jsx_runtime());
    _excluded25 = ["component", "components", "disabled", "componentsProps"];
    OptionGroupUnstyled = import_react11.default.forwardRef(function OptionGroupUnstyled2(props, ref) {
      const {
        component,
        components = {},
        disabled = false,
        componentsProps = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded25);
      const Root = component || (components == null ? void 0 : components.Root) || "li";
      const Label = (components == null ? void 0 : components.Label) || "span";
      const List = (components == null ? void 0 : components.List) || "ul";
      const classes = useUtilityClasses8(disabled);
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState: props,
        className: classes.root
      });
      const labelProps = useSlotProps({
        elementType: Label,
        externalSlotProps: componentsProps.label,
        ownerState: props,
        className: classes.label
      });
      const listProps = useSlotProps({
        elementType: List,
        externalSlotProps: componentsProps.list,
        ownerState: props,
        className: classes.list
      });
      return (0, import_jsx_runtime30.jsxs)(Root, _extends({}, rootProps, {
        children: [(0, import_jsx_runtime29.jsx)(Label, _extends({}, labelProps, {
          children: props.label
        })), (0, import_jsx_runtime29.jsx)(List, _extends({}, listProps, {
          children: props.children
        }))]
      }));
    });
    true ? OptionGroupUnstyled.propTypes = {
      children: import_prop_types26.default.node,
      component: import_prop_types26.default.elementType,
      components: import_prop_types26.default.shape({
        Label: import_prop_types26.default.elementType,
        List: import_prop_types26.default.elementType,
        Root: import_prop_types26.default.elementType
      }),
      componentsProps: import_prop_types26.default.shape({
        label: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object]),
        list: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object]),
        root: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object])
      }),
      disabled: import_prop_types26.default.bool,
      label: import_prop_types26.default.node
    } : void 0;
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.types.js
var init_OptionGroupUnstyled_types = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/index.js
var init_OptionGroupUnstyled2 = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/index.js"() {
    init_OptionGroupUnstyled();
    init_OptionGroupUnstyled_types();
    init_optionGroupUnstyledClasses();
    init_optionGroupUnstyledClasses();
  }
});

// node_modules/@mui/base/OptionUnstyled/optionUnstyledClasses.js
function getOptionUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiOptionUnstyled", slot);
}
var optionUnstyledClasses;
var init_optionUnstyledClasses = __esm({
  "node_modules/@mui/base/OptionUnstyled/optionUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    optionUnstyledClasses = generateUtilityClasses("MuiOptionUnstyled", ["root", "disabled", "selected", "highlighted"]);
  }
});

// node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js
function useUtilityClasses9(ownerState) {
  const {
    disabled,
    highlighted,
    selected
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", highlighted && "highlighted", selected && "selected"]
  };
  return composeClasses(slots, getOptionUnstyledUtilityClass, {});
}
var import_react12, import_prop_types27, import_jsx_runtime31, _excluded26, OptionUnstyled, OptionUnstyled_default;
var init_OptionUnstyled = __esm({
  "node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    import_react12 = __toESM(require_react());
    import_prop_types27 = __toESM(require_prop_types());
    init_esm();
    init_composeClasses();
    init_SelectUnstyledContext();
    init_optionUnstyledClasses();
    init_utils();
    import_jsx_runtime31 = __toESM(require_jsx_runtime());
    _excluded26 = ["children", "component", "components", "componentsProps", "disabled", "value", "label"];
    OptionUnstyled = import_react12.default.forwardRef(function OptionUnstyled2(props, ref) {
      const {
        children,
        component,
        components = {},
        componentsProps = {},
        disabled,
        value,
        label
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded26);
      const selectContext = import_react12.default.useContext(SelectUnstyledContext);
      if (!selectContext) {
        throw new Error("OptionUnstyled must be used within a SelectUnstyled");
      }
      const Root = component || components.Root || "li";
      const selectOption = {
        value,
        label: label || children,
        disabled
      };
      const optionState = selectContext.getOptionState(selectOption);
      const optionProps = selectContext.getOptionProps(selectOption);
      const listboxRef = selectContext.listboxRef;
      const ownerState = _extends({}, props, optionState);
      const optionRef = import_react12.default.useRef(null);
      const handleRef = useForkRef(ref, optionRef);
      import_react12.default.useEffect(() => {
        if (optionState.highlighted) {
          if (!listboxRef.current || !optionRef.current) {
            return;
          }
          const listboxClientRect = listboxRef.current.getBoundingClientRect();
          const optionClientRect = optionRef.current.getBoundingClientRect();
          if (optionClientRect.top < listboxClientRect.top) {
            listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
          } else if (optionClientRect.bottom > listboxClientRect.bottom) {
            listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
          }
        }
      }, [optionState.highlighted, listboxRef]);
      const classes = useUtilityClasses9(ownerState);
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: _extends({}, optionProps, {
          ref: handleRef
        }),
        className: classes.root,
        ownerState
      });
      return (0, import_jsx_runtime31.jsx)(Root, _extends({}, rootProps, {
        children
      }));
    });
    true ? OptionUnstyled.propTypes = {
      children: import_prop_types27.default.node,
      component: import_prop_types27.default.elementType,
      components: import_prop_types27.default.shape({
        Root: import_prop_types27.default.elementType
      }),
      componentsProps: import_prop_types27.default.shape({
        root: import_prop_types27.default.oneOfType([import_prop_types27.default.func, import_prop_types27.default.object])
      }),
      disabled: import_prop_types27.default.bool,
      label: import_prop_types27.default.string,
      value: import_prop_types27.default.any.isRequired
    } : void 0;
    OptionUnstyled_default = import_react12.default.memo(OptionUnstyled);
  }
});

// node_modules/@mui/base/OptionUnstyled/OptionUnstyled.types.js
var init_OptionUnstyled_types = __esm({
  "node_modules/@mui/base/OptionUnstyled/OptionUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/OptionUnstyled/index.js
var init_OptionUnstyled2 = __esm({
  "node_modules/@mui/base/OptionUnstyled/index.js"() {
    init_OptionUnstyled();
    init_OptionUnstyled_types();
    init_optionUnstyledClasses();
    init_optionUnstyledClasses();
  }
});

// node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js
function defaultRenderSingleValue(selectedOption) {
  var _selectedOption$label;
  return (_selectedOption$label = selectedOption == null ? void 0 : selectedOption.label) != null ? _selectedOption$label : "";
}
function useUtilityClasses10(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active", open && "expanded"],
    listbox: ["listbox", disabled && "disabled"],
    popper: ["popper"]
  };
  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}
var React42, import_prop_types28, import_jsx_runtime32, import_jsx_runtime33, _excluded27, SelectUnstyled;
var init_SelectUnstyled = __esm({
  "node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React42 = __toESM(require_react());
    import_prop_types28 = __toESM(require_prop_types());
    init_esm();
    init_utils2();
    init_useSelect();
    init_utils();
    init_PopperUnstyled2();
    init_SelectUnstyledContext();
    init_composeClasses();
    init_selectUnstyledClasses();
    import_jsx_runtime32 = __toESM(require_jsx_runtime());
    import_jsx_runtime33 = __toESM(require_jsx_runtime());
    _excluded27 = ["autoFocus", "children", "component", "components", "componentsProps", "defaultValue", "defaultListboxOpen", "disabled", "listboxId", "listboxOpen", "onChange", "onListboxOpenChange", "renderValue", "value"];
    SelectUnstyled = React42.forwardRef(function SelectUnstyled2(props, ref) {
      var _ref, _components$Listbox, _components$Popper;
      const {
        autoFocus,
        children,
        component,
        components = {},
        componentsProps = {},
        defaultValue,
        defaultListboxOpen = false,
        disabled: disabledProp,
        listboxId,
        listboxOpen: listboxOpenProp,
        onChange,
        onListboxOpenChange,
        renderValue: renderValueProp,
        value: valueProp
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded27);
      const renderValue = renderValueProp != null ? renderValueProp : defaultRenderSingleValue;
      const [groupedOptions, setGroupedOptions] = React42.useState([]);
      const options = React42.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
      const [listboxOpen, setListboxOpen] = useControlled({
        controlled: listboxOpenProp,
        default: defaultListboxOpen,
        name: "SelectUnstyled",
        state: "listboxOpen"
      });
      React42.useEffect(() => {
        setGroupedOptions(getOptionsFromChildren(children));
      }, [children]);
      const [buttonDefined, setButtonDefined] = React42.useState(false);
      const buttonRef = React42.useRef(null);
      const listboxRef = React42.useRef(null);
      const Button = (_ref = component != null ? component : components.Root) != null ? _ref : "button";
      const ListboxRoot = (_components$Listbox = components.Listbox) != null ? _components$Listbox : "ul";
      const Popper = (_components$Popper = components.Popper) != null ? _components$Popper : PopperUnstyled_default;
      const handleButtonRefChange = (element) => {
        buttonRef.current = element;
        if (element != null) {
          setButtonDefined(true);
        }
      };
      const handleButtonRef = useForkRef(ref, handleButtonRefChange);
      React42.useEffect(() => {
        if (autoFocus) {
          buttonRef.current.focus();
        }
      }, [autoFocus]);
      const handleOpenChange = (isOpen) => {
        setListboxOpen(isOpen);
        onListboxOpenChange == null ? void 0 : onListboxOpenChange(isOpen);
      };
      const {
        buttonActive,
        buttonFocusVisible,
        disabled,
        getButtonProps,
        getListboxProps,
        getOptionProps,
        getOptionState,
        value
      } = useSelect_default({
        buttonRef: handleButtonRef,
        defaultValue,
        disabled: disabledProp,
        listboxId,
        multiple: false,
        onChange,
        onOpenChange: handleOpenChange,
        open: listboxOpen,
        options,
        value: valueProp
      });
      const ownerState = _extends({}, props, {
        active: buttonActive,
        defaultListboxOpen,
        disabled,
        focusVisible: buttonFocusVisible,
        open: listboxOpen,
        renderValue,
        value
      });
      const classes = useUtilityClasses10(ownerState);
      const selectedOptions = React42.useMemo(() => {
        return options.find((o) => value === o.value);
      }, [options, value]);
      const buttonProps = useSlotProps({
        elementType: Button,
        getSlotProps: getButtonProps,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        ownerState,
        className: classes.root
      });
      const listboxProps = useSlotProps({
        elementType: ListboxRoot,
        getSlotProps: getListboxProps,
        externalSlotProps: componentsProps.listbox,
        additionalProps: {
          ref: listboxRef
        },
        ownerState,
        className: classes.listbox
      });
      const popperProps = useSlotProps({
        elementType: Popper,
        externalSlotProps: componentsProps.popper,
        additionalProps: {
          anchorEl: buttonRef.current,
          disablePortal: true,
          open: listboxOpen,
          placement: "bottom-start",
          role: void 0
        },
        ownerState,
        className: classes.popper
      });
      const context = {
        getOptionProps,
        getOptionState,
        listboxRef
      };
      return (0, import_jsx_runtime33.jsxs)(React42.Fragment, {
        children: [(0, import_jsx_runtime32.jsx)(Button, _extends({}, buttonProps, {
          children: renderValue(selectedOptions)
        })), buttonDefined && (0, import_jsx_runtime32.jsx)(Popper, _extends({}, popperProps, {
          children: (0, import_jsx_runtime32.jsx)(ListboxRoot, _extends({}, listboxProps, {
            children: (0, import_jsx_runtime32.jsx)(SelectUnstyledContext.Provider, {
              value: context,
              children
            })
          }))
        }))]
      });
    });
    true ? SelectUnstyled.propTypes = {
      autoFocus: import_prop_types28.default.bool,
      children: import_prop_types28.default.node,
      component: import_prop_types28.default.elementType,
      components: import_prop_types28.default.shape({
        Listbox: import_prop_types28.default.elementType,
        Popper: import_prop_types28.default.elementType,
        Root: import_prop_types28.default.elementType
      }),
      componentsProps: import_prop_types28.default.shape({
        listbox: import_prop_types28.default.oneOfType([import_prop_types28.default.func, import_prop_types28.default.object]),
        popper: import_prop_types28.default.oneOfType([import_prop_types28.default.func, import_prop_types28.default.object]),
        root: import_prop_types28.default.oneOfType([import_prop_types28.default.func, import_prop_types28.default.object])
      }),
      defaultListboxOpen: import_prop_types28.default.bool,
      defaultValue: import_prop_types28.default.any,
      disabled: import_prop_types28.default.bool,
      listboxId: import_prop_types28.default.string,
      listboxOpen: import_prop_types28.default.bool,
      onChange: import_prop_types28.default.func,
      onListboxOpenChange: import_prop_types28.default.func,
      renderValue: import_prop_types28.default.func,
      value: import_prop_types28.default.any
    } : void 0;
  }
});

// node_modules/@mui/base/SelectUnstyled/SelectUnstyled.types.js
var init_SelectUnstyled_types = __esm({
  "node_modules/@mui/base/SelectUnstyled/SelectUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/SelectUnstyled/index.js
var init_SelectUnstyled2 = __esm({
  "node_modules/@mui/base/SelectUnstyled/index.js"() {
    init_SelectUnstyled();
    init_SelectUnstyledContext();
    init_selectUnstyledClasses();
    init_selectUnstyledClasses();
    init_SelectUnstyled_types();
    init_useSelect();
    init_useSelect_types();
    init_utils2();
  }
});

// node_modules/@mui/base/SliderUnstyled/sliderUnstyledClasses.js
function getSliderUtilityClass(slot) {
  return generateUtilityClass("MuiSlider", slot);
}
var sliderUnstyledClasses, sliderUnstyledClasses_default;
var init_sliderUnstyledClasses = __esm({
  "node_modules/@mui/base/SliderUnstyled/sliderUnstyledClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    sliderUnstyledClasses = generateUtilityClasses("MuiSlider", ["root", "active", "focusVisible", "disabled", "dragging", "marked", "vertical", "trackInverted", "trackFalse", "rail", "track", "mark", "markActive", "markLabel", "markLabelActive", "thumb", "valueLabel", "valueLabelOpen", "valueLabelCircle", "valueLabelLabel"]);
    sliderUnstyledClasses_default = sliderUnstyledClasses;
  }
});

// node_modules/@mui/base/SliderUnstyled/SliderValueLabelUnstyled.js
function SliderValueLabelUnstyled(props) {
  const {
    children,
    className,
    value,
    theme
  } = props;
  const classes = useValueLabelClasses(props);
  return React43.cloneElement(children, {
    className: clsx_m_default(children.props.className)
  }, (0, import_jsx_runtime35.jsxs)(React43.Fragment, {
    children: [children.props.children, (0, import_jsx_runtime34.jsx)("span", {
      className: clsx_m_default(classes.offset, className),
      theme,
      "aria-hidden": true,
      children: (0, import_jsx_runtime34.jsx)("span", {
        className: classes.circle,
        children: (0, import_jsx_runtime34.jsx)("span", {
          className: classes.label,
          children: value
        })
      })
    })]
  }));
}
var React43, import_prop_types29, import_jsx_runtime34, import_jsx_runtime35, useValueLabelClasses;
var init_SliderValueLabelUnstyled = __esm({
  "node_modules/@mui/base/SliderUnstyled/SliderValueLabelUnstyled.js"() {
    React43 = __toESM(require_react());
    import_prop_types29 = __toESM(require_prop_types());
    init_clsx_m();
    init_sliderUnstyledClasses();
    import_jsx_runtime34 = __toESM(require_jsx_runtime());
    import_jsx_runtime35 = __toESM(require_jsx_runtime());
    useValueLabelClasses = (props) => {
      const {
        open
      } = props;
      const utilityClasses = {
        offset: clsx_m_default(open && sliderUnstyledClasses_default.valueLabelOpen),
        circle: sliderUnstyledClasses_default.valueLabelCircle,
        label: sliderUnstyledClasses_default.valueLabelLabel
      };
      return utilityClasses;
    };
    true ? SliderValueLabelUnstyled.propTypes = {
      children: import_prop_types29.default.element.isRequired,
      className: import_prop_types29.default.string,
      theme: import_prop_types29.default.any,
      value: import_prop_types29.default.node
    } : void 0;
  }
});

// node_modules/@mui/base/SliderUnstyled/useSlider.js
function asc(a, b) {
  return a - b;
}
function clamp2(value, min2, max2) {
  if (value == null) {
    return min2;
  }
  return Math.min(Math.max(min2, value), max2);
}
function findClosest(values2, currentValue) {
  var _values$reduce;
  const {
    index: closestIndex
  } = (_values$reduce = values2.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);
    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index
      };
    }
    return acc;
  }, null)) != null ? _values$reduce : {};
  return closestIndex;
}
function trackFinger(event, touchId) {
  if (touchId.current !== void 0 && event.changedTouches) {
    const touchEvent = event;
    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return false;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
function valueToPercent(value, min2, max2) {
  return (value - min2) * 100 / (max2 - min2);
}
function percentToValue(percent, min2, max2) {
  return (max2 - min2) * percent + min2;
}
function getDecimalPrecision(num) {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min2) {
  const nearest = Math.round((value - min2) / step) * step + min2;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function setValueIndex({
  values: values2,
  newValue,
  index
}) {
  const output = values2.slice();
  output[index] = newValue;
  return output.sort(asc);
}
function focusThumb({
  sliderRef,
  activeIndex,
  setActive
}) {
  var _sliderRef$current, _doc$activeElement;
  const doc = ownerDocument(sliderRef.current);
  if (!((_sliderRef$current = sliderRef.current) != null && _sliderRef$current.contains(doc.activeElement)) || Number(doc == null ? void 0 : (_doc$activeElement = doc.activeElement) == null ? void 0 : _doc$activeElement.getAttribute("data-index")) !== activeIndex) {
    var _sliderRef$current2;
    (_sliderRef$current2 = sliderRef.current) == null ? void 0 : _sliderRef$current2.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }
  if (setActive) {
    setActive(activeIndex);
  }
}
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === void 0) {
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      cachedSupportsTouchActionNone = CSS.supports("touch-action", "none");
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}
function useSlider(parameters) {
  const {
    "aria-labelledby": ariaLabelledby,
    defaultValue,
    disabled = false,
    disableSwap = false,
    isRtl = false,
    marks: marksProp = false,
    max: max2 = 100,
    min: min2 = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    ref,
    scale = Identity,
    step = 1,
    tabIndex,
    value: valueProp
  } = parameters;
  const touchId = React44.useRef();
  const [active, setActive] = React44.useState(-1);
  const [open, setOpen] = React44.useState(-1);
  const [dragging, setDragging] = React44.useState(false);
  const moveCount = React44.useRef(0);
  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue != null ? defaultValue : min2,
    name: "Slider"
  });
  const handleChange = onChange && ((event, value, thumbIndex) => {
    const nativeEvent = event.nativeEvent || event;
    const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, "target", {
      writable: true,
      value: {
        value,
        name
      }
    });
    onChange(clonedEvent, value, thumbIndex);
  });
  const range = Array.isArray(valueDerived);
  let values2 = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values2 = values2.map((value) => clamp2(value, min2, max2));
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max2 - min2) / step) + 1)].map((_, index) => ({
    value: min2 + step * index
  })) : marksProp || [];
  const marksValues = marks.map((mark) => mark.value);
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusedThumbIndex, setFocusedThumbIndex] = React44.useState(-1);
  const sliderRef = React44.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);
  const createHandleHiddenInputFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    const index = Number(event.currentTarget.getAttribute("data-index"));
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusedThumbIndex(index);
    }
    setOpen(index);
    otherHandlers == null ? void 0 : (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
  };
  const createHandleHiddenInputBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusedThumbIndex(-1);
    }
    setOpen(-1);
    otherHandlers == null ? void 0 : (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };
  useEnhancedEffect_default(() => {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      var _document$activeEleme;
      (_document$activeEleme = document.activeElement) == null ? void 0 : _document$activeEleme.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusedThumbIndex !== -1) {
    setFocusedThumbIndex(-1);
  }
  const createHandleHiddenInputChange = (otherHandlers) => (event) => {
    var _otherHandlers$onChan;
    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const value = values2[index];
    const marksIndex = marksValues.indexOf(value);
    let newValue = event.target.valueAsNumber;
    if (marks && step == null) {
      newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
    }
    newValue = clamp2(newValue, min2, max2);
    if (marks && step == null) {
      const currentMarkIndex = marksValues.indexOf(values2[index]);
      newValue = newValue < values2[index] ? marksValues[currentMarkIndex - 1] : marksValues[currentMarkIndex + 1];
    }
    if (range) {
      if (disableSwap) {
        newValue = clamp2(newValue, values2[index - 1] || -Infinity, values2[index + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values: values2,
        newValue,
        index
      });
      let activeIndex = index;
      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }
      focusThumb({
        sliderRef,
        activeIndex
      });
    }
    setValueState(newValue);
    setFocusedThumbIndex(index);
    if (handleChange) {
      handleChange(event, newValue, index);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };
  const previousIndex = React44.useRef();
  let axis = orientation;
  if (isRtl && orientation === "horizontal") {
    axis += "-reverse";
  }
  const getFingerNewValue = ({
    finger,
    move = false,
    values: values22
  }) => {
    const {
      current: slider
    } = sliderRef;
    const {
      width: width2,
      height: height2,
      bottom: bottom3,
      left: left3
    } = slider.getBoundingClientRect();
    let percent;
    if (axis.indexOf("vertical") === 0) {
      percent = (bottom3 - finger.y) / height2;
    } else {
      percent = (finger.x - left3) / width2;
    }
    if (axis.indexOf("-reverse") !== -1) {
      percent = 1 - percent;
    }
    let newValue;
    newValue = percentToValue(percent, min2, max2);
    if (step) {
      newValue = roundValueToStep(newValue, step, min2);
    } else {
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }
    newValue = clamp2(newValue, min2, max2);
    let activeIndex = 0;
    if (range) {
      if (!move) {
        activeIndex = findClosest(values22, newValue);
      } else {
        activeIndex = previousIndex.current;
      }
      if (disableSwap) {
        newValue = clamp2(newValue, values22[activeIndex - 1] || -Infinity, values22[activeIndex + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values: values22,
        newValue,
        index: activeIndex
      });
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }
    return {
      newValue,
      activeIndex
    };
  };
  const handleTouchMove = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    if (!finger) {
      return;
    }
    moveCount.current += 1;
    if (nativeEvent.type === "mousemove" && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      move: true,
      values: values2
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }
    if (handleChange) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });
  const handleTouchEnd = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);
    if (!finger) {
      return;
    }
    const {
      newValue
    } = getFingerNewValue({
      finger,
      move: true,
      values: values2
    });
    setActive(-1);
    if (nativeEvent.type === "touchend") {
      setOpen(-1);
    }
    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }
    touchId.current = void 0;
    stopListening();
  });
  const handleTouchStart = useEventCallback((nativeEvent) => {
    if (disabled) {
      return;
    }
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }
    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger,
        values: values2
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange) {
        handleChange(nativeEvent, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("touchmove", handleTouchMove);
    doc.addEventListener("touchend", handleTouchEnd);
  });
  const stopListening = React44.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener("mousemove", handleTouchMove);
    doc.removeEventListener("mouseup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  React44.useEffect(() => {
    const {
      current: slider
    } = sliderRef;
    slider.addEventListener("touchstart", handleTouchStart, {
      passive: doesSupportTouchActionNone()
    });
    return () => {
      slider.removeEventListener("touchstart", handleTouchStart, {
        passive: doesSupportTouchActionNone()
      });
      stopListening();
    };
  }, [stopListening, handleTouchStart]);
  React44.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    (_otherHandlers$onMous = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
    if (disabled) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    const finger = trackFinger(event, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger,
        values: values2
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange) {
        handleChange(event, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("mousemove", handleTouchMove);
    doc.addEventListener("mouseup", handleTouchEnd);
  };
  const trackOffset = valueToPercent(range ? values2[0] : min2, min2, max2);
  const trackLeap = valueToPercent(values2[values2.length - 1], min2, max2) - trackOffset;
  const getRootProps = (otherHandlers = {}) => {
    const ownEventHandlers = {
      onMouseDown: createHandleMouseDown(otherHandlers || {})
    };
    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);
    return _extends({
      ref: handleRef
    }, mergedEventHandlers);
  };
  const createHandleMouseOver = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    (_otherHandlers$onMous2 = otherHandlers.onMouseOver) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute("data-index"));
    setOpen(index);
  };
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous3;
    (_otherHandlers$onMous3 = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous3.call(otherHandlers, event);
    setOpen(-1);
  };
  const getThumbProps = (otherHandlers = {}) => {
    const ownEventHandlers = {
      onMouseOver: createHandleMouseOver(otherHandlers || {}),
      onMouseLeave: createHandleMouseLeave(otherHandlers || {})
    };
    return _extends({}, otherHandlers, ownEventHandlers);
  };
  const getHiddenInputProps = (otherHandlers = {}) => {
    var _parameters$step;
    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(otherHandlers || {}),
      onFocus: createHandleHiddenInputFocus(otherHandlers || {}),
      onBlur: createHandleHiddenInputBlur(otherHandlers || {})
    };
    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);
    return _extends({
      tabIndex,
      "aria-labelledby": ariaLabelledby,
      "aria-orientation": orientation,
      "aria-valuemax": scale(max2),
      "aria-valuemin": scale(min2),
      name,
      type: "range",
      min: parameters.min,
      max: parameters.max,
      step: (_parameters$step = parameters.step) != null ? _parameters$step : void 0,
      disabled
    }, mergedEventHandlers, {
      style: _extends({}, visuallyHidden_default, {
        direction: isRtl ? "rtl" : "ltr",
        width: "100%",
        height: "100%"
      })
    });
  };
  return {
    active,
    axis,
    axisProps,
    dragging,
    focusedThumbIndex,
    getHiddenInputProps,
    getRootProps,
    getThumbProps,
    marks,
    open,
    range,
    trackLeap,
    trackOffset,
    values: values2
  };
}
var React44, INTENTIONAL_DRAG_COUNT_THRESHOLD, axisProps, Identity, cachedSupportsTouchActionNone;
var init_useSlider = __esm({
  "node_modules/@mui/base/SliderUnstyled/useSlider.js"() {
    init_extends();
    React44 = __toESM(require_react());
    init_esm();
    INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
    axisProps = {
      horizontal: {
        offset: (percent) => ({
          left: `${percent}%`
        }),
        leap: (percent) => ({
          width: `${percent}%`
        })
      },
      "horizontal-reverse": {
        offset: (percent) => ({
          right: `${percent}%`
        }),
        leap: (percent) => ({
          width: `${percent}%`
        })
      },
      vertical: {
        offset: (percent) => ({
          bottom: `${percent}%`
        }),
        leap: (percent) => ({
          height: `${percent}%`
        })
      }
    };
    Identity = (x) => x;
  }
});

// node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
var React45, import_prop_types30, import_jsx_runtime36, import_jsx_runtime37, _excluded28, Identity2, useUtilityClasses11, Forward, SliderUnstyled, SliderUnstyled_default;
var init_SliderUnstyled = __esm({
  "node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React45 = __toESM(require_react());
    import_prop_types30 = __toESM(require_prop_types());
    init_clsx_m();
    init_esm();
    init_isHostComponent();
    init_composeClasses();
    init_sliderUnstyledClasses();
    init_SliderValueLabelUnstyled();
    init_useSlider();
    init_useSlotProps();
    import_jsx_runtime36 = __toESM(require_jsx_runtime());
    import_jsx_runtime37 = __toESM(require_jsx_runtime());
    _excluded28 = ["aria-label", "aria-valuetext", "className", "component", "classes", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "orientation", "scale", "step", "tabIndex", "track", "value", "valueLabelDisplay", "valueLabelFormat", "isRtl", "components", "componentsProps"];
    Identity2 = (x) => x;
    useUtilityClasses11 = (ownerState) => {
      const {
        disabled,
        dragging,
        marked,
        orientation,
        track,
        classes
      } = ownerState;
      const slots = {
        root: ["root", disabled && "disabled", dragging && "dragging", marked && "marked", orientation === "vertical" && "vertical", track === "inverted" && "trackInverted", track === false && "trackFalse"],
        rail: ["rail"],
        track: ["track"],
        mark: ["mark"],
        markActive: ["markActive"],
        markLabel: ["markLabel"],
        markLabelActive: ["markLabelActive"],
        valueLabel: ["valueLabel"],
        thumb: ["thumb", disabled && "disabled"],
        active: ["active"],
        disabled: ["disabled"],
        focusVisible: ["focusVisible"]
      };
      return composeClasses(slots, getSliderUtilityClass, classes);
    };
    Forward = ({
      children
    }) => children;
    SliderUnstyled = React45.forwardRef(function SliderUnstyled2(props, ref) {
      var _ref, _components$Rail, _components$Track, _components$Thumb, _components$ValueLabe, _components$Mark, _components$MarkLabel;
      const {
        "aria-label": ariaLabel,
        "aria-valuetext": ariaValuetext,
        className,
        component,
        classes: classesProp,
        disableSwap = false,
        disabled = false,
        getAriaLabel,
        getAriaValueText,
        marks: marksProp = false,
        max: max2 = 100,
        min: min2 = 0,
        orientation = "horizontal",
        scale = Identity2,
        step = 1,
        track = "normal",
        valueLabelDisplay = "off",
        valueLabelFormat = Identity2,
        isRtl = false,
        components = {},
        componentsProps = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded28);
      const ownerState = _extends({}, props, {
        marks: marksProp,
        classes: classesProp,
        disabled,
        isRtl,
        max: max2,
        min: min2,
        orientation,
        scale,
        step,
        track,
        valueLabelDisplay,
        valueLabelFormat
      });
      const {
        axisProps: axisProps2,
        getRootProps,
        getHiddenInputProps,
        getThumbProps,
        open,
        active,
        axis,
        range,
        focusedThumbIndex,
        dragging,
        marks,
        values: values2,
        trackOffset,
        trackLeap
      } = useSlider(_extends({}, ownerState, {
        ref
      }));
      ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
      ownerState.dragging = dragging;
      ownerState.focusedThumbIndex = focusedThumbIndex;
      const classes = useUtilityClasses11(ownerState);
      const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "span";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        ownerState,
        className: [classes.root, className]
      });
      const Rail = (_components$Rail = components.Rail) != null ? _components$Rail : "span";
      const railProps = useSlotProps({
        elementType: Rail,
        externalSlotProps: componentsProps.rail,
        ownerState,
        className: classes.rail
      });
      const Track = (_components$Track = components.Track) != null ? _components$Track : "span";
      const trackProps = useSlotProps({
        elementType: Track,
        externalSlotProps: componentsProps.track,
        additionalProps: {
          style: _extends({}, axisProps2[axis].offset(trackOffset), axisProps2[axis].leap(trackLeap))
        },
        ownerState,
        className: classes.track
      });
      const Thumb = (_components$Thumb = components.Thumb) != null ? _components$Thumb : "span";
      const thumbProps = useSlotProps({
        elementType: Thumb,
        getSlotProps: getThumbProps,
        externalSlotProps: componentsProps.thumb,
        ownerState
      });
      const ValueLabel = (_components$ValueLabe = components.ValueLabel) != null ? _components$ValueLabe : SliderValueLabelUnstyled;
      const valueLabelProps = useSlotProps({
        elementType: ValueLabel,
        externalSlotProps: componentsProps.valueLabel,
        ownerState
      });
      const Mark = (_components$Mark = components.Mark) != null ? _components$Mark : "span";
      const markProps = useSlotProps({
        elementType: Mark,
        externalSlotProps: componentsProps.mark,
        ownerState,
        className: classes.mark
      });
      const MarkLabel = (_components$MarkLabel = components.MarkLabel) != null ? _components$MarkLabel : "span";
      const markLabelProps = useSlotProps({
        elementType: MarkLabel,
        externalSlotProps: componentsProps.markLabel,
        ownerState
      });
      const Input = components.Input || "input";
      const inputProps = useSlotProps({
        elementType: Input,
        getSlotProps: getHiddenInputProps,
        externalSlotProps: componentsProps.input,
        ownerState
      });
      return (0, import_jsx_runtime37.jsxs)(Root, _extends({}, rootProps, {
        children: [(0, import_jsx_runtime36.jsx)(Rail, _extends({}, railProps)), (0, import_jsx_runtime36.jsx)(Track, _extends({}, trackProps)), marks.filter((mark) => mark.value >= min2 && mark.value <= max2).map((mark, index) => {
          const percent = valueToPercent(mark.value, min2, max2);
          const style3 = axisProps2[axis].offset(percent);
          let markActive;
          if (track === false) {
            markActive = values2.indexOf(mark.value) !== -1;
          } else {
            markActive = track === "normal" && (range ? mark.value >= values2[0] && mark.value <= values2[values2.length - 1] : mark.value <= values2[0]) || track === "inverted" && (range ? mark.value <= values2[0] || mark.value >= values2[values2.length - 1] : mark.value >= values2[0]);
          }
          return (0, import_jsx_runtime37.jsxs)(React45.Fragment, {
            children: [(0, import_jsx_runtime36.jsx)(Mark, _extends({
              "data-index": index
            }, markProps, !isHostComponent_default(Mark) && {
              markActive
            }, {
              style: _extends({}, style3, markProps.style),
              className: clsx_m_default(markProps.className, markActive && classes.markActive)
            })), mark.label != null ? (0, import_jsx_runtime36.jsx)(MarkLabel, _extends({
              "aria-hidden": true,
              "data-index": index
            }, markLabelProps, !isHostComponent_default(MarkLabel) && {
              markLabelActive: markActive
            }, {
              style: _extends({}, style3, markLabelProps.style),
              className: clsx_m_default(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
              children: mark.label
            })) : null]
          }, mark.value);
        }), values2.map((value, index) => {
          const percent = valueToPercent(value, min2, max2);
          const style3 = axisProps2[axis].offset(percent);
          const ValueLabelComponent = valueLabelDisplay === "off" ? Forward : ValueLabel;
          return (0, import_jsx_runtime36.jsx)(React45.Fragment, {
            children: (0, import_jsx_runtime36.jsx)(ValueLabelComponent, _extends({}, !isHostComponent_default(ValueLabelComponent) && {
              valueLabelFormat,
              valueLabelDisplay,
              value: typeof valueLabelFormat === "function" ? valueLabelFormat(scale(value), index) : valueLabelFormat,
              index,
              open: open === index || active === index || valueLabelDisplay === "on",
              disabled
            }, valueLabelProps, {
              className: clsx_m_default(classes.valueLabel, valueLabelProps.className),
              children: (0, import_jsx_runtime36.jsx)(Thumb, _extends({
                "data-index": index,
                "data-focusvisible": focusedThumbIndex === index
              }, thumbProps, {
                className: clsx_m_default(classes.thumb, thumbProps.className, active === index && classes.active, focusedThumbIndex === index && classes.focusVisible),
                style: _extends({}, style3, {
                  pointerEvents: disableSwap && active !== index ? "none" : void 0
                }, thumbProps.style),
                children: (0, import_jsx_runtime36.jsx)(Input, _extends({
                  "data-index": index,
                  "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
                  "aria-valuenow": scale(value),
                  "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
                  value: values2[index]
                }, inputProps))
              }))
            }))
          }, index);
        })]
      }));
    });
    true ? SliderUnstyled.propTypes = {
      "aria-label": chainPropTypes(import_prop_types30.default.string, (props) => {
        const range = Array.isArray(props.value || props.defaultValue);
        if (range && props["aria-label"] != null) {
          return new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.");
        }
        return null;
      }),
      "aria-labelledby": import_prop_types30.default.string,
      "aria-valuetext": chainPropTypes(import_prop_types30.default.string, (props) => {
        const range = Array.isArray(props.value || props.defaultValue);
        if (range && props["aria-valuetext"] != null) {
          return new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.");
        }
        return null;
      }),
      children: import_prop_types30.default.node,
      classes: import_prop_types30.default.object,
      className: import_prop_types30.default.string,
      component: import_prop_types30.default.elementType,
      components: import_prop_types30.default.shape({
        Input: import_prop_types30.default.elementType,
        Mark: import_prop_types30.default.elementType,
        MarkLabel: import_prop_types30.default.elementType,
        Rail: import_prop_types30.default.elementType,
        Root: import_prop_types30.default.elementType,
        Thumb: import_prop_types30.default.elementType,
        Track: import_prop_types30.default.elementType,
        ValueLabel: import_prop_types30.default.elementType
      }),
      componentsProps: import_prop_types30.default.shape({
        input: import_prop_types30.default.oneOfType([import_prop_types30.default.func, import_prop_types30.default.object]),
        mark: import_prop_types30.default.oneOfType([import_prop_types30.default.func, import_prop_types30.default.object]),
        markLabel: import_prop_types30.default.oneOfType([import_prop_types30.default.func, import_prop_types30.default.object]),
        rail: import_prop_types30.default.oneOfType([import_prop_types30.default.func, import_prop_types30.default.object]),
        root: import_prop_types30.default.oneOfType([import_prop_types30.default.func, import_prop_types30.default.object]),
        thumb: import_prop_types30.default.oneOfType([import_prop_types30.default.func, import_prop_types30.default.object]),
        track: import_prop_types30.default.oneOfType([import_prop_types30.default.func, import_prop_types30.default.object]),
        valueLabel: import_prop_types30.default.oneOfType([import_prop_types30.default.func, import_prop_types30.default.shape({
          children: import_prop_types30.default.element,
          className: import_prop_types30.default.string,
          components: import_prop_types30.default.shape({
            Root: import_prop_types30.default.elementType
          }),
          open: import_prop_types30.default.bool,
          style: import_prop_types30.default.object,
          value: import_prop_types30.default.number,
          valueLabelDisplay: import_prop_types30.default.oneOf(["auto", "off", "on"])
        })])
      }),
      defaultValue: import_prop_types30.default.oneOfType([import_prop_types30.default.arrayOf(import_prop_types30.default.number), import_prop_types30.default.number]),
      disabled: import_prop_types30.default.bool,
      disableSwap: import_prop_types30.default.bool,
      getAriaLabel: import_prop_types30.default.func,
      getAriaValueText: import_prop_types30.default.func,
      isRtl: import_prop_types30.default.bool,
      marks: import_prop_types30.default.oneOfType([import_prop_types30.default.arrayOf(import_prop_types30.default.shape({
        label: import_prop_types30.default.node,
        value: import_prop_types30.default.number.isRequired
      })), import_prop_types30.default.bool]),
      max: import_prop_types30.default.number,
      min: import_prop_types30.default.number,
      name: import_prop_types30.default.string,
      onChange: import_prop_types30.default.func,
      onChangeCommitted: import_prop_types30.default.func,
      orientation: import_prop_types30.default.oneOf(["horizontal", "vertical"]),
      scale: import_prop_types30.default.func,
      step: import_prop_types30.default.number,
      tabIndex: import_prop_types30.default.number,
      track: import_prop_types30.default.oneOf(["inverted", "normal", false]),
      value: import_prop_types30.default.oneOfType([import_prop_types30.default.arrayOf(import_prop_types30.default.number), import_prop_types30.default.number]),
      valueLabelDisplay: import_prop_types30.default.oneOf(["auto", "off", "on"]),
      valueLabelFormat: import_prop_types30.default.oneOfType([import_prop_types30.default.func, import_prop_types30.default.string])
    } : void 0;
    SliderUnstyled_default = SliderUnstyled;
  }
});

// node_modules/@mui/base/SliderUnstyled/index.js
var init_SliderUnstyled2 = __esm({
  "node_modules/@mui/base/SliderUnstyled/index.js"() {
    init_SliderUnstyled();
    init_SliderValueLabelUnstyled();
    init_sliderUnstyledClasses();
    init_useSlider();
    init_sliderUnstyledClasses();
  }
});

// node_modules/@mui/base/SwitchUnstyled/useSwitch.js
function useSwitch(props) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "Switch",
    state: "checked"
  });
  const createHandleInputChange = (otherProps) => (event) => {
    var _otherProps$onChange;
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    setCheckedState(event.target.checked);
    onChange == null ? void 0 : onChange(event);
    (_otherProps$onChange = otherProps.onChange) == null ? void 0 : _otherProps$onChange.call(otherProps, event);
  };
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React46.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React46.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const inputRef = React46.useRef(null);
  const createHandleFocus = (otherProps) => (event) => {
    var _otherProps$onFocus;
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible == null ? void 0 : onFocusVisible(event);
    }
    onFocus == null ? void 0 : onFocus(event);
    (_otherProps$onFocus = otherProps.onFocus) == null ? void 0 : _otherProps$onFocus.call(otherProps, event);
  };
  const createHandleBlur = (otherProps) => (event) => {
    var _otherProps$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    onBlur == null ? void 0 : onBlur(event);
    (_otherProps$onBlur = otherProps.onBlur) == null ? void 0 : _otherProps$onBlur.call(otherProps, event);
  };
  const handleRefChange = useForkRef(focusVisibleRef, inputRef);
  const getInputProps = (otherProps = {}) => _extends({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    ref: handleRefChange,
    required,
    type: "checkbox"
  }, otherProps, {
    onChange: createHandleInputChange(otherProps),
    onFocus: createHandleFocus(otherProps),
    onBlur: createHandleBlur(otherProps)
  });
  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    readOnly: Boolean(readOnly)
  };
}
var React46;
var init_useSwitch = __esm({
  "node_modules/@mui/base/SwitchUnstyled/useSwitch.js"() {
    init_extends();
    React46 = __toESM(require_react());
    init_esm();
  }
});

// node_modules/@mui/base/SwitchUnstyled/switchUnstyledClasses.js
function getSwitchUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
var switchUnstyledClasses;
var init_switchUnstyledClasses = __esm({
  "node_modules/@mui/base/SwitchUnstyled/switchUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    switchUnstyledClasses = generateUtilityClasses("MuiSwitch", ["root", "input", "track", "thumb", "checked", "disabled", "focusVisible", "readOnly"]);
  }
});

// node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js
var React47, import_prop_types31, import_jsx_runtime38, import_jsx_runtime39, _excluded29, useUtilityClasses12, SwitchUnstyled;
var init_SwitchUnstyled = __esm({
  "node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React47 = __toESM(require_react());
    import_prop_types31 = __toESM(require_prop_types());
    init_composeClasses();
    init_useSwitch();
    init_switchUnstyledClasses();
    init_utils();
    import_jsx_runtime38 = __toESM(require_jsx_runtime());
    import_jsx_runtime39 = __toESM(require_jsx_runtime());
    _excluded29 = ["checked", "component", "components", "componentsProps", "defaultChecked", "disabled", "onBlur", "onChange", "onFocus", "onFocusVisible", "readOnly", "required"];
    useUtilityClasses12 = (ownerState) => {
      const {
        checked,
        disabled,
        focusVisible,
        readOnly
      } = ownerState;
      const slots = {
        root: ["root", checked && "checked", disabled && "disabled", focusVisible && "focusVisible", readOnly && "readOnly"],
        thumb: ["thumb"],
        input: ["input"],
        track: ["track"]
      };
      return composeClasses(slots, getSwitchUnstyledUtilityClass, {});
    };
    SwitchUnstyled = React47.forwardRef(function SwitchUnstyled2(props, ref) {
      var _ref, _components$Thumb, _components$Input, _components$Track;
      const {
        checked: checkedProp,
        component,
        components = {},
        componentsProps = {},
        defaultChecked,
        disabled: disabledProp,
        onBlur,
        onChange,
        onFocus,
        onFocusVisible,
        readOnly: readOnlyProp
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded29);
      const useSwitchProps = {
        checked: checkedProp,
        defaultChecked,
        disabled: disabledProp,
        onBlur,
        onChange,
        onFocus,
        onFocusVisible,
        readOnly: readOnlyProp
      };
      const {
        getInputProps,
        checked,
        disabled,
        focusVisible,
        readOnly
      } = useSwitch(useSwitchProps);
      const ownerState = _extends({}, props, {
        checked,
        disabled,
        focusVisible,
        readOnly
      });
      const classes = useUtilityClasses12(ownerState);
      const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "span";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState,
        className: classes.root
      });
      const Thumb = (_components$Thumb = components.Thumb) != null ? _components$Thumb : "span";
      const thumbProps = useSlotProps({
        elementType: Thumb,
        externalSlotProps: componentsProps.thumb,
        ownerState,
        className: classes.thumb
      });
      const Input = (_components$Input = components.Input) != null ? _components$Input : "input";
      const inputProps = useSlotProps({
        elementType: Input,
        getSlotProps: getInputProps,
        externalSlotProps: componentsProps.input,
        ownerState,
        className: classes.input
      });
      const Track = components.Track === null ? () => null : (_components$Track = components.Track) != null ? _components$Track : "span";
      const trackProps = useSlotProps({
        elementType: Track,
        externalSlotProps: componentsProps.track,
        ownerState,
        className: classes.track
      });
      return (0, import_jsx_runtime39.jsxs)(Root, _extends({}, rootProps, {
        children: [(0, import_jsx_runtime38.jsx)(Track, _extends({}, trackProps)), (0, import_jsx_runtime38.jsx)(Thumb, _extends({}, thumbProps)), (0, import_jsx_runtime38.jsx)(Input, _extends({}, inputProps))]
      }));
    });
    true ? SwitchUnstyled.propTypes = {
      checked: import_prop_types31.default.bool,
      children: import_prop_types31.default.node,
      component: import_prop_types31.default.elementType,
      components: import_prop_types31.default.shape({
        Input: import_prop_types31.default.elementType,
        Root: import_prop_types31.default.elementType,
        Thumb: import_prop_types31.default.elementType,
        Track: import_prop_types31.default.oneOfType([import_prop_types31.default.elementType, import_prop_types31.default.oneOf([null])])
      }),
      componentsProps: import_prop_types31.default.shape({
        input: import_prop_types31.default.oneOfType([import_prop_types31.default.func, import_prop_types31.default.object]),
        root: import_prop_types31.default.oneOfType([import_prop_types31.default.func, import_prop_types31.default.object]),
        thumb: import_prop_types31.default.oneOfType([import_prop_types31.default.func, import_prop_types31.default.object]),
        track: import_prop_types31.default.oneOfType([import_prop_types31.default.func, import_prop_types31.default.object])
      }),
      defaultChecked: import_prop_types31.default.bool,
      disabled: import_prop_types31.default.bool,
      onBlur: import_prop_types31.default.func,
      onChange: import_prop_types31.default.func,
      onFocus: import_prop_types31.default.func,
      onFocusVisible: import_prop_types31.default.func,
      readOnly: import_prop_types31.default.bool,
      required: import_prop_types31.default.bool
    } : void 0;
  }
});

// node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.types.js
var init_SwitchUnstyled_types = __esm({
  "node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/SwitchUnstyled/useSwitch.types.js
var init_useSwitch_types = __esm({
  "node_modules/@mui/base/SwitchUnstyled/useSwitch.types.js"() {
  }
});

// node_modules/@mui/base/SwitchUnstyled/index.js
var init_SwitchUnstyled2 = __esm({
  "node_modules/@mui/base/SwitchUnstyled/index.js"() {
    init_SwitchUnstyled();
    init_SwitchUnstyled_types();
    init_useSwitch();
    init_useSwitch_types();
    init_switchUnstyledClasses();
    init_switchUnstyledClasses();
  }
});

// node_modules/@mui/base/TabPanelUnstyled/tabPanelUnstyledClasses.js
function getTabPanelUnstyledUtilityClass(slot) {
  return generateUtilityClass("TabPanelUnstyled", slot);
}
var tabPanelUnstyledClasses;
var init_tabPanelUnstyledClasses = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/tabPanelUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabPanelUnstyledClasses = generateUtilityClasses("TabPanelUnstyled", ["root", "hidden"]);
  }
});

// node_modules/@mui/base/TabsUnstyled/tabsUnstyledClasses.js
function getTabsUnstyledUtilityClass(slot) {
  return generateUtilityClass("TabsUnstyled", slot);
}
var tabsUnstyledClasses;
var init_tabsUnstyledClasses = __esm({
  "node_modules/@mui/base/TabsUnstyled/tabsUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabsUnstyledClasses = generateUtilityClasses("TabsUnstyled", ["root", "horizontal", "vertical"]);
  }
});

// node_modules/@mui/base/TabsUnstyled/useTabs.js
var React48, useTabs, useTabs_default;
var init_useTabs = __esm({
  "node_modules/@mui/base/TabsUnstyled/useTabs.js"() {
    React48 = __toESM(require_react());
    init_esm();
    useTabs = (parameters) => {
      const {
        value: valueProp,
        defaultValue,
        onChange,
        orientation,
        direction,
        selectionFollowsFocus
      } = parameters;
      const [value, setValue] = useControlled({
        controlled: valueProp,
        default: defaultValue,
        name: "Tabs",
        state: "value"
      });
      const idPrefix = useId();
      const onSelected = React48.useCallback((e, newValue) => {
        setValue(newValue);
        if (onChange) {
          onChange(e, newValue);
        }
      }, [onChange, setValue]);
      const tabsContextValue = React48.useMemo(() => {
        return {
          idPrefix,
          value,
          onSelected,
          orientation,
          direction,
          selectionFollowsFocus
        };
      }, [idPrefix, value, onSelected, orientation, direction, selectionFollowsFocus]);
      return {
        tabsContextValue
      };
    };
    useTabs_default = useTabs;
  }
});

// node_modules/@mui/base/TabsUnstyled/TabsContext.js
function useTabContext() {
  return React49.useContext(Context);
}
function getPanelId(context, value) {
  const {
    idPrefix
  } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-P-${value}`;
}
function getTabId(context, value) {
  const {
    idPrefix
  } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-T-${value}`;
}
var React49, Context, TabsContext_default;
var init_TabsContext = __esm({
  "node_modules/@mui/base/TabsUnstyled/TabsContext.js"() {
    React49 = __toESM(require_react());
    Context = React49.createContext(null);
    if (true) {
      Context.displayName = "TabsContext";
    }
    TabsContext_default = Context;
  }
});

// node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js
var React50, import_prop_types32, import_jsx_runtime40, _excluded30, useUtilityClasses13, TabsUnstyled;
var init_TabsUnstyled = __esm({
  "node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React50 = __toESM(require_react());
    import_prop_types32 = __toESM(require_prop_types());
    init_utils();
    init_composeClasses();
    init_tabsUnstyledClasses();
    init_useTabs();
    init_TabsContext();
    import_jsx_runtime40 = __toESM(require_jsx_runtime());
    _excluded30 = ["children", "value", "defaultValue", "orientation", "direction", "component", "components", "componentsProps", "onChange", "selectionFollowsFocus"];
    useUtilityClasses13 = (ownerState) => {
      const {
        orientation
      } = ownerState;
      const slots = {
        root: ["root", orientation]
      };
      return composeClasses(slots, getTabsUnstyledUtilityClass, {});
    };
    TabsUnstyled = React50.forwardRef((props, ref) => {
      var _ref;
      const {
        children,
        orientation = "horizontal",
        direction = "ltr",
        component,
        components = {},
        componentsProps = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded30);
      const {
        tabsContextValue
      } = useTabs_default(props);
      const ownerState = _extends({}, props, {
        orientation,
        direction
      });
      const classes = useUtilityClasses13(ownerState);
      const TabsRoot = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
      const tabsRootProps = useSlotProps({
        elementType: TabsRoot,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime40.jsx)(TabsRoot, _extends({}, tabsRootProps, {
        children: (0, import_jsx_runtime40.jsx)(TabsContext_default.Provider, {
          value: tabsContextValue,
          children
        })
      }));
    });
    true ? TabsUnstyled.propTypes = {
      children: import_prop_types32.default.node,
      component: import_prop_types32.default.elementType,
      components: import_prop_types32.default.shape({
        Root: import_prop_types32.default.elementType
      }),
      componentsProps: import_prop_types32.default.shape({
        root: import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object])
      }),
      defaultValue: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf([false]), import_prop_types32.default.number, import_prop_types32.default.string]),
      direction: import_prop_types32.default.oneOf(["ltr", "rtl"]),
      onChange: import_prop_types32.default.func,
      orientation: import_prop_types32.default.oneOf(["horizontal", "vertical"]),
      selectionFollowsFocus: import_prop_types32.default.bool,
      value: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf([false]), import_prop_types32.default.number, import_prop_types32.default.string])
    } : void 0;
  }
});

// node_modules/@mui/base/TabsUnstyled/TabsUnstyled.types.js
var init_TabsUnstyled_types = __esm({
  "node_modules/@mui/base/TabsUnstyled/TabsUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabsUnstyled/index.js
var init_TabsUnstyled2 = __esm({
  "node_modules/@mui/base/TabsUnstyled/index.js"() {
    init_TabsUnstyled();
    init_TabsContext();
    init_TabsContext();
    init_tabsUnstyledClasses();
    init_tabsUnstyledClasses();
    init_TabsUnstyled_types();
    init_useTabs();
    init_useTabs();
  }
});

// node_modules/@mui/base/TabPanelUnstyled/useTabPanel.js
var useTabPanel, useTabPanel_default;
var init_useTabPanel = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/useTabPanel.js"() {
    init_TabsUnstyled2();
    useTabPanel = (parameters) => {
      const {
        value
      } = parameters;
      const context = useTabContext();
      if (context === null) {
        throw new Error("No TabContext provided");
      }
      const hidden = value !== context.value;
      const id = getPanelId(context, value);
      const tabId = getTabId(context, value);
      const getRootProps = () => {
        return {
          "aria-labelledby": tabId != null ? tabId : void 0,
          hidden,
          id: id != null ? id : void 0
        };
      };
      return {
        hidden,
        getRootProps
      };
    };
    useTabPanel_default = useTabPanel;
  }
});

// node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js
var React51, import_prop_types33, import_jsx_runtime41, _excluded31, useUtilityClasses14, TabPanelUnstyled;
var init_TabPanelUnstyled = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React51 = __toESM(require_react());
    import_prop_types33 = __toESM(require_prop_types());
    init_utils();
    init_composeClasses();
    init_tabPanelUnstyledClasses();
    init_useTabPanel();
    import_jsx_runtime41 = __toESM(require_jsx_runtime());
    _excluded31 = ["children", "value", "components", "componentsProps", "component"];
    useUtilityClasses14 = (ownerState) => {
      const {
        hidden
      } = ownerState;
      const slots = {
        root: ["root", hidden && "hidden"]
      };
      return composeClasses(slots, getTabPanelUnstyledUtilityClass, {});
    };
    TabPanelUnstyled = React51.forwardRef(function TabPanelUnstyled2(props, ref) {
      var _ref;
      const {
        children,
        components = {},
        componentsProps = {},
        component
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded31);
      const {
        hidden,
        getRootProps
      } = useTabPanel_default(props);
      const ownerState = _extends({}, props, {
        hidden
      });
      const classes = useUtilityClasses14(ownerState);
      const TabPanelRoot = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
      const tabPanelRootProps = useSlotProps({
        elementType: TabPanelRoot,
        getSlotProps: getRootProps,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: {
          role: "tabpanel",
          ref
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime41.jsx)(TabPanelRoot, _extends({}, tabPanelRootProps, {
        children: !hidden && children
      }));
    });
    true ? TabPanelUnstyled.propTypes = {
      children: import_prop_types33.default.node,
      component: import_prop_types33.default.elementType,
      components: import_prop_types33.default.shape({
        Root: import_prop_types33.default.elementType
      }),
      componentsProps: import_prop_types33.default.shape({
        root: import_prop_types33.default.oneOfType([import_prop_types33.default.func, import_prop_types33.default.object])
      }),
      value: import_prop_types33.default.oneOfType([import_prop_types33.default.number, import_prop_types33.default.string]).isRequired
    } : void 0;
  }
});

// node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.types.js
var init_TabPanelUnstyled_types = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabPanelUnstyled/index.js
var init_TabPanelUnstyled2 = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/index.js"() {
    init_TabPanelUnstyled();
    init_TabPanelUnstyled_types();
    init_tabPanelUnstyledClasses();
    init_tabPanelUnstyledClasses();
    init_useTabPanel();
  }
});

// node_modules/@mui/base/TabsListUnstyled/tabsListUnstyledClasses.js
function getTabsListUnstyledUtilityClass(slot) {
  return generateUtilityClass("TabsListUnstyled", slot);
}
var tabsListUnstyledClasses;
var init_tabsListUnstyledClasses = __esm({
  "node_modules/@mui/base/TabsListUnstyled/tabsListUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabsListUnstyledClasses = generateUtilityClasses("TabsListUnstyled", ["root", "horizontal", "vertical"]);
  }
});

// node_modules/@mui/base/TabsListUnstyled/useTabsList.js
var React52, import_react_is, nextItem, previousItem, moveFocus, useTabsList, useTabsList_default;
var init_useTabsList = __esm({
  "node_modules/@mui/base/TabsListUnstyled/useTabsList.js"() {
    init_extends();
    React52 = __toESM(require_react());
    init_esm();
    import_react_is = __toESM(require_react_is());
    init_TabsUnstyled2();
    init_extractEventHandlers();
    nextItem = (list, item) => {
      if (!list) {
        return null;
      }
      if (list === item) {
        return list.firstChild;
      }
      if (item && item.nextElementSibling) {
        return item.nextElementSibling;
      }
      return list.firstChild;
    };
    previousItem = (list, item) => {
      if (!list) {
        return null;
      }
      if (list === item) {
        return list.lastChild;
      }
      if (item && item.previousElementSibling) {
        return item.previousElementSibling;
      }
      return list.lastChild;
    };
    moveFocus = (list, currentFocus, traversalFunction) => {
      let wrappedOnce = false;
      let nextFocus = traversalFunction(list, currentFocus);
      while (list && nextFocus) {
        if (nextFocus === list.firstChild) {
          if (wrappedOnce) {
            return;
          }
          wrappedOnce = true;
        }
        const nextFocusDisabled = nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
        if (!nextFocus.hasAttribute("tabindex") || nextFocusDisabled) {
          nextFocus = traversalFunction(list, nextFocus);
        } else {
          nextFocus.focus();
          return;
        }
      }
    };
    useTabsList = (parameters) => {
      const {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        children,
        ref
      } = parameters;
      const tabsListRef = React52.createRef();
      const handleRef = useForkRef(tabsListRef, ref);
      const context = useTabContext();
      if (context === null) {
        throw new Error("No TabContext provided");
      }
      const {
        value,
        orientation = "horizontal",
        direction = "ltr"
      } = context;
      const isRtl = direction === "rtl";
      const handleKeyDown2 = (event) => {
        const list = tabsListRef.current;
        const currentFocus = ownerDocument(list).activeElement;
        const role = currentFocus == null ? void 0 : currentFocus.getAttribute("role");
        if (role !== "tab") {
          return;
        }
        let previousItemKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
        let nextItemKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
        if (orientation === "horizontal" && isRtl) {
          previousItemKey = "ArrowRight";
          nextItemKey = "ArrowLeft";
        }
        switch (event.key) {
          case previousItemKey:
            event.preventDefault();
            moveFocus(list, currentFocus, previousItem);
            break;
          case nextItemKey:
            event.preventDefault();
            moveFocus(list, currentFocus, nextItem);
            break;
          case "Home":
            event.preventDefault();
            moveFocus(list, null, nextItem);
            break;
          case "End":
            event.preventDefault();
            moveFocus(list, null, previousItem);
            break;
          default:
            break;
        }
      };
      const createHandleKeyDown = (otherHandlers) => (event) => {
        var _otherHandlers$onKeyD;
        handleKeyDown2(event);
        (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
      };
      const getRootProps = (otherHandlers = {}) => {
        const propsEventHandlers = extractEventHandlers(parameters);
        const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
        const ownEventHandlers = {
          onKeyDown: createHandleKeyDown(externalEventHandlers)
        };
        const mergedEventHandlers = _extends({}, externalEventHandlers, ownEventHandlers);
        return _extends({
          "aria-label": ariaLabel,
          "aria-labelledby": ariaLabelledBy,
          "aria-orientation": orientation === "vertical" ? "vertical" : void 0,
          role: "tablist",
          ref: handleRef
        }, mergedEventHandlers);
      };
      const processChildren = React52.useCallback(() => {
        const valueToIndex = /* @__PURE__ */ new Map();
        let childIndex = 0;
        const processedChildren = React52.Children.map(children, (child) => {
          if (!React52.isValidElement(child)) {
            return null;
          }
          if (true) {
            if ((0, import_react_is.isFragment)(child)) {
              console.error(["MUI: The Tabs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
            }
          }
          const childValue = child.props.value === void 0 ? childIndex : child.props.value;
          valueToIndex.set(childValue, childIndex);
          childIndex += 1;
          return React52.cloneElement(child, _extends({
            value: childValue
          }, childIndex === 1 && value === false && !child.props.tabIndex || value === childValue ? {
            tabIndex: 0
          } : {
            tabIndex: -1
          }));
        });
        return processedChildren;
      }, [children, value]);
      return {
        isRtl,
        orientation,
        value,
        processChildren,
        getRootProps
      };
    };
    useTabsList_default = useTabsList;
  }
});

// node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js
var React53, import_prop_types34, import_jsx_runtime42, _excluded33, useUtilityClasses15, TabsListUnstyled;
var init_TabsListUnstyled = __esm({
  "node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React53 = __toESM(require_react());
    import_prop_types34 = __toESM(require_prop_types());
    init_composeClasses();
    init_utils();
    init_tabsListUnstyledClasses();
    init_useTabsList();
    import_jsx_runtime42 = __toESM(require_jsx_runtime());
    _excluded33 = ["children", "component", "components", "componentsProps"];
    useUtilityClasses15 = (ownerState) => {
      const {
        orientation
      } = ownerState;
      const slots = {
        root: ["root", orientation]
      };
      return composeClasses(slots, getTabsListUnstyledUtilityClass, {});
    };
    TabsListUnstyled = React53.forwardRef((props, ref) => {
      var _ref;
      const {
        component,
        components = {},
        componentsProps = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded33);
      const {
        isRtl,
        orientation,
        getRootProps,
        processChildren
      } = useTabsList_default(_extends({}, props, {
        ref
      }));
      const ownerState = _extends({}, props, {
        isRtl,
        orientation
      });
      const classes = useUtilityClasses15(ownerState);
      const TabsListRoot = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
      const tabsListRootProps = useSlotProps({
        elementType: TabsListRoot,
        getSlotProps: getRootProps,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        ownerState,
        className: classes.root
      });
      const processedChildren = processChildren();
      return (0, import_jsx_runtime42.jsx)(TabsListRoot, _extends({}, tabsListRootProps, {
        children: processedChildren
      }));
    });
    true ? TabsListUnstyled.propTypes = {
      children: import_prop_types34.default.node,
      component: import_prop_types34.default.elementType,
      components: import_prop_types34.default.shape({
        Root: import_prop_types34.default.elementType
      }),
      componentsProps: import_prop_types34.default.shape({
        root: import_prop_types34.default.oneOfType([import_prop_types34.default.func, import_prop_types34.default.object])
      })
    } : void 0;
  }
});

// node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.types.js
var init_TabsListUnstyled_types = __esm({
  "node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabsListUnstyled/useTabsList.types.js
var init_useTabsList_types = __esm({
  "node_modules/@mui/base/TabsListUnstyled/useTabsList.types.js"() {
  }
});

// node_modules/@mui/base/TabsListUnstyled/index.js
var init_TabsListUnstyled2 = __esm({
  "node_modules/@mui/base/TabsListUnstyled/index.js"() {
    init_TabsListUnstyled();
    init_TabsListUnstyled_types();
    init_tabsListUnstyledClasses();
    init_tabsListUnstyledClasses();
    init_useTabsList();
    init_useTabsList_types();
  }
});

// node_modules/@mui/base/TabUnstyled/tabUnstyledClasses.js
function getTabUnstyledUtilityClass(slot) {
  return generateUtilityClass("TabUnstyled", slot);
}
var tabUnstyledClasses;
var init_tabUnstyledClasses = __esm({
  "node_modules/@mui/base/TabUnstyled/tabUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabUnstyledClasses = generateUtilityClasses("TabUnstyled", ["root", "selected", "disabled"]);
  }
});

// node_modules/@mui/base/TabUnstyled/useTab.js
var _excluded34, useTab, useTab_default;
var init_useTab = __esm({
  "node_modules/@mui/base/TabUnstyled/useTab.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_TabsUnstyled2();
    init_ButtonUnstyled2();
    _excluded34 = ["getRootProps"];
    useTab = (parameters) => {
      var _getPanelId, _getTabId;
      const {
        value: valueProp,
        onChange,
        onClick,
        onFocus
      } = parameters;
      const _useButton = useButton(parameters), {
        getRootProps: getRootPropsButton
      } = _useButton, otherButtonProps = _objectWithoutPropertiesLoose(_useButton, _excluded34);
      const context = useTabContext();
      if (context === null) {
        throw new Error("No TabContext provided");
      }
      const value = valueProp != null ? valueProp : 0;
      const selected = context.value === value;
      const selectionFollowsFocus = context.selectionFollowsFocus;
      const a11yAttributes = {
        role: "tab",
        "aria-controls": (_getPanelId = getPanelId(context, value)) != null ? _getPanelId : void 0,
        id: (_getTabId = getTabId(context, value)) != null ? _getTabId : void 0,
        "aria-selected": selected,
        disabled: otherButtonProps.disabled
      };
      const createHandleFocus = (otherHandlers) => (event) => {
        var _otherHandlers$onFocu;
        (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
        if (event.defaultPrevented) {
          return;
        }
        if (selectionFollowsFocus && !selected) {
          if (onChange) {
            onChange(event, value);
          }
          context.onSelected(event, value);
        }
        if (onFocus) {
          onFocus(event);
        }
      };
      const createHandleClick = (otherHandlers) => (event) => {
        var _otherHandlers$onClic;
        (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
        if (event.defaultPrevented) {
          return;
        }
        if (!selected) {
          if (onChange) {
            onChange(event, value);
          }
          context.onSelected(event, value);
        }
        if (onClick) {
          onClick(event);
        }
      };
      const getRootProps = (otherHandlers = {}) => {
        const buttonResolvedProps = getRootPropsButton(_extends({}, otherHandlers, {
          onClick: createHandleClick(otherHandlers),
          onFocus: createHandleFocus(otherHandlers)
        }));
        return _extends({}, buttonResolvedProps, a11yAttributes);
      };
      return _extends({
        getRootProps
      }, otherButtonProps, {
        selected
      });
    };
    useTab_default = useTab;
  }
});

// node_modules/@mui/base/TabUnstyled/TabUnstyled.js
var React54, import_prop_types35, import_jsx_runtime43, _excluded35, useUtilityClasses16, TabUnstyled;
var init_TabUnstyled = __esm({
  "node_modules/@mui/base/TabUnstyled/TabUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React54 = __toESM(require_react());
    import_prop_types35 = __toESM(require_prop_types());
    init_esm();
    init_composeClasses();
    init_tabUnstyledClasses();
    init_useTab();
    init_utils();
    import_jsx_runtime43 = __toESM(require_jsx_runtime());
    _excluded35 = ["action", "children", "value", "disabled", "onChange", "onClick", "onFocus", "component", "components", "componentsProps"];
    useUtilityClasses16 = (ownerState) => {
      const {
        selected,
        disabled
      } = ownerState;
      const slots = {
        root: ["root", selected && "selected", disabled && "disabled"]
      };
      return composeClasses(slots, getTabUnstyledUtilityClass, {});
    };
    TabUnstyled = React54.forwardRef(function TabUnstyled2(props, ref) {
      var _ref;
      const {
        action,
        children,
        disabled = false,
        component,
        components = {},
        componentsProps = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded35);
      const tabRef = React54.useRef();
      const handleRef = useForkRef(tabRef, ref);
      const {
        active,
        focusVisible,
        setFocusVisible,
        selected,
        getRootProps
      } = useTab_default(_extends({}, props, {
        ref: handleRef
      }));
      React54.useImperativeHandle(action, () => ({
        focusVisible: () => {
          setFocusVisible(true);
          tabRef.current.focus();
        }
      }), [setFocusVisible]);
      const ownerState = _extends({}, props, {
        active,
        focusVisible,
        disabled,
        selected
      });
      const classes = useUtilityClasses16(ownerState);
      const TabRoot = (_ref = component != null ? component : components.Root) != null ? _ref : "button";
      const tabRootProps = useSlotProps({
        elementType: TabRoot,
        getSlotProps: getRootProps,
        externalSlotProps: componentsProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime43.jsx)(TabRoot, _extends({}, tabRootProps, {
        children
      }));
    });
    true ? TabUnstyled.propTypes = {
      action: import_prop_types35.default.oneOfType([import_prop_types35.default.func, import_prop_types35.default.shape({
        current: import_prop_types35.default.shape({
          focusVisible: import_prop_types35.default.func.isRequired
        })
      })]),
      children: import_prop_types35.default.node,
      component: import_prop_types35.default.elementType,
      components: import_prop_types35.default.shape({
        Root: import_prop_types35.default.elementType
      }),
      componentsProps: import_prop_types35.default.shape({
        root: import_prop_types35.default.oneOfType([import_prop_types35.default.func, import_prop_types35.default.object])
      }),
      disabled: import_prop_types35.default.bool,
      onChange: import_prop_types35.default.func,
      onClick: import_prop_types35.default.func,
      onFocus: import_prop_types35.default.func,
      value: import_prop_types35.default.oneOfType([import_prop_types35.default.number, import_prop_types35.default.string])
    } : void 0;
  }
});

// node_modules/@mui/base/TabUnstyled/TabUnstyled.types.js
var init_TabUnstyled_types = __esm({
  "node_modules/@mui/base/TabUnstyled/TabUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabUnstyled/useTab.types.js
var init_useTab_types = __esm({
  "node_modules/@mui/base/TabUnstyled/useTab.types.js"() {
  }
});

// node_modules/@mui/base/TabUnstyled/index.js
var init_TabUnstyled2 = __esm({
  "node_modules/@mui/base/TabUnstyled/index.js"() {
    init_TabUnstyled();
    init_TabUnstyled_types();
    init_tabUnstyledClasses();
    init_tabUnstyledClasses();
    init_useTab();
    init_useTab_types();
  }
});

// node_modules/@mui/base/index.js
var init_base = __esm({
  "node_modules/@mui/base/index.js"() {
    init_utils();
    init_AutocompleteUnstyled();
    init_BadgeUnstyled2();
    init_BadgeUnstyled2();
    init_ButtonUnstyled2();
    init_ButtonUnstyled2();
    init_ClickAwayListener2();
    init_composeClasses();
    init_generateUtilityClass();
    init_generateUtilityClass();
    init_generateUtilityClasses();
    init_FormControlUnstyled2();
    init_FormControlUnstyled2();
    init_InputUnstyled2();
    init_InputUnstyled2();
    init_ListboxUnstyled();
    init_MenuUnstyled2();
    init_MenuUnstyled2();
    init_MenuItemUnstyled2();
    init_MenuItemUnstyled2();
    init_ModalUnstyled2();
    init_ModalUnstyled2();
    init_MultiSelectUnstyled2();
    init_MultiSelectUnstyled2();
    init_NoSsr2();
    init_OptionGroupUnstyled2();
    init_OptionGroupUnstyled2();
    init_OptionUnstyled2();
    init_OptionUnstyled2();
    init_PopperUnstyled2();
    init_Portal2();
    init_SelectUnstyled2();
    init_SelectUnstyled2();
    init_SliderUnstyled2();
    init_SliderUnstyled2();
    init_SwitchUnstyled2();
    init_SwitchUnstyled2();
    init_TabPanelUnstyled2();
    init_TabPanelUnstyled2();
    init_TabsListUnstyled2();
    init_TabsListUnstyled2();
    init_TabsUnstyled2();
    init_TabsUnstyled2();
    init_TabUnstyled2();
    init_TabUnstyled2();
    init_TextareaAutosize2();
    init_TrapFocus2();
  }
});

// node_modules/@mui/material/styles/createMixins.js
function createMixins(breakpoints, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}
var init_createMixins = __esm({
  "node_modules/@mui/material/styles/createMixins.js"() {
    init_extends();
  }
});

// node_modules/@mui/material/colors/common.js
var common, common_default;
var init_common = __esm({
  "node_modules/@mui/material/colors/common.js"() {
    common = {
      black: "#000",
      white: "#fff"
    };
    common_default = common;
  }
});

// node_modules/@mui/material/colors/grey.js
var grey, grey_default;
var init_grey = __esm({
  "node_modules/@mui/material/colors/grey.js"() {
    grey = {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
    };
    grey_default = grey;
  }
});

// node_modules/@mui/material/colors/purple.js
var purple, purple_default;
var init_purple = __esm({
  "node_modules/@mui/material/colors/purple.js"() {
    purple = {
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      600: "#8e24aa",
      700: "#7b1fa2",
      800: "#6a1b9a",
      900: "#4a148c",
      A100: "#ea80fc",
      A200: "#e040fb",
      A400: "#d500f9",
      A700: "#aa00ff"
    };
    purple_default = purple;
  }
});

// node_modules/@mui/material/colors/red.js
var red, red_default;
var init_red = __esm({
  "node_modules/@mui/material/colors/red.js"() {
    red = {
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
      A100: "#ff8a80",
      A200: "#ff5252",
      A400: "#ff1744",
      A700: "#d50000"
    };
    red_default = red;
  }
});

// node_modules/@mui/material/colors/orange.js
var orange, orange_default;
var init_orange = __esm({
  "node_modules/@mui/material/colors/orange.js"() {
    orange = {
      50: "#fff3e0",
      100: "#ffe0b2",
      200: "#ffcc80",
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      600: "#fb8c00",
      700: "#f57c00",
      800: "#ef6c00",
      900: "#e65100",
      A100: "#ffd180",
      A200: "#ffab40",
      A400: "#ff9100",
      A700: "#ff6d00"
    };
    orange_default = orange;
  }
});

// node_modules/@mui/material/colors/blue.js
var blue, blue_default;
var init_blue = __esm({
  "node_modules/@mui/material/colors/blue.js"() {
    blue = {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
      A100: "#82b1ff",
      A200: "#448aff",
      A400: "#2979ff",
      A700: "#2962ff"
    };
    blue_default = blue;
  }
});

// node_modules/@mui/material/colors/lightBlue.js
var lightBlue, lightBlue_default;
var init_lightBlue = __esm({
  "node_modules/@mui/material/colors/lightBlue.js"() {
    lightBlue = {
      50: "#e1f5fe",
      100: "#b3e5fc",
      200: "#81d4fa",
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      600: "#039be5",
      700: "#0288d1",
      800: "#0277bd",
      900: "#01579b",
      A100: "#80d8ff",
      A200: "#40c4ff",
      A400: "#00b0ff",
      A700: "#0091ea"
    };
    lightBlue_default = lightBlue;
  }
});

// node_modules/@mui/material/colors/green.js
var green, green_default;
var init_green = __esm({
  "node_modules/@mui/material/colors/green.js"() {
    green = {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
      A100: "#b9f6ca",
      A200: "#69f0ae",
      A400: "#00e676",
      A700: "#00c853"
    };
    green_default = green;
  }
});

// node_modules/@mui/material/styles/createPalette.js
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue_default[200],
      light: blue_default[50],
      dark: blue_default[400]
    };
  }
  return {
    main: blue_default[700],
    light: blue_default[400],
    dark: blue_default[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple_default[200],
      light: purple_default[50],
      dark: purple_default[400]
    };
  }
  return {
    main: purple_default[500],
    light: purple_default[300],
    dark: purple_default[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red_default[500],
      light: red_default[300],
      dark: red_default[700]
    };
  }
  return {
    main: red_default[700],
    light: red_default[400],
    dark: red_default[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue_default[400],
      light: lightBlue_default[300],
      dark: lightBlue_default[700]
    };
  }
  return {
    main: lightBlue_default[700],
    light: lightBlue_default[500],
    dark: lightBlue_default[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green_default[400],
      light: green_default[300],
      dark: green_default[700]
    };
  }
  return {
    main: green_default[800],
    light: green_default[500],
    dark: green_default[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange_default[400],
      light: orange_default[300],
      dark: orange_default[700]
    };
  }
  return {
    main: "#ed6c02",
    light: orange_default[500],
    dark: orange_default[900]
  };
}
function createPalette(palette2) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette2, other = _objectWithoutPropertiesLoose(palette2, _excluded36);
  const primary = palette2.primary || getDefaultPrimary(mode);
  const secondary = palette2.secondary || getDefaultSecondary(mode);
  const error = palette2.error || getDefaultError(mode);
  const info = palette2.info || getDefaultInfo(mode);
  const success = palette2.success || getDefaultSuccess(mode);
  const warning = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (true) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color2 = _extends({}, color2);
    if (!color2.main && color2[mainShade]) {
      color2.main = color2[mainShade];
    }
    if (!color2.hasOwnProperty("main")) {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color2.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
    }
    addLightOrDark(color2, "light", lightShade, tonalOffset);
    addLightOrDark(color2, "dark", darkShade, tonalOffset);
    if (!color2.contrastText) {
      color2.contrastText = getContrastText(color2.main);
    }
    return color2;
  };
  const modes = {
    dark,
    light
  };
  if (true) {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge(_extends({
    common: _extends({}, common_default),
    mode,
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    error: augmentColor({
      color: error,
      name: "error"
    }),
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    info: augmentColor({
      color: info,
      name: "info"
    }),
    success: augmentColor({
      color: success,
      name: "success"
    }),
    grey: grey_default,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}
var _excluded36, light, dark;
var init_createPalette = __esm({
  "node_modules/@mui/material/styles/createPalette.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    init_esm();
    init_esm2();
    init_common();
    init_grey();
    init_purple();
    init_red();
    init_orange();
    init_blue();
    init_lightBlue();
    init_green();
    _excluded36 = ["mode", "contrastThreshold", "tonalOffset"];
    light = {
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.38)"
      },
      divider: "rgba(0, 0, 0, 0.12)",
      background: {
        paper: common_default.white,
        default: common_default.white
      },
      action: {
        active: "rgba(0, 0, 0, 0.54)",
        hover: "rgba(0, 0, 0, 0.04)",
        hoverOpacity: 0.04,
        selected: "rgba(0, 0, 0, 0.08)",
        selectedOpacity: 0.08,
        disabled: "rgba(0, 0, 0, 0.26)",
        disabledBackground: "rgba(0, 0, 0, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(0, 0, 0, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.12
      }
    };
    dark = {
      text: {
        primary: common_default.white,
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        icon: "rgba(255, 255, 255, 0.5)"
      },
      divider: "rgba(255, 255, 255, 0.12)",
      background: {
        paper: "#121212",
        default: "#121212"
      },
      action: {
        active: common_default.white,
        hover: "rgba(255, 255, 255, 0.08)",
        hoverOpacity: 0.08,
        selected: "rgba(255, 255, 255, 0.16)",
        selectedOpacity: 0.16,
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(255, 255, 255, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.24
      }
    };
  }
});

// node_modules/@mui/material/styles/createTypography.js
function round2(value) {
  return Math.round(value * 1e5) / 1e5;
}
function createTypography(palette2, typography2) {
  const _ref = typeof typography2 === "function" ? typography2(palette2) : typography2, {
    fontFamily: fontFamily2 = defaultFontFamily,
    fontSize: fontSize2 = 14,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    htmlFontSize = 16,
    allVariants,
    pxToRem: pxToRem2
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded37);
  if (true) {
    if (typeof fontSize2 !== "number") {
      console.error("MUI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("MUI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize2 / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight2, size, lineHeight2, letterSpacing2, casing) => _extends({
    fontFamily: fontFamily2,
    fontWeight: fontWeight2,
    fontSize: pxToRem(size),
    lineHeight: lineHeight2
  }, fontFamily2 === defaultFontFamily ? {
    letterSpacing: `${round2(letterSpacing2 / size)}em`
  } : {}, casing, allVariants);
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return deepmerge(_extends({
    htmlFontSize,
    pxToRem,
    fontFamily: fontFamily2,
    fontSize: fontSize2,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
  });
}
var _excluded37, caseAllCaps, defaultFontFamily;
var init_createTypography = __esm({
  "node_modules/@mui/material/styles/createTypography.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    _excluded37 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
    caseAllCaps = {
      textTransform: "uppercase"
    };
    defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
  }
});

// node_modules/@mui/material/styles/shadows.js
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
var shadowKeyUmbraOpacity, shadowKeyPenumbraOpacity, shadowAmbientShadowOpacity, shadows, shadows_default2;
var init_shadows2 = __esm({
  "node_modules/@mui/material/styles/shadows.js"() {
    shadowKeyUmbraOpacity = 0.2;
    shadowKeyPenumbraOpacity = 0.14;
    shadowAmbientShadowOpacity = 0.12;
    shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
    shadows_default2 = shadows;
  }
});

// node_modules/@mui/material/styles/zIndex.js
var zIndex2, zIndex_default;
var init_zIndex = __esm({
  "node_modules/@mui/material/styles/zIndex.js"() {
    zIndex2 = {
      mobileStepper: 1e3,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500
    };
    zIndex_default = zIndex2;
  }
});

// node_modules/@mui/material/styles/createTheme.js
function createTheme2(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded38);
  const palette2 = createPalette(paletteInput);
  const systemTheme = createTheme_default(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette: palette2,
    shadows: shadows_default2.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex_default)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (true) {
    const stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = (node2, component) => {
      let key;
      for (key in node2) {
        const child = node2[key];
        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (true) {
            const stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node2, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join("\n"));
          }
          node2[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.indexOf("Mui") === 0) {
        traverse(styleOverrides, component);
      }
    });
  }
  return muiTheme;
}
function createMuiTheme(...args) {
  if (true) {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(["MUI: the createMuiTheme function was renamed to createTheme.", "", "You should use `import { createTheme } from '@mui/material/styles'`"].join("\n"));
    }
  }
  return createTheme2(...args);
}
var _excluded38, warnedOnce, createTheme_default2;
var init_createTheme3 = __esm({
  "node_modules/@mui/material/styles/createTheme.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    init_base();
    init_esm2();
    init_createMixins();
    init_createPalette();
    init_createTypography();
    init_shadows2();
    init_createTransitions();
    init_zIndex();
    _excluded38 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
    warnedOnce = false;
    createTheme_default2 = createTheme2;
  }
});

// node_modules/@mui/material/styles/defaultTheme.js
var defaultTheme3, defaultTheme_default;
var init_defaultTheme = __esm({
  "node_modules/@mui/material/styles/defaultTheme.js"() {
    init_createTheme3();
    defaultTheme3 = createTheme_default2();
    defaultTheme_default = defaultTheme3;
  }
});

// node_modules/@mui/material/styles/useThemeProps.js
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme: defaultTheme_default
  });
}
var init_useThemeProps3 = __esm({
  "node_modules/@mui/material/styles/useThemeProps.js"() {
    init_esm2();
    init_defaultTheme();
  }
});

export {
  isHostComponent_default,
  appendOwnerState,
  resolveComponentProps,
  init_utils,
  createFilterOptions,
  useAutocomplete,
  init_AutocompleteUnstyled,
  init_composeClasses,
  init_generateUtilityClasses,
  init_generateUtilityClass,
  BadgeUnstyled_default,
  init_BadgeUnstyled2 as init_BadgeUnstyled,
  ClickAwayListener_default,
  init_ClickAwayListener2 as init_ClickAwayListener,
  Portal_default,
  init_Portal2 as init_Portal,
  PopperUnstyled_default,
  init_PopperUnstyled2 as init_PopperUnstyled,
  ModalManager,
  getModalUtilityClass,
  modalUnstyledClasses_default,
  ModalUnstyled_default,
  init_ModalUnstyled2 as init_ModalUnstyled,
  NoSsr_default,
  init_NoSsr2 as init_NoSsr,
  getSliderUtilityClass,
  sliderUnstyledClasses_default,
  SliderValueLabelUnstyled,
  SliderUnstyled_default,
  init_SliderUnstyled2 as init_SliderUnstyled,
  TextareaAutosize_default,
  init_TextareaAutosize2 as init_TextareaAutosize,
  init_base,
  css,
  keyframes,
  StyledEngineProvider,
  GlobalStyles,
  handleBreakpoints,
  resolveBreakpointValues,
  getPath,
  createUnarySpacing,
  getValue2 as getValue,
  extendSxProp,
  sx_default,
  createBreakpoints,
  createSpacing,
  useThemeWithoutDefault_default,
  useTheme_default,
  createBox,
  shouldForwardProp,
  createStyled3 as createStyled,
  getThemeProps,
  useThemeProps,
  hexToRgb,
  decomposeColor,
  colorChannel,
  recomposeColor,
  rgbToHex,
  hslToRgb,
  getLuminance,
  getContrastRatio,
  alpha,
  darken,
  lighten,
  emphasize,
  ThemeProvider_default2 as ThemeProvider_default,
  createCssVarsProvider,
  createGetCssVar,
  createContainer,
  createGrid,
  init_Unstable_Grid,
  init_esm2 as init_esm,
  common_default,
  init_common,
  grey_default,
  init_grey,
  purple_default,
  init_purple,
  red_default,
  init_red,
  orange_default,
  init_orange,
  blue_default,
  init_blue,
  lightBlue_default,
  init_lightBlue,
  green_default,
  init_green,
  createTypography,
  init_createTypography,
  easing,
  duration,
  init_createTransitions,
  createMuiTheme,
  createTheme_default2 as createTheme_default,
  init_createTheme3 as init_createTheme,
  defaultTheme_default,
  init_defaultTheme,
  useThemeProps2,
  init_useThemeProps3 as init_useThemeProps
};
/** @license MUI v5.0.0-alpha.91
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license MUI v5.8.7
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license MUI v5.9.1
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=chunk-EKRTOSW6.js.map
