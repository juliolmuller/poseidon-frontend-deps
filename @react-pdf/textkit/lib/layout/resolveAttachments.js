"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var ATTACHMENT_CODE = 0xfffc; // 65532

var mapIndexed = R.addIndex(R.map);
var getGlyphs = R.propOr([], 'glyphs');
var getAttachment = R.pathOr({}, ['attributes', 'attachment']);
var isReplaceGlyph = R.o(R.includes(ATTACHMENT_CODE), R.propOr([], 'codePoints'));
/**
 * Resolve attachments of run
 *
 * @param  {Object}  run
 * @return {Object} run
 */

var resolveRunAttachments = function resolveRunAttachments(run) {
  var glyphs = getGlyphs(run);
  var attachment = getAttachment(run);
  var attachmentWidth = R.always(attachment.width);
  return R.evolve({
    positions: mapIndexed(function (position, i) {
      var glyph = glyphs[i];

      if (attachment && attachment.width && isReplaceGlyph(glyph)) {
        return R.evolve({
          xAdvance: attachmentWidth
        }, position);
      }

      return R.clone(position);
    })
  })(run);
};
/**
 * Resolve attachments for multiple paragraphs
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Array}  attributed strings (paragraphs)
 * @return {Array} attributed strings (paragraphs)
 */


var resolveAttachments = function resolveAttachments() {
  return R.evolve({
    runs: R.map(resolveRunAttachments)
  });
};

var _default = resolveAttachments;
exports.default = _default;