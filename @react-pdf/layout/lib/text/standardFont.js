"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _pdfkit = require("@react-pdf/pdfkit");

/* eslint-disable class-methods-use-this */
var StandardFont = /*#__PURE__*/function () {
  function StandardFont(src) {
    this.name = src;
    this.src = _pdfkit.PDFFont.open(null, src);
  }

  var _proto = StandardFont.prototype;

  _proto.encode = function encode(str) {
    return this.src.encode(str);
  };

  _proto.layout = function layout(str) {
    var _this = this;

    var _this$encode = this.encode(str),
        encoded = _this$encode[0],
        positions = _this$encode[1];

    return {
      positions: positions,
      stringIndices: positions.map(function (_, i) {
        return i;
      }),
      glyphs: encoded.map(function (g, i) {
        var glyph = _this.getGlyph(parseInt(g, 16));

        glyph.advanceWidth = positions[i].advanceWidth;
        return glyph;
      })
    };
  };

  _proto.glyphForCodePoint = function glyphForCodePoint(codePoint) {
    var glyph = this.getGlyph(codePoint);
    glyph.advanceWidth = 400;
    return glyph;
  };

  _proto.getGlyph = function getGlyph(id) {
    return {
      id: id,
      _font: this.src,
      codePoints: [id],
      isLigature: false,
      name: this.src.font.characterToGlyph(id)
    };
  };

  _proto.hasGlyphForCodePoint = function hasGlyphForCodePoint(codePoint) {
    return this.src.font.characterToGlyph(codePoint) !== '.notdef';
  } // Based on empirical observation
  ;

  (0, _createClass2.default)(StandardFont, [{
    key: "ascent",
    get: function get() {
      return 900;
    } // Based on empirical observation

  }, {
    key: "capHeight",
    get: function get() {
      switch (this.name) {
        case 'Times-Roman':
        case 'Times-Bold':
        case 'Times-Italic':
          return 650;

        case 'Courier':
        case 'Courier-Bold':
        case 'Courier-Oblique':
          return 550;

        default:
          return 690;
      }
    } // Based on empirical observation

  }, {
    key: "xHeight",
    get: function get() {
      switch (this.name) {
        case 'Times-Roman':
        case 'Times-Bold':
        case 'Times-Italic':
          return 440;

        case 'Courier':
        case 'Courier-Bold':
        case 'Courier-Oblique':
          return 390;

        default:
          return 490;
      }
    } // Based on empirical observation

  }, {
    key: "descent",
    get: function get() {
      switch (this.name) {
        case 'Times-Roman':
        case 'Times-Bold':
        case 'Times-Italic':
          return -220;

        case 'Courier':
        case 'Courier-Bold':
        case 'Courier-Oblique':
          return -230;

        default:
          return -200;
      }
    }
  }, {
    key: "lineGap",
    get: function get() {
      return 0;
    }
  }, {
    key: "unitsPerEm",
    get: function get() {
      return 1000;
    }
  }]);
  return StandardFont;
}();

var _default = StandardFont;
exports.default = _default;