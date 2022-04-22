"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _layout = _interopRequireDefault(require("./layout"));

var _linebreaker = _interopRequireDefault(require("./engines/linebreaker"));

var _justification = _interopRequireDefault(require("./engines/justification"));

var _textDecoration = _interopRequireDefault(require("./engines/textDecoration"));

var _scriptItemizer = _interopRequireDefault(require("./engines/scriptItemizer"));

var _wordHyphenation = _interopRequireDefault(require("./engines/wordHyphenation"));

var _fontSubstitution = _interopRequireDefault(require("./engines/fontSubstitution"));

var engines = {
  linebreaker: _linebreaker.default,
  justification: _justification.default,
  textDecoration: _textDecoration.default,
  scriptItemizer: _scriptItemizer.default,
  wordHyphenation: _wordHyphenation.default,
  fontSubstitution: _fontSubstitution.default
};
var engine = (0, _layout.default)(engines);
var _default = engine;
exports.default = _default;