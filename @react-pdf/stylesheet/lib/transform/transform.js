"use strict";

exports.__esModule = true;
exports.default = void 0;

var parse = function parse(transformString) {
  var transforms = transformString.trim().split(/\) |\)/); // Handle "initial", "inherit", "unset".

  if (transforms.length === 1) {
    return [[transforms[0], true]];
  }

  var parsed = [];

  for (var i = 0; i < transforms.length; i += 1) {
    var transform = transforms[i];

    if (transform) {
      var _transform$split = transform.split('('),
          name = _transform$split[0],
          rawValue = _transform$split[1];

      var splitChar = rawValue.indexOf(',') >= 0 ? ',' : ' ';
      var value = rawValue.split(splitChar).map(function (val) {
        return val.trim();
      });
      parsed.push({
        operation: name,
        value: value
      });
    }
  }

  return parsed;
};

var parseAngle = function parseAngle(value) {
  var unitsRegexp = /(-?\d*\.?\d*)(\w*)?/i;

  var _unitsRegexp$exec = unitsRegexp.exec(value),
      angle = _unitsRegexp$exec[1],
      unit = _unitsRegexp$exec[2];

  var number = Number.parseFloat(angle);
  return unit === 'rad' ? number * 180 / Math.PI : number;
};

var normalizeTransformOperation = function normalizeTransformOperation(_ref) {
  var operation = _ref.operation,
      value = _ref.value;

  switch (operation) {
    case 'scale':
      {
        var _value$map = value.map(function (num) {
          return Number.parseFloat(num);
        }),
            scaleX = _value$map[0],
            _value$map$ = _value$map[1],
            scaleY = _value$map$ === void 0 ? scaleX : _value$map$;

        return {
          operation: 'scale',
          value: [scaleX, scaleY]
        };
      }

    case 'scaleX':
      {
        return {
          operation: 'scale',
          value: [Number.parseFloat(value), 1]
        };
      }

    case 'scaleY':
      {
        return {
          operation: 'scale',
          value: [1, Number.parseFloat(value)]
        };
      }

    case 'rotate':
      {
        return {
          operation: 'rotate',
          value: [parseAngle(value)]
        };
      }

    case 'translate':
      {
        return {
          operation: 'translate',
          value: value.map(function (num) {
            return Number.parseFloat(num);
          })
        };
      }

    case 'translateX':
      {
        return {
          operation: 'translate',
          value: [Number.parseFloat(value), 0]
        };
      }

    case 'translateY':
      {
        return {
          operation: 'translate',
          value: [0, Number.parseFloat(value)]
        };
      }

    case 'skew':
      {
        return {
          operation: 'skew',
          value: value.map(parseAngle)
        };
      }

    case 'skewX':
      {
        return {
          operation: 'skew',
          value: [parseAngle(value), 0]
        };
      }

    case 'skewY':
      {
        return {
          operation: 'skew',
          value: [0, parseAngle(value)]
        };
      }

    default:
      {
        return {
          operation: operation,
          value: value.map(function (num) {
            return Number.parseFloat(num);
          })
        };
      }
  }
};

var normalize = function normalize(operations) {
  return operations.map(function (operation) {
    return normalizeTransformOperation(operation);
  });
};

var processTransform = function processTransform(value) {
  if (typeof value !== 'string') return value;
  return normalize(parse(value));
};

var _default = processTransform;
exports.default = _default;