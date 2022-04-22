"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _advanceWidth = _interopRequireDefault(require("@react-pdf/textkit/lib/run/advanceWidth"));

var _advanceWidth2 = _interopRequireDefault(require("@react-pdf/textkit/lib/attributedString/advanceWidth"));

var _renderGlyphs = _interopRequireDefault(require("./renderGlyphs"));

var renderRun = function renderRun(ctx, run) {
  var runAdvanceWidth = (0, _advanceWidth.default)(run);
  var _run$attributes = run.attributes,
      font = _run$attributes.font,
      fontSize = _run$attributes.fontSize,
      color = _run$attributes.color,
      opacity = _run$attributes.opacity;
  ctx.fillColor(color);
  ctx.fillOpacity(opacity);

  if (font.sbix || font.COLR && font.CPAL) {
    ctx.save();
    ctx.translate(0, -run.ascent);

    for (var i = 0; i < run.glyphs.length; i += 1) {
      var position = run.positions[i];
      var glyph = run.glyphs[i];
      ctx.save();
      ctx.translate(position.xOffset, position.yOffset);
      glyph.render(ctx, fontSize);
      ctx.restore();
      ctx.translate(position.xAdvance, position.yAdvance);
    }

    ctx.restore();
  } else {
    ctx.font(typeof font.name === 'string' ? font.name : font, fontSize);

    try {
      (0, _renderGlyphs.default)(ctx, run.glyphs, run.positions, 0, 0);
    } catch (error) {
      console.log(error);
    }
  }

  ctx.translate(runAdvanceWidth, 0);
};

var renderSpan = function renderSpan(ctx, line, textAnchor, dominantBaseline) {
  ctx.save();
  var x = R.pathOr(0, ['box', 'x'], line);
  var y = R.pathOr(0, ['box', 'y'], line);
  var font = R.pathOr(1, ['runs', 0, 'attributes', 'font'], line);
  var scale = R.pathOr(1, ['runs', 0, 'attributes', 'scale'], line);
  var width = (0, _advanceWidth2.default)(line);
  var ascent = font.ascent * scale;
  var xHeight = font.xHeight * scale;
  var descent = font.descent * scale;
  var capHeight = font.capHeight * scale;
  var xTranslate = x;
  var yTranslate = y;

  switch (textAnchor) {
    case 'middle':
      xTranslate = x - width / 2;
      break;

    case 'end':
      xTranslate = x - width;
      break;

    default:
      xTranslate = x;
      break;
  }

  switch (dominantBaseline) {
    case 'middle':
    case 'central':
      yTranslate = y + capHeight / 2;
      break;

    case 'hanging':
      yTranslate = y + capHeight;
      break;

    case 'mathematical':
      yTranslate = y + xHeight;
      break;

    case 'text-after-edge':
      yTranslate = y + descent;
      break;

    case 'text-before-edge':
      yTranslate = y + ascent;
      break;

    default:
      yTranslate = y;
      break;
  }

  ctx.translate(xTranslate, yTranslate);
  line.runs.forEach(function (run) {
    return renderRun(ctx, run);
  });
  ctx.restore();
};

var renderSvgText = function renderSvgText(ctx) {
  return function (node) {
    node.children.forEach(function (span) {
      return renderSpan(ctx, span.lines[0], span.props.textAnchor, span.props.dominantBaseline);
    });
    return node;
  };
};

var _default = renderSvgText;
exports.default = _default;