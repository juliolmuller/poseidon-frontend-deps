"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _renderPath = _interopRequireDefault(require("./renderPath"));

var _renderRect = _interopRequireDefault(require("./renderRect"));

var _renderLine = _interopRequireDefault(require("./renderLine"));

var _renderGroup = _interopRequireDefault(require("./renderGroup"));

var _renderCircle = _interopRequireDefault(require("./renderCircle"));

var _renderSvgText = _interopRequireDefault(require("./renderSvgText"));

var _renderEllipse = _interopRequireDefault(require("./renderEllipse"));

var _renderPolygon = _interopRequireDefault(require("./renderPolygon"));

var _renderPolyline = _interopRequireDefault(require("./renderPolyline"));

var _renderSvgImage = _interopRequireDefault(require("./renderSvgImage"));

var _isPath = _interopRequireDefault(require("../utils/isPath"));

var _isText = _interopRequireDefault(require("../utils/isText"));

var _isRect = _interopRequireDefault(require("../utils/isRect"));

var _isLine = _interopRequireDefault(require("../utils/isLine"));

var _isTspan = _interopRequireDefault(require("../utils/isTspan"));

var _isImage = _interopRequireDefault(require("../utils/isImage"));

var _isGroup = _interopRequireDefault(require("../utils/isGroup"));

var _isCircle = _interopRequireDefault(require("../utils/isCircle"));

var _isEllipse = _interopRequireDefault(require("../utils/isEllipse"));

var _isPolygon = _interopRequireDefault(require("../utils/isPolygon"));

var _isPolyline = _interopRequireDefault(require("../utils/isPolyline"));

var _isTextInstance = _interopRequireDefault(require("../utils/isTextInstance"));

var _save = _interopRequireDefault(require("../operations/save"));

var _restore = _interopRequireDefault(require("../operations/restore"));

var _clipNode = _interopRequireDefault(require("../operations/clipNode"));

var _transform = _interopRequireDefault(require("../operations/transform"));

var _getBoundingBox = _interopRequireDefault(require("../svg/getBoundingBox"));

var warnUnsupportedNode = R.tap(function (node) {
  console.warn("SVG node of type " + node.type + " is not currenty supported");
});

var getProp = function getProp(d, p, v) {
  return R.pathOr(d, ['props', p], v);
};

var setStrokeWidth = function setStrokeWidth(ctx) {
  return function (node) {
    var lineWidth = getProp(0, 'strokeWidth', node);
    if (lineWidth) ctx.lineWidth(lineWidth);
    return node;
  };
};

var setStrokeColor = function setStrokeColor(ctx) {
  return function (node) {
    var strokeColor = getProp(null, 'stroke', node);
    if (strokeColor) ctx.strokeColor(strokeColor);
    return node;
  };
};

var setOpacity = function setOpacity(ctx) {
  return function (node) {
    var opacity = getProp(null, 'opacity', node);
    if (!R.isNil(opacity)) ctx.opacity(opacity);
    return node;
  };
};

var setFillOpacity = function setFillOpacity(ctx) {
  return function (node) {
    var fillOpacity = getProp(null, 'fillOpacity', node);
    if (!R.isNil(fillOpacity)) ctx.fillOpacity(fillOpacity);
    return node;
  };
};

var setStrokeOpacity = function setStrokeOpacity(ctx) {
  return function (node) {
    var strokeOpacity = getProp(null, 'strokeOpacity', node);
    if (!R.isNil(strokeOpacity)) ctx.strokeOpacity(strokeOpacity);
    return node;
  };
};

var setLineJoin = function setLineJoin(ctx) {
  return function (node) {
    var lineJoin = getProp(null, 'strokeLinejoin', node);
    if (lineJoin) ctx.lineJoin(lineJoin);
    return node;
  };
};

var setLineCap = function setLineCap(ctx) {
  return function (node) {
    var lineCap = getProp(null, 'strokeLinecap', node);
    if (lineCap) ctx.lineCap(lineCap);
    return node;
  };
};

var setLineDash = function setLineDash(ctx) {
  return function (node) {
    var value = getProp(null, 'strokeDasharray', node);
    if (value) ctx.dash(R.split(',', value));
    return node;
  };
};

var hasLinearGradientFill = R.pathEq(['props', 'fill', 'type'], P.LinearGradient);
var hasRadialGradientFill = R.pathEq(['props', 'fill', 'type'], P.RadialGradient); // Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L104

