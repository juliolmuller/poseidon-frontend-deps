import {
  require_react
} from "./chunk-ANJDCHW7.js";
import {
  __toESM
} from "./chunk-5537U2Q2.js";

// node_modules/react-number-format/dist/react-number-format.es.js
var import_react = __toESM(require_react());
function noop() {
}
function returnTrue() {
  return true;
}
function charIsNumber(char) {
  return !!(char || "").match(/\d/);
}
function isNil(val) {
  return val === null || val === void 0;
}
function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
function getThousandsGroupRegex(thousandsGroupStyle) {
  switch (thousandsGroupStyle) {
    case "lakh":
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
    case "wan":
      return /(\d)(?=(\d{4})+(?!\d))/g;
    case "thousand":
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}
function applyThousandSeparator(str, thousandSeparator, thousandsGroupStyle) {
  var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  var index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return str.substring(0, index) + str.substring(index, str.length).replace(thousandsGroupRegex, "$1" + thousandSeparator);
}
function splitDecimal(numStr, allowNegative) {
  if (allowNegative === void 0)
    allowNegative = true;
  var hasNagation = numStr[0] === "-";
  var addNegation = hasNagation && allowNegative;
  numStr = numStr.replace("-", "");
  var parts = numStr.split(".");
  var beforeDecimal = parts[0];
  var afterDecimal = parts[1] || "";
  return {
    beforeDecimal,
    afterDecimal,
    hasNagation,
    addNegation
  };
}
function fixLeadingZero(numStr) {
  if (!numStr) {
    return numStr;
  }
  var isNegative = numStr[0] === "-";
  if (isNegative) {
    numStr = numStr.substring(1, numStr.length);
  }
  var parts = numStr.split(".");
  var beforeDecimal = parts[0].replace(/^0+/, "") || "0";
  var afterDecimal = parts[1] || "";
  return (isNegative ? "-" : "") + beforeDecimal + (afterDecimal ? "." + afterDecimal : "");
}
function limitToScale(numStr, scale, fixedDecimalScale) {
  var str = "";
  var filler = fixedDecimalScale ? "0" : "";
  for (var i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
}
function repeat(str, count) {
  return Array(count + 1).join(str);
}
function toNumericString(num) {
  num += "";
  var sign = num[0] === "-" ? "-" : "";
  if (sign) {
    num = num.substring(1);
  }
  var ref = num.split(/[eE]/g);
  var coefficient = ref[0];
  var exponent = ref[1];
  exponent = Number(exponent);
  if (!exponent) {
    return sign + coefficient;
  }
  coefficient = coefficient.replace(".", "");
  var decimalIndex = 1 + exponent;
  var coffiecientLn = coefficient.length;
  if (decimalIndex < 0) {
    coefficient = "0." + repeat("0", Math.abs(decimalIndex)) + coefficient;
  } else if (decimalIndex >= coffiecientLn) {
    coefficient = coefficient + repeat("0", decimalIndex - coffiecientLn);
  } else {
    coefficient = (coefficient.substring(0, decimalIndex) || "0") + "." + coefficient.substring(decimalIndex);
  }
  return sign + coefficient;
}
function roundToPrecision(numStr, scale, fixedDecimalScale) {
  if (["", "-"].indexOf(numStr) !== -1) {
    return numStr;
  }
  var shoudHaveDecimalSeparator = numStr.indexOf(".") !== -1 && scale;
  var ref = splitDecimal(numStr);
  var beforeDecimal = ref.beforeDecimal;
  var afterDecimal = ref.afterDecimal;
  var hasNagation = ref.hasNagation;
  var floatValue = parseFloat("0." + (afterDecimal || "0"));
  var floatValueStr = afterDecimal.length <= scale ? "0." + afterDecimal : floatValue.toFixed(scale);
  var roundedDecimalParts = floatValueStr.split(".");
  var intPart = beforeDecimal.split("").reverse().reduce(function(roundedStr, current, idx) {
    if (roundedStr.length > idx) {
      return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
    }
    return current + roundedStr;
  }, roundedDecimalParts[0]);
  var decimalPart = limitToScale(roundedDecimalParts[1] || "", Math.min(scale, afterDecimal.length), fixedDecimalScale);
  var negation = hasNagation ? "-" : "";
  var decimalSeparator = shoudHaveDecimalSeparator ? "." : "";
  return "" + negation + intPart + decimalSeparator + decimalPart;
}
function setCaretPosition(el, caretPos) {
  el.value = el.value;
  if (el !== null) {
    if (el.createTextRange) {
      var range = el.createTextRange();
      range.move("character", caretPos);
      range.select();
      return true;
    }
    if (el.selectionStart || el.selectionStart === 0) {
      el.focus();
      el.setSelectionRange(caretPos, caretPos);
      return true;
    }
    el.focus();
    return false;
  }
}
function findChangedIndex(prevValue, newValue) {
  var i = 0, j = 0;
  var prevLength = prevValue.length;
  var newLength = newValue.length;
  while (prevValue[i] === newValue[i] && i < prevLength) {
    i++;
  }
  while (prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] && newLength - j > i && prevLength - j > i) {
    j++;
  }
  return { start: i, end: prevLength - j };
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function getCurrentCaretPosition(el) {
  return Math.max(el.selectionStart, el.selectionEnd);
}
function addInputMode(format) {
  return format || typeof navigator !== "undefined" && !(navigator.platform && /iPhone|iPod/.test(navigator.platform));
}
function objectWithoutProperties(obj, exclude) {
  var target = {};
  for (var k in obj)
    if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1)
      target[k] = obj[k];
  return target;
}
var defaultProps = {
  displayType: "input",
  decimalSeparator: ".",
  thousandsGroupStyle: "thousand",
  fixedDecimalScale: false,
  prefix: "",
  suffix: "",
  allowNegative: true,
  allowEmptyFormatting: false,
  allowLeadingZeros: false,
  isNumericString: false,
  type: "text",
  onValueChange: noop,
  onChange: noop,
  onKeyDown: noop,
  onMouseUp: noop,
  onFocus: noop,
  onBlur: noop,
  isAllowed: returnTrue
};
var NumberFormat = function(superclass) {
  function NumberFormat2(props) {
    superclass.call(this, props);
    var defaultValue = props.defaultValue;
    this.validateProps();
    var formattedValue = this.formatValueProp(defaultValue);
    this.state = {
      value: formattedValue,
      numAsString: this.removeFormatting(formattedValue),
      mounted: false
    };
    this.selectionBeforeInput = {
      selectionStart: 0,
      selectionEnd: 0
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  if (superclass)
    NumberFormat2.__proto__ = superclass;
  NumberFormat2.prototype = Object.create(superclass && superclass.prototype);
  NumberFormat2.prototype.constructor = NumberFormat2;
  NumberFormat2.prototype.componentDidMount = function componentDidMount() {
    this.setState({
      mounted: true
    });
  };
  NumberFormat2.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.updateValueIfRequired(prevProps);
  };
  NumberFormat2.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.focusTimeout);
    clearTimeout(this.caretPositionTimeout);
  };
  NumberFormat2.prototype.updateValueIfRequired = function updateValueIfRequired(prevProps) {
    var ref = this;
    var props = ref.props;
    var state = ref.state;
    var focusedElm = ref.focusedElm;
    var stateValue = state.value;
    var lastNumStr = state.numAsString;
    if (lastNumStr === void 0)
      lastNumStr = "";
    if (prevProps !== props) {
      this.validateProps();
      var lastValueWithNewFormat = this.formatNumString(lastNumStr);
      var formattedValue = isNil(props.value) ? lastValueWithNewFormat : this.formatValueProp();
      var numAsString = this.removeFormatting(formattedValue);
      var floatValue = parseFloat(numAsString);
      var lastFloatValue = parseFloat(lastNumStr);
      if ((!isNaN(floatValue) || !isNaN(lastFloatValue)) && floatValue !== lastFloatValue || lastValueWithNewFormat !== stateValue || focusedElm === null && formattedValue !== stateValue) {
        this.updateValue({
          formattedValue,
          numAsString,
          input: focusedElm,
          source: "prop",
          event: null
        });
      }
    }
  };
  NumberFormat2.prototype.getFloatString = function getFloatString(num) {
    if (num === void 0)
      num = "";
    var ref = this.props;
    var decimalScale = ref.decimalScale;
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;
    var numRegex = this.getNumberRegex(true);
    var hasNegation = num[0] === "-";
    if (hasNegation) {
      num = num.replace("-", "");
    }
    if (decimalSeparator && decimalScale === 0) {
      num = num.split(decimalSeparator)[0];
    }
    num = (num.match(numRegex) || []).join("").replace(decimalSeparator, ".");
    var firstDecimalIndex = num.indexOf(".");
    if (firstDecimalIndex !== -1) {
      num = num.substring(0, firstDecimalIndex) + "." + num.substring(firstDecimalIndex + 1, num.length).replace(new RegExp(escapeRegExp(decimalSeparator), "g"), "");
    }
    if (hasNegation) {
      num = "-" + num;
    }
    return num;
  };
  NumberFormat2.prototype.getNumberRegex = function getNumberRegex(g, ignoreDecimalSeparator) {
    var ref = this.props;
    var format = ref.format;
    var decimalScale = ref.decimalScale;
    var customNumerals = ref.customNumerals;
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;
    return new RegExp("[0-9" + (customNumerals ? customNumerals.join("") : "") + "]" + (decimalSeparator && decimalScale !== 0 && !ignoreDecimalSeparator && !format ? "|" + escapeRegExp(decimalSeparator) : ""), g ? "g" : void 0);
  };
  NumberFormat2.prototype.getSeparators = function getSeparators() {
    var ref = this.props;
    var decimalSeparator = ref.decimalSeparator;
    var ref$1 = this.props;
    var thousandSeparator = ref$1.thousandSeparator;
    var allowedDecimalSeparators = ref$1.allowedDecimalSeparators;
    if (thousandSeparator === true) {
      thousandSeparator = ",";
    }
    if (!allowedDecimalSeparators) {
      allowedDecimalSeparators = [decimalSeparator, "."];
    }
    return {
      decimalSeparator,
      thousandSeparator,
      allowedDecimalSeparators
    };
  };
  NumberFormat2.prototype.getMaskAtIndex = function getMaskAtIndex(index) {
    var ref = this.props;
    var mask = ref.mask;
    if (mask === void 0)
      mask = " ";
    if (typeof mask === "string") {
      return mask;
    }
    return mask[index] || " ";
  };
  NumberFormat2.prototype.getValueObject = function getValueObject(formattedValue, numAsString) {
    var floatValue = parseFloat(numAsString);
    return {
      formattedValue,
      value: numAsString,
      floatValue: isNaN(floatValue) ? void 0 : floatValue
    };
  };
  NumberFormat2.prototype.validateProps = function validateProps() {
    var ref = this.props;
    var mask = ref.mask;
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;
    var thousandSeparator = ref$1.thousandSeparator;
    if (decimalSeparator === thousandSeparator) {
      throw new Error("\n          Decimal separator can't be same as thousand separator.\n          thousandSeparator: " + thousandSeparator + ' (thousandSeparator = {true} is same as thousandSeparator = ",")\n          decimalSeparator: ' + decimalSeparator + " (default value for decimalSeparator is .)\n       ");
    }
    if (mask) {
      var maskAsStr = mask === "string" ? mask : mask.toString();
      if (maskAsStr.match(/\d/g)) {
        throw new Error("\n          Mask " + mask + " should not contain numeric character;\n        ");
      }
    }
  };
  NumberFormat2.prototype.setPatchedCaretPosition = function setPatchedCaretPosition(el, caretPos, currentValue) {
    setCaretPosition(el, caretPos);
    this.caretPositionTimeout = setTimeout(function() {
      if (el.value === currentValue) {
        setCaretPosition(el, caretPos);
      }
    }, 0);
  };
  NumberFormat2.prototype.correctCaretPosition = function correctCaretPosition(value, caretPos, direction) {
    var ref = this.props;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var format = ref.format;
    if (value === "") {
      return 0;
    }
    caretPos = clamp(caretPos, 0, value.length);
    if (!format) {
      var hasNegation = value[0] === "-";
      return clamp(caretPos, prefix.length + (hasNegation ? 1 : 0), value.length - suffix.length);
    }
    if (typeof format === "function") {
      return caretPos;
    }
    if (format[caretPos] === "#" && charIsNumber(value[caretPos])) {
      return caretPos;
    }
    if (format[caretPos - 1] === "#" && charIsNumber(value[caretPos - 1])) {
      return caretPos;
    }
    var firstHashPosition = format.indexOf("#");
    var lastHashPosition = format.lastIndexOf("#");
    caretPos = clamp(caretPos, firstHashPosition, lastHashPosition + 1);
    var nextPos = format.substring(caretPos, format.length).indexOf("#");
    var caretLeftBound = caretPos;
    var caretRightBound = caretPos + (nextPos === -1 ? 0 : nextPos);
    while (caretLeftBound > firstHashPosition && (format[caretLeftBound] !== "#" || !charIsNumber(value[caretLeftBound]))) {
      caretLeftBound -= 1;
    }
    var goToLeft = !charIsNumber(value[caretRightBound]) || direction === "left" && caretPos !== firstHashPosition || caretPos - caretLeftBound < caretRightBound - caretPos;
    if (goToLeft) {
      return charIsNumber(value[caretLeftBound]) ? caretLeftBound + 1 : caretLeftBound;
    }
    return caretRightBound;
  };
  NumberFormat2.prototype.getCaretPosition = function getCaretPosition(inputValue, formattedValue, caretPos) {
    var ref = this.props;
    var format = ref.format;
    var stateValue = this.state.value;
    var numRegex = this.getNumberRegex(true);
    var inputNumber = (inputValue.match(numRegex) || []).join("");
    var formattedNumber = (formattedValue.match(numRegex) || []).join("");
    var j, i;
    j = 0;
    for (i = 0; i < caretPos; i++) {
      var currentInputChar = inputValue[i] || "";
      var currentFormatChar = formattedValue[j] || "";
      if (!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar) {
        continue;
      }
      if (currentInputChar === "0" && currentFormatChar.match(numRegex) && currentFormatChar !== "0" && inputNumber.length !== formattedNumber.length) {
        continue;
      }
      while (currentInputChar !== formattedValue[j] && j < formattedValue.length) {
        j++;
      }
      j++;
    }
    if (typeof format === "string" && !stateValue) {
      j = formattedValue.length;
    }
    j = this.correctCaretPosition(formattedValue, j);
    return j;
  };
  NumberFormat2.prototype.removePrefixAndSuffix = function removePrefixAndSuffix(val) {
    var ref = this.props;
    var format = ref.format;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    if (!format && val) {
      var isNegative = val[0] === "-";
      if (isNegative) {
        val = val.substring(1, val.length);
      }
      val = prefix && val.indexOf(prefix) === 0 ? val.substring(prefix.length, val.length) : val;
      var suffixLastIndex = val.lastIndexOf(suffix);
      val = suffix && suffixLastIndex !== -1 && suffixLastIndex === val.length - suffix.length ? val.substring(0, suffixLastIndex) : val;
      if (isNegative) {
        val = "-" + val;
      }
    }
    return val;
  };
  NumberFormat2.prototype.removePatternFormatting = function removePatternFormatting(val) {
    var ref = this.props;
    var format = ref.format;
    var formatArray = format.split("#").filter(function(str) {
      return str !== "";
    });
    var start = 0;
    var numStr = "";
    for (var i = 0, ln = formatArray.length; i <= ln; i++) {
      var part = formatArray[i] || "";
      var index = i === ln ? val.length : val.indexOf(part, start);
      if (index === -1) {
        numStr = val;
        break;
      } else {
        numStr += val.substring(start, index);
        start = index + part.length;
      }
    }
    return (numStr.match(this.getNumberRegex(true)) || []).join("");
  };
  NumberFormat2.prototype.removeFormatting = function removeFormatting(val) {
    var ref = this.props;
    var format = ref.format;
    var removeFormatting2 = ref.removeFormatting;
    if (!val) {
      return val;
    }
    if (!format) {
      val = this.removePrefixAndSuffix(val);
      val = this.getFloatString(val);
    } else if (typeof format === "string") {
      val = this.removePatternFormatting(val);
    } else if (typeof removeFormatting2 === "function") {
      val = removeFormatting2(val);
    } else {
      val = (val.match(this.getNumberRegex(true)) || []).join("");
    }
    return val;
  };
  NumberFormat2.prototype.formatWithPattern = function formatWithPattern(numStr) {
    var ref = this.props;
    var format = ref.format;
    var hashCount = 0;
    var formattedNumberAry = format.split("");
    for (var i = 0, ln = format.length; i < ln; i++) {
      if (format[i] === "#") {
        formattedNumberAry[i] = numStr[hashCount] || this.getMaskAtIndex(hashCount);
        hashCount += 1;
      }
    }
    return formattedNumberAry.join("");
  };
  NumberFormat2.prototype.formatAsNumber = function formatAsNumber(numStr) {
    var ref = this.props;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var allowNegative = ref.allowNegative;
    var thousandsGroupStyle = ref.thousandsGroupStyle;
    var ref$1 = this.getSeparators();
    var thousandSeparator = ref$1.thousandSeparator;
    var decimalSeparator = ref$1.decimalSeparator;
    var hasDecimalSeparator = numStr.indexOf(".") !== -1 || decimalScale && fixedDecimalScale;
    var ref$2 = splitDecimal(numStr, allowNegative);
    var beforeDecimal = ref$2.beforeDecimal;
    var afterDecimal = ref$2.afterDecimal;
    var addNegation = ref$2.addNegation;
    if (decimalScale !== void 0) {
      afterDecimal = limitToScale(afterDecimal, decimalScale, fixedDecimalScale);
    }
    if (thousandSeparator) {
      beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
    }
    if (prefix) {
      beforeDecimal = prefix + beforeDecimal;
    }
    if (suffix) {
      afterDecimal = afterDecimal + suffix;
    }
    if (addNegation) {
      beforeDecimal = "-" + beforeDecimal;
    }
    numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator || "") + afterDecimal;
    return numStr;
  };
  NumberFormat2.prototype.formatNumString = function formatNumString(numStr) {
    if (numStr === void 0)
      numStr = "";
    var ref = this.props;
    var format = ref.format;
    var allowEmptyFormatting = ref.allowEmptyFormatting;
    var customNumerals = ref.customNumerals;
    var formattedValue = numStr;
    if (customNumerals && customNumerals.length === 10) {
      var customNumeralRegex = new RegExp("[" + customNumerals.join("") + "]", "g");
      formattedValue = numStr.replace(customNumeralRegex, function(digit) {
        return customNumerals.indexOf(digit).toString();
      });
    }
    if (numStr === "" && !allowEmptyFormatting) {
      formattedValue = "";
    } else if (numStr === "-" && !format) {
      formattedValue = "-";
    } else if (typeof format === "string") {
      formattedValue = this.formatWithPattern(formattedValue);
    } else if (typeof format === "function") {
      formattedValue = format(formattedValue);
    } else {
      formattedValue = this.formatAsNumber(formattedValue);
    }
    return formattedValue;
  };
  NumberFormat2.prototype.formatValueProp = function formatValueProp(defaultValue) {
    var ref = this.props;
    var format = ref.format;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var allowEmptyFormatting = ref.allowEmptyFormatting;
    var ref$1 = this.props;
    var value = ref$1.value;
    var isNumericString = ref$1.isNumericString;
    value = isNil(value) ? defaultValue : value;
    var isNonNumericFalsy = !value && value !== 0;
    if (isNonNumericFalsy && allowEmptyFormatting) {
      value = "";
    }
    if (isNonNumericFalsy && !allowEmptyFormatting) {
      return "";
    }
    if (typeof value === "number") {
      value = toNumericString(value);
      isNumericString = true;
    }
    if (value === "Infinity" && isNumericString) {
      value = "";
    }
    if (isNumericString && !format && typeof decimalScale === "number") {
      value = roundToPrecision(value, decimalScale, fixedDecimalScale);
    }
    var formattedValue = isNumericString ? this.formatNumString(value) : this.formatInput(value);
    return formattedValue;
  };
  NumberFormat2.prototype.formatNegation = function formatNegation(value) {
    if (value === void 0)
      value = "";
    var ref = this.props;
    var allowNegative = ref.allowNegative;
    var negationRegex = new RegExp("(-)");
    var doubleNegationRegex = new RegExp("(-)(.)*(-)");
    var hasNegation = negationRegex.test(value);
    var removeNegation = doubleNegationRegex.test(value);
    value = value.replace(/-/g, "");
    if (hasNegation && !removeNegation && allowNegative) {
      value = "-" + value;
    }
    return value;
  };
  NumberFormat2.prototype.formatInput = function formatInput(value) {
    if (value === void 0)
      value = "";
    var ref = this.props;
    var format = ref.format;
    if (!format) {
      value = this.removePrefixAndSuffix(value);
      value = this.formatNegation(value);
    }
    value = this.removeFormatting(value);
    return this.formatNumString(value);
  };
  NumberFormat2.prototype.isCharacterAFormat = function isCharacterAFormat(caretPos, value) {
    var ref = this.props;
    var format = ref.format;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;
    if (typeof format === "string" && format[caretPos] !== "#") {
      return true;
    }
    if (!format && (caretPos < prefix.length || caretPos >= value.length - suffix.length || decimalScale && fixedDecimalScale && value[caretPos] === decimalSeparator)) {
      return true;
    }
    return false;
  };
  NumberFormat2.prototype.correctInputValue = function correctInputValue(caretPos, lastValue, value) {
    var this$1 = this;
    var ref = this.props;
    var format = ref.format;
    var allowNegative = ref.allowNegative;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var decimalScale = ref.decimalScale;
    var ref$1 = this.getSeparators();
    var allowedDecimalSeparators = ref$1.allowedDecimalSeparators;
    var decimalSeparator = ref$1.decimalSeparator;
    var lastNumStr = this.state.numAsString || "";
    var ref$2 = this.selectionBeforeInput;
    var selectionStart = ref$2.selectionStart;
    var selectionEnd = ref$2.selectionEnd;
    var ref$3 = findChangedIndex(lastValue, value);
    var start = ref$3.start;
    var end = ref$3.end;
    if (!format && start === end && allowedDecimalSeparators.indexOf(value[selectionStart]) !== -1) {
      var separator = decimalScale === 0 ? "" : decimalSeparator;
      return value.substr(0, selectionStart) + separator + value.substr(selectionStart + 1, value.length);
    }
    var leftBound = !!format ? 0 : prefix.length;
    var rightBound = lastValue.length - (!!format ? 0 : suffix.length);
    if (value.length > lastValue.length || !value.length || start === end || selectionStart === 0 && selectionEnd === lastValue.length || start === 0 && end === lastValue.length || selectionStart === leftBound && selectionEnd === rightBound) {
      return value;
    }
    var deletedValues = lastValue.substr(start, end - start);
    var formatGotDeleted = !![].concat(deletedValues).find(function(deletedVal, idx) {
      return this$1.isCharacterAFormat(idx + start, lastValue);
    });
    if (formatGotDeleted) {
      var deletedValuePortion = lastValue.substr(start);
      var recordIndexOfFormatCharacters = {};
      var resolvedPortion = [];
      [].concat(deletedValuePortion).forEach(function(currentPortion, idx) {
        if (this$1.isCharacterAFormat(idx + start, lastValue)) {
          recordIndexOfFormatCharacters[idx] = currentPortion;
        } else if (idx > deletedValues.length - 1) {
          resolvedPortion.push(currentPortion);
        }
      });
      Object.keys(recordIndexOfFormatCharacters).forEach(function(idx) {
        if (resolvedPortion.length > idx) {
          resolvedPortion.splice(idx, 0, recordIndexOfFormatCharacters[idx]);
        } else {
          resolvedPortion.push(recordIndexOfFormatCharacters[idx]);
        }
      });
      value = lastValue.substr(0, start) + resolvedPortion.join("");
    }
    if (!format) {
      var numericString = this.removeFormatting(value);
      var ref$4 = splitDecimal(numericString, allowNegative);
      var beforeDecimal = ref$4.beforeDecimal;
      var afterDecimal = ref$4.afterDecimal;
      var addNegation = ref$4.addNegation;
      var isBeforeDecimalPoint = caretPos < value.indexOf(decimalSeparator) + 1;
      if (numericString.length < lastNumStr.length && isBeforeDecimalPoint && beforeDecimal === "" && !parseFloat(afterDecimal)) {
        return addNegation ? "-" : "";
      }
    }
    return value;
  };
  NumberFormat2.prototype.updateValue = function updateValue(params) {
    var formattedValue = params.formattedValue;
    var input = params.input;
    var setCaretPosition2 = params.setCaretPosition;
    if (setCaretPosition2 === void 0)
      setCaretPosition2 = true;
    var source = params.source;
    var event = params.event;
    var numAsString = params.numAsString;
    var caretPos = params.caretPos;
    var ref = this.props;
    var onValueChange = ref.onValueChange;
    var ref$1 = this.state;
    var lastValue = ref$1.value;
    if (input) {
      if (caretPos === void 0 && setCaretPosition2) {
        var inputValue = params.inputValue || input.value;
        var currentCaretPosition = getCurrentCaretPosition(input);
        input.value = formattedValue;
        caretPos = this.getCaretPosition(inputValue, formattedValue, currentCaretPosition);
      }
      input.value = formattedValue;
      if (setCaretPosition2) {
        this.setPatchedCaretPosition(input, caretPos, formattedValue);
      }
    }
    if (numAsString === void 0) {
      numAsString = this.removeFormatting(formattedValue);
    }
    if (formattedValue !== lastValue) {
      this.setState({ value: formattedValue, numAsString });
      onValueChange(this.getValueObject(formattedValue, numAsString), { event, source });
    }
  };
  NumberFormat2.prototype.onChange = function onChange(e) {
    var el = e.target;
    var inputValue = el.value;
    var ref = this;
    var state = ref.state;
    var props = ref.props;
    var isAllowed = props.isAllowed;
    var lastValue = state.value || "";
    var currentCaretPosition = getCurrentCaretPosition(el);
    inputValue = this.correctInputValue(currentCaretPosition, lastValue, inputValue);
    var formattedValue = this.formatInput(inputValue) || "";
    var numAsString = this.removeFormatting(formattedValue);
    var valueObj = this.getValueObject(formattedValue, numAsString);
    var isChangeAllowed = isAllowed(valueObj);
    if (!isChangeAllowed) {
      formattedValue = lastValue;
    }
    this.updateValue({
      formattedValue,
      numAsString,
      inputValue,
      input: el,
      event: e,
      source: "event"
    });
    if (isChangeAllowed) {
      props.onChange(e);
    }
  };
  NumberFormat2.prototype.onBlur = function onBlur(e) {
    var ref = this;
    var props = ref.props;
    var state = ref.state;
    var format = props.format;
    var onBlur2 = props.onBlur;
    var allowLeadingZeros = props.allowLeadingZeros;
    var numAsString = state.numAsString;
    var lastValue = state.value;
    this.focusedElm = null;
    clearTimeout(this.focusTimeout);
    clearTimeout(this.caretPositionTimeout);
    if (!format) {
      if (isNaN(parseFloat(numAsString))) {
        numAsString = "";
      }
      if (!allowLeadingZeros) {
        numAsString = fixLeadingZero(numAsString);
      }
      var formattedValue = this.formatNumString(numAsString);
      if (formattedValue !== lastValue) {
        this.updateValue({
          formattedValue,
          numAsString,
          input: e.target,
          setCaretPosition: false,
          event: e,
          source: "event"
        });
        onBlur2(e);
        return;
      }
    }
    onBlur2(e);
  };
  NumberFormat2.prototype.onKeyDown = function onKeyDown(e) {
    var el = e.target;
    var key = e.key;
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value = el.value;
    if (value === void 0)
      value = "";
    var expectedCaretPosition;
    var ref = this.props;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var format = ref.format;
    var onKeyDown2 = ref.onKeyDown;
    var ignoreDecimalSeparator = decimalScale !== void 0 && fixedDecimalScale;
    var numRegex = this.getNumberRegex(false, ignoreDecimalSeparator);
    var negativeRegex = new RegExp("-");
    var isPatternFormat = typeof format === "string";
    this.selectionBeforeInput = {
      selectionStart,
      selectionEnd
    };
    if (key === "ArrowLeft" || key === "Backspace") {
      expectedCaretPosition = selectionStart - 1;
    } else if (key === "ArrowRight") {
      expectedCaretPosition = selectionStart + 1;
    } else if (key === "Delete") {
      expectedCaretPosition = selectionStart;
    }
    if (expectedCaretPosition === void 0 || selectionStart !== selectionEnd) {
      onKeyDown2(e);
      return;
    }
    var newCaretPosition = expectedCaretPosition;
    var leftBound = isPatternFormat ? format.indexOf("#") : prefix.length;
    var rightBound = isPatternFormat ? format.lastIndexOf("#") + 1 : value.length - suffix.length;
    if (key === "ArrowLeft" || key === "ArrowRight") {
      var direction = key === "ArrowLeft" ? "left" : "right";
      newCaretPosition = this.correctCaretPosition(value, expectedCaretPosition, direction);
    } else if (key === "Delete" && !numRegex.test(value[expectedCaretPosition]) && !negativeRegex.test(value[expectedCaretPosition])) {
      while (!numRegex.test(value[newCaretPosition]) && newCaretPosition < rightBound) {
        newCaretPosition++;
      }
    } else if (key === "Backspace" && !numRegex.test(value[expectedCaretPosition])) {
      if (selectionStart <= leftBound + 1 && value[0] === "-" && typeof format === "undefined") {
        var newValue = value.substring(1);
        this.updateValue({
          formattedValue: newValue,
          caretPos: newCaretPosition,
          input: el,
          event: e,
          source: "event"
        });
      } else if (!negativeRegex.test(value[expectedCaretPosition])) {
        while (!numRegex.test(value[newCaretPosition - 1]) && newCaretPosition > leftBound) {
          newCaretPosition--;
        }
        newCaretPosition = this.correctCaretPosition(value, newCaretPosition, "left");
      }
    }
    if (newCaretPosition !== expectedCaretPosition || expectedCaretPosition < leftBound || expectedCaretPosition > rightBound) {
      e.preventDefault();
      this.setPatchedCaretPosition(el, newCaretPosition, value);
    }
    if (e.isUnitTestRun) {
      this.setPatchedCaretPosition(el, newCaretPosition, value);
    }
    onKeyDown2(e);
  };
  NumberFormat2.prototype.onMouseUp = function onMouseUp(e) {
    var el = e.target;
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value = el.value;
    if (value === void 0)
      value = "";
    if (selectionStart === selectionEnd) {
      var caretPosition = this.correctCaretPosition(value, selectionStart);
      if (caretPosition !== selectionStart) {
        this.setPatchedCaretPosition(el, caretPosition, value);
      }
    }
    this.props.onMouseUp(e);
  };
  NumberFormat2.prototype.onFocus = function onFocus(e) {
    var this$1 = this;
    e.persist();
    this.focusedElm = e.target;
    this.focusTimeout = setTimeout(function() {
      var el = e.target;
      var selectionStart = el.selectionStart;
      var selectionEnd = el.selectionEnd;
      var value = el.value;
      if (value === void 0)
        value = "";
      var caretPosition = this$1.correctCaretPosition(value, selectionStart);
      if (caretPosition !== selectionStart && !(selectionStart === 0 && selectionEnd === value.length)) {
        this$1.setPatchedCaretPosition(el, caretPosition, value);
      }
      this$1.props.onFocus(e);
    }, 0);
  };
  NumberFormat2.prototype.render = function render() {
    var ref = this.props;
    var type = ref.type;
    var displayType = ref.displayType;
    var customInput = ref.customInput;
    var renderText = ref.renderText;
    var getInputRef = ref.getInputRef;
    var format = ref.format;
    var thousandSeparator = ref.thousandSeparator;
    var decimalSeparator = ref.decimalSeparator;
    var allowedDecimalSeparators = ref.allowedDecimalSeparators;
    var thousandsGroupStyle = ref.thousandsGroupStyle;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var removeFormatting = ref.removeFormatting;
    var mask = ref.mask;
    var defaultValue = ref.defaultValue;
    var isNumericString = ref.isNumericString;
    var allowNegative = ref.allowNegative;
    var allowEmptyFormatting = ref.allowEmptyFormatting;
    var allowLeadingZeros = ref.allowLeadingZeros;
    var onValueChange = ref.onValueChange;
    var isAllowed = ref.isAllowed;
    var customNumerals = ref.customNumerals;
    var onChange = ref.onChange;
    var onKeyDown = ref.onKeyDown;
    var onMouseUp = ref.onMouseUp;
    var onFocus = ref.onFocus;
    var onBlur = ref.onBlur;
    var propValue = ref.value;
    var rest = objectWithoutProperties(ref, ["type", "displayType", "customInput", "renderText", "getInputRef", "format", "thousandSeparator", "decimalSeparator", "allowedDecimalSeparators", "thousandsGroupStyle", "decimalScale", "fixedDecimalScale", "prefix", "suffix", "removeFormatting", "mask", "defaultValue", "isNumericString", "allowNegative", "allowEmptyFormatting", "allowLeadingZeros", "onValueChange", "isAllowed", "customNumerals", "onChange", "onKeyDown", "onMouseUp", "onFocus", "onBlur", "value"]);
    var otherProps = rest;
    var ref$1 = this.state;
    var value = ref$1.value;
    var mounted = ref$1.mounted;
    var inputMode = mounted && addInputMode(format) ? "numeric" : void 0;
    var inputProps = Object.assign({ inputMode }, otherProps, {
      type,
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onMouseUp: this.onMouseUp,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    });
    if (displayType === "text") {
      return renderText ? renderText(value, otherProps) || null : import_react.default.createElement("span", Object.assign({}, otherProps, { ref: getInputRef }), value);
    } else if (customInput) {
      var CustomInput = customInput;
      return import_react.default.createElement(CustomInput, Object.assign({}, inputProps, { ref: getInputRef }));
    }
    return import_react.default.createElement("input", Object.assign({}, inputProps, { ref: getInputRef }));
  };
  return NumberFormat2;
}(import_react.default.Component);
NumberFormat.defaultProps = defaultProps;
var react_number_format_es_default = NumberFormat;

// dep:react-number-format
var react_number_format_default = react_number_format_es_default;
export {
  react_number_format_default as default
};
//# sourceMappingURL=react-number-format.js.map
