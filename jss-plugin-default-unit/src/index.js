import defaultUnits, {px} from './defaultUnits'

/**
 * Clones the object and adds a camel cased property version.
 */
function addCamelCasedVersion(obj) {
  const regExp = /(-[a-z])/g
  const replace = (str) => str[1].toUpperCase()
  const newObj = {}
  for (const key in obj) {
    newObj[key] = obj[key]
    newObj[key.replace(regExp, replace)] = obj[key]
  }
  return newObj
}

const units = addCamelCasedVersion(defaultUnits)

/**
 * Recursive deep style passing function
 */
function iterate(prop, value, options) {
  if (value == null) return value

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      value[i] = iterate(prop, value[i], options)
    }
  } else if (typeof value === 'object') {
    if (prop === 'fallbacks') {
      for (const innerProp in value) {
        value[innerProp] = iterate(innerProp, value[innerProp], options)
      }
    } else {
      for (const innerProp in value) {
        value[innerProp] = iterate(`${prop}-${innerProp}`, value[innerProp], options)
      }
    }
    // eslint-disable-next-line no-restricted-globals
  } else if (typeof value === 'number' && isNaN(value) === false) {
    const unit = options[prop] || units[prop]

    // Add the unit if available, except for the special case of 0px.
    if (unit && !(value === 0 && unit === px)) {
      return typeof unit === 'function' ? unit(value).toString() : `${value}${unit}`
    }

    return value.toString()
  }

  return value
}

/**
 * Add unit to numeric values.
 */
export default function defaultUnit(options = {}) {
  const camelCasedOptions = addCamelCasedVersion(options)

  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style

    for (const prop in style) {
      style[prop] = iterate(prop, style[prop], camelCasedOptions)
    }

    return style
  }

  function onChangeValue(value, prop) {
    return iterate(prop, value, camelCasedOptions)
  }

  return {onProcessStyle, onChangeValue}
}