var setLinearGradientFill = function setLinearGradientFill(ctx) {
  return R.tap(function (node) {
    var bbox = (0, _getBoundingBox.default)(node);
    var gradient = getProp(null, 'fill', node);
    var x1 = R.pathOr(0, ['props', 'x1'], gradient);
    var y1 = R.pathOr(0, ['props', 'y1'], gradient);
    var x2 = R.pathOr(1, ['props', 'x2'], gradient);
    var y2 = R.pathOr(0, ['props', 'y2'], gradient);
    var m0 = bbox[2] - bbox[0];
    var m3 = bbox[3] - bbox[1];
    var m4 = bbox[0];
    var m5 = bbox[1];
    var gx1 = m0 * x1 + m4;
    var gy1 = m3 * y1 + m5;
    var gx2 = m0 * x2 + m4;
    var gy2 = m3 * y2 + m5;
    var grad = ctx.linearGradient(gx1, gy1, gx2, gy2);
    gradient.children.forEach(function (stop) {
      grad.stop(stop.props.offset, stop.props.stopColor, stop.props.stopOpacity);
    });
    ctx.fill(grad);
  });
}; // Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L155


var setRadialGradientFill = function setRadialGradientFill(ctx) {
  return R.tap(function (node) {
    var bbox = (0, _getBoundingBox.default)(node);
    var gradient = getProp(null, 'fill', node);
    var cx = R.pathOr(0.5, ['props', 'cx'], gradient);
    var cy = R.pathOr(0.5, ['props', 'cy'], gradient);
    var fx = R.pathOr(cx, ['props', 'fx'], gradient);
    var fy = R.pathOr(cy, ['props', 'fy'], gradient);
    var r = R.pathOr(0.5, ['props', 'r'], gradient);
    var m0 = bbox[2] - bbox[0];
    var m3 = bbox[3] - bbox[1];
    var m4 = bbox[0];
    var m5 = bbox[1];
    var gr = r * m0;
    var gcx = m0 * cx + m4;
    var gcy = m3 * cy + m5;
    var gfx = m0 * fx + m4;
    var gfy = m3 * fy + m5;
    var grad = ctx.radialGradient(gfx, gfy, 0, gcx, gcy, gr);
    gradient.children.forEach(function (stop) {
      grad.stop(stop.props.offset, stop.props.stopColor, stop.props.stopOpacity);
    });
    ctx.fill(grad);
  });
};

var setFillColor = function setFillColor(ctx) {
  return R.tap(function (node) {
    var fillColor = getProp(null, 'fill', node);
    if (fillColor) ctx.fillColor(fillColor);
  });
};

var setFill = function setFill(ctx) {
  return R.cond([[hasLinearGradientFill, setLinearGradientFill(ctx)], [hasRadialGradientFill, setRadialGradientFill(ctx)], [R.T, setFillColor(ctx)]]);
};

var draw = function draw(ctx) {
  return function (node) {
    var props = R.propOr({}, 'props', node);

    if (props.fill && props.stroke) {
      ctx.fillAndStroke(props.fillRule);
    } else if (props.fill) {
      ctx.fill(props.fillRule);
    } else if (props.stroke) {
      ctx.stroke();
    } else {
      ctx.save();
      ctx.opacity(0);
      ctx.fill(null);
      ctx.restore();
    }

    return node;
  };
};

var renderNode = function renderNode(ctx) {
  return R.cond([[_isTspan.default, R.identity], [_isTextInstance.default, R.identity], [_isPath.default, (0, _renderPath.default)(ctx)], [_isRect.default, (0, _renderRect.default)(ctx)], [_isLine.default, (0, _renderLine.default)(ctx)], [_isGroup.default, (0, _renderGroup.default)(ctx)], [_isText.default, (0, _renderSvgText.default)(ctx)], [_isCircle.default, (0, _renderCircle.default)(ctx)], [_isImage.default, (0, _renderSvgImage.default)(ctx)], [_isEllipse.default, (0, _renderEllipse.default)(ctx)], [_isPolygon.default, (0, _renderPolygon.default)(ctx)], [_isPolyline.default, (0, _renderPolyline.default)(ctx)], [R.T, warnUnsupportedNode]]);
};

var drawNode = function drawNode(ctx) {
  return R.compose(draw(ctx), renderNode(ctx), (0, _transform.default)(ctx), setOpacity(ctx), setFillOpacity(ctx), setStrokeOpacity(ctx), setFill(ctx), setStrokeColor(ctx), setStrokeWidth(ctx), setLineJoin(ctx), setLineDash(ctx), setLineCap(ctx));
};

var clipPath = function clipPath(ctx) {
  return function (node) {
    var value = R.path(['props', 'clipPath'], node);

    if (value) {
      R.compose(function () {
        return ctx.clip();
      }, R.forEach(renderNode(ctx)), R.propOr([], 'children'))(value);
    }

    return node;
  };
};

var drawChildren = function drawChildren(ctx) {
  return function (node) {
    return R.compose(R.map(R.compose((0, _restore.default)(ctx), drawChildren(ctx), drawNode(ctx), clipPath(ctx), (0, _save.default)(ctx))), R.propOr([], 'children'))(node);
  };
};

var defaultsZero = R.pathOr(0);

var resolveAspectRatio = function resolveAspectRatio(ctx) {
  return function (node) {
    var _node$box = node.box,
        width = _node$box.width,
        height = _node$box.height;
    var _node$props = node.props,
        viewBox = _node$props.viewBox,
        _node$props$preserveA = _node$props.preserveAspectRatio,
        preserveAspectRatio = _node$props$preserveA === void 0 ? {} : _node$props$preserveA;
    var _preserveAspectRatio$ = preserveAspectRatio.meetOrSlice,
        meetOrSlice = _preserveAspectRatio$ === void 0 ? 'meet' : _preserveAspectRatio$,
        _preserveAspectRatio$2 = preserveAspectRatio.align,
        align = _preserveAspectRatio$2 === void 0 ? 'xMidYMid' : _preserveAspectRatio$2;
    if (viewBox == null || width == null || height == null) return node;
    var x = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.minX) || 0;
    var y = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.minY) || 0;
    var logicalWidth = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.maxX) || width;
    var logicalHeight = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.maxY) || height;
    var logicalRatio = logicalWidth / logicalHeight;
    var physicalRatio = width / height;
    var scaleX = width / logicalWidth;
    var scaleY = height / logicalHeight;

    if (align === 'none') {
      ctx.scale(scaleX, scaleY);
      ctx.translate(-x, -y);
      return node;
    }

    if (logicalRatio < physicalRatio && meetOrSlice === 'meet' || logicalRatio >= physicalRatio && meetOrSlice === 'slice') {
      ctx.scale(scaleY, scaleY);

      switch (align) {
        case 'xMinYMin':
        case 'xMinYMid':
        case 'xMinYMax':
          ctx.translate(-x, -y);
          break;

        case 'xMidYMin':
        case 'xMidYMid':
        case 'xMidYMax':
          ctx.translate(-x - (logicalWidth - width * logicalHeight / height) / 2, -y);
          break;

        default:
          ctx.translate(-x - (logicalWidth - width * logicalHeight / height), -y);
      }
    } else {
      ctx.scale(scaleX, scaleX);

      switch (align) {
        case 'xMinYMin':
        case 'xMidYMin':
        case 'xMaxYMin':
          ctx.translate(-x, -y);
          break;

        case 'xMinYMid':
        case 'xMidYMid':
        case 'xMaxYMid':
          ctx.translate(-x, -y - (logicalHeight - height * logicalWidth / width) / 2);
          break;

        default:
          ctx.translate(-x, -y - (logicalHeight - height * logicalWidth / width));
      }
    }

    return node;
  };
};

var moveToOrigin = function moveToOrigin(ctx) {
  return function (node) {
    var _node$box2 = node.box,
        top = _node$box2.top,
        left = _node$box2.left;
    var paddingLeft = defaultsZero('paddingLeft', node.box);
    var paddingTop = defaultsZero('paddingTop', node.box);
    ctx.translate(left + paddingLeft, top + paddingTop);
    return node;
  };
};

var renderSvg = function renderSvg(ctx, node) {
  R.compose((0, _restore.default)(ctx), drawChildren(ctx), resolveAspectRatio(ctx), moveToOrigin(ctx), (0, _clipNode.default)(ctx), (0, _save.default)(ctx))(node);
  return node;
};

var _default = R.curryN(2, renderSvg);

exports.default = _default;