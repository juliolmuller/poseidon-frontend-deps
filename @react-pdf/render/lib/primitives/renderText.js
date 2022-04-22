"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _height = _interopRequireDefault(require("@react-pdf/textkit/lib/run/height"));

var _descent = _interopRequireDefault(require("@react-pdf/textkit/lib/run/descent"));

var _advanceWidth = _interopRequireDefault(require("@react-pdf/textkit/lib/run/advanceWidth"));

var _ascent = _interopRequireDefault(require("@react-pdf/textkit/lib/attributedString/ascent"));

var _renderGlyphs = _interopRequireDefault(require("./renderGlyphs"));

var _parseColor = _interopRequireDefault(require("../utils/parseColor"));

/* eslint-disable no-param-reassign */
var DEST_REGEXP = /^#.+/;

var isSrcId = function isSrcId(src) {
  return src.match(DEST_REGEXP);
};

var renderAttachment = function renderAttachment(ctx, attachment) {
  var _attachment$xOffset = attachment.xOffset,
      xOffset = _attachment$xOffset === void 0 ? 0 : _attachment$xOffset,
      _attachment$yOffset = attachment.yOffset,
      yOffset = _attachment$yOffset === void 0 ? 0 : _attachment$yOffset,
      width = attachment.width,
      height = attachment.height,
      image = attachment.image;
  ctx.translate(-width + xOffset, -height + yOffset);
  ctx.image(image, 0, 0, {
    fit: [width, height],
    align: 'center',
    valign: 'bottom'
  });
};

var renderAttachments = function renderAttachments(ctx, run) {
  ctx.save();
  var font = run.attributes.font;
  var space = font.glyphForCodePoint(0x20);
  var objectReplacement = font.glyphForCodePoint(0xfffc);
  var attachmentAdvance = 0;

  for (var i = 0; i < run.glyphs.length; i += 1) {
    var position = run.positions[i];
    var glyph = run.glyphs[i];
    attachmentAdvance += position.xAdvance || 0;

    if (glyph.id === objectReplacement.id && run.attributes.attachment) {
      ctx.translate(attachmentAdvance, position.yOffset || 0);
      renderAttachment(ctx, run.attributes.attachment);
      run.glyphs[i] = space;
      attachmentAdvance = 0;
    }
  }

  ctx.restore();
};

var renderRun = function renderRun(ctx, run, options) {
  var _run$attributes = run.attributes,
      font = _run$attributes.font,
      fontSize = _run$attributes.fontSize,
      link = _run$attributes.link;
  var color = (0, _parseColor.default)(run.attributes.color);
  var opacity = R.defaultTo(color.opacity, run.attributes.opacity);
  var height = (0, _height.default)(run);
  var descent = (0, _descent.default)(run);
  var runAdvanceWidth = (0, _advanceWidth.default)(run);

  if (options.outlineRuns) {
    ctx.rect(0, -height, runAdvanceWidth, height).stroke();
  }

  ctx.fillColor(color.value);
  ctx.fillOpacity(opacity);

  if (link) {
    if (isSrcId(link)) {
      ctx.goTo(0, -height - descent, runAdvanceWidth, height, link.slice(1));
    } else {
      ctx.link(0, -height - descent, runAdvanceWidth, height, link);
    }
  }

  renderAttachments(ctx, run);

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

var renderBackground = function renderBackground(ctx, rect, backgroundColor) {
  var color = (0, _parseColor.default)(backgroundColor);
  ctx.save();
  ctx.fillOpacity(color.opacity);
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.fill(color.value);
  ctx.restore();
};

var renderDecorationLine = function renderDecorationLine(ctx, line) {
  ctx.save();
  ctx.lineWidth(line.rect.height);
  ctx.strokeOpacity(line.opacity);

  if (/dashed/.test(line.style)) {
    ctx.dash(3 * line.rect.height);
  } else if (/dotted/.test(line.style)) {
    ctx.dash(line.rect.height);
  }

  if (/wavy/.test(line.style)) {
    var dist = Math.max(2, line.rect.height);
    var step = 1.1 * dist;
    var stepCount = Math.floor(line.rect.width / (2 * step)); // Adjust step to fill entire width

    var remainingWidth = line.rect.width - stepCount * 2 * step;
    var adjustment = remainingWidth / stepCount / 2;
    step += adjustment;
    var cp1y = line.rect.y + dist;
    var cp2y = line.rect.y - dist;
    var x = line.rect.x;
    ctx.moveTo(line.rect.x, line.rect.y);

    for (var i = 0; i < stepCount; i += 1) {
      ctx.bezierCurveTo(x + step, cp1y, x + step, cp2y, x + 2 * step, line.rect.y);
      x += 2 * step;
    }
  } else {
    ctx.moveTo(line.rect.x, line.rect.y);
    ctx.lineTo(line.rect.x + line.rect.width, line.rect.y);

    if (/double/.test(line.style)) {
      ctx.moveTo(line.rect.x, line.rect.y + line.rect.height * 2);
      ctx.lineTo(line.rect.x + line.rect.width, line.rect.y + line.rect.height * 2);
    }
  }

  ctx.stroke(line.color);
  ctx.restore();
};

var renderLine = function renderLine(ctx, line, options) {
  var lineAscent = (0, _ascent.default)(line);

  if (options.outlineLines) {
    ctx.rect(line.box.x, line.box.y, line.box.width, line.box.height).stroke();
  }

  ctx.save();
  ctx.translate(line.box.x, line.box.y + lineAscent);

  for (var i = 0; i < line.runs.length; i += 1) {
    var run = line.runs[i];
    var isLastRun = i === line.runs.length - 1;

    if (run.attributes.backgroundColor) {
      var overflowRight = isLastRun ? line.overflowRight : 0;
      var backgroundRect = {
        x: 0,
        y: -lineAscent,
        height: line.box.height,
        width: (0, _advanceWidth.default)(run) - overflowRight
      };
      renderBackground(ctx, backgroundRect, run.attributes.backgroundColor);
    }

    renderRun(ctx, run, options);
  }

  ctx.restore();
  ctx.save();
  ctx.translate(line.box.x, line.box.y);

  for (var _i = 0; _i < line.decorationLines.length; _i += 1) {
    var decorationLine = line.decorationLines[_i];
    renderDecorationLine(ctx, decorationLine);
  }

  ctx.restore();
};

var renderBlock = function renderBlock(ctx, block, options) {
  block.forEach(function (line) {
    renderLine(ctx, line, options);
  });
};

var renderText = function renderText(ctx, node) {
  var _node$box = node.box,
      top = _node$box.top,
      left = _node$box.left;
  var blocks = [node.lines];
  var paddingTop = R.pathOr(0, ['box', 'paddingTop'], node);
  var paddingLeft = R.pathOr(0, ['box', 'paddingLeft'], node);
  var initialY = node.lines[0] ? node.lines[0].box.y : 0;
  var offsetX = node.alignOffset || 0;
  ctx.save();
  ctx.translate(left + paddingLeft - offsetX, top + paddingTop - initialY);
  blocks.forEach(function (block) {
    renderBlock(ctx, block, {});
  });
  ctx.restore();
  return node;
};

var _default = R.curryN(2, renderText);

exports.default = _default;