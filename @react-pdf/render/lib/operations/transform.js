"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

// TODO: Implement using only matrices to support skew and even more operations than css.
var applySingleTransformation = function applySingleTransformation(ctx, transform, origin) {
  var operation = transform.operation,
      value = transform.value;

  switch (operation) {
    case 'scale':
      {
        var scaleX = value[0],
            scaleY = value[1];
        ctx.scale(scaleX, scaleY, {
          origin: origin
        });
        break;
      }

    case 'rotate':
      {
        var angle = value[0];
        ctx.rotate(angle, {
          origin: origin
        });
        break;
      }

    case 'translate':
      {
        var x = value[0],
            y = value[1];
        ctx.translate(x, y, {
          origin: origin
        });
        break;
      }

    case 'matrix':
      {
        ctx.transform.apply(ctx, value);
        break;
      }

    default:
      {
        console.error("Transform operation: '" + operation + "' doesn't supported");
      }
  }
};

var applyTransformations = function applyTransformations(ctx, node) {
  var _node$style, _node$props;

  if (!node.origin) return node;
  var origin = [node.origin.left, node.origin.top];
  var operations = ((_node$style = node.style) === null || _node$style === void 0 ? void 0 : _node$style.transform) || ((_node$props = node.props) === null || _node$props === void 0 ? void 0 : _node$props.transform) || [];
  operations.forEach(function (operation) {
    applySingleTransformation(ctx, operation, origin);
  });
  return node;
};

var _default = R.curryN(2, applyTransformations);

exports.default = _default;