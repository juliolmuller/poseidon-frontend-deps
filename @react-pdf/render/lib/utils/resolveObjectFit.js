"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _matchPercent = _interopRequireDefault(require("./matchPercent"));

var isNumeric = function isNumeric(n) {
  return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
};

var applyContainObjectFit = function applyContainObjectFit(cw, ch, iw, ih, px, py) {
  var cr = cw / ch;
  var ir = iw / ih;
  var pxp = (0, _matchPercent.default)(px);
  var pyp = (0, _matchPercent.default)(py);
  var pxv = pxp ? pxp.percent : 0.5;
  var pyv = pyp ? pyp.percent : 0.5;

  if (cr > ir) {
    var _height = ch;

    var _width = _height * ir;

    var _yOffset = isNumeric(py) ? py : 0;

    var _xOffset = isNumeric(px) ? px : (cw - _width) * pxv;

    return {
      width: _width,
      height: _height,
      xOffset: _xOffset,
      yOffset: _yOffset
    };
  }

  var width = cw;
  var height = width / ir;
  var xOffset = isNumeric(px) ? px : 0;
  var yOffset = isNumeric(py) ? py : (ch - height) * pyv;
  return {
    width: width,
    height: height,
    yOffset: yOffset,
    xOffset: xOffset
  };
};

var applyNoneObjectFit = function applyNoneObjectFit(cw, ch, iw, ih, px, py) {
  var width = iw;
  var height = ih;
  var pxp = (0, _matchPercent.default)(px);
  var pyp = (0, _matchPercent.default)(py);
  var pxv = pxp ? pxp.percent : 0.5;
  var pyv = pyp ? pyp.percent : 0.5;
  var xOffset = isNumeric(px) ? px : (cw - width) * pxv;
  var yOffset = isNumeric(py) ? py : (ch - height) * pyv;
  return {
    width: width,
    height: height,
    xOffset: xOffset,
    yOffset: yOffset
  };
};

var applyCoverObjectFit = function applyCoverObjectFit(cw, ch, iw, ih, px, py) {
  var ir = iw / ih;
  var cr = cw / ch;
  var pxp = (0, _matchPercent.default)(px);
  var pyp = (0, _matchPercent.default)(py);
  var pxv = pxp ? pxp.percent : 0.5;
  var pyv = pyp ? pyp.percent : 0.5;

  if (cr > ir) {
    var _width2 = cw;

    var _height2 = _width2 / ir;

    var _xOffset2 = isNumeric(px) ? px : 0;

    var _yOffset2 = isNumeric(py) ? py : (ch - _height2) * pyv;

    return {
      width: _width2,
      height: _height2,
      yOffset: _yOffset2,
      xOffset: _xOffset2
    };
  }

  var height = ch;
  var width = height * ir;
  var xOffset = isNumeric(px) ? px : (cw - width) * pxv;
  var yOffset = isNumeric(py) ? py : 0;
  return {
    width: width,
    height: height,
    xOffset: xOffset,
    yOffset: yOffset
  };
};

var applyScaleDownObjectFit = function applyScaleDownObjectFit(cw, ch, iw, ih, px, py) {
  var containDimension = applyContainObjectFit(cw, ch, iw, ih, px, py);
  var noneDimension = applyNoneObjectFit(cw, ch, iw, ih, px, py);
  return containDimension.width < noneDimension.width ? containDimension : noneDimension;
};

var applyFillObjectFit = function applyFillObjectFit(cw, ch, px, py) {
  return {
    width: cw,
    height: ch,
    xOffset: (0, _matchPercent.default)(px) ? 0 : px || 0,
    yOffset: (0, _matchPercent.default)(py) ? 0 : py || 0
  };
};

var resolveObjectFit = function resolveObjectFit(type, cw, ch, iw, ih, px, py) {
  if (type === void 0) {
    type = 'fill';
  }

  switch (type) {
    case 'contain':
      return applyContainObjectFit(cw, ch, iw, ih, px, py);

    case 'cover':
      return applyCoverObjectFit(cw, ch, iw, ih, px, py);

    case 'none':
      return applyNoneObjectFit(cw, ch, iw, ih, px, py);

    case 'scale-down':
      return applyScaleDownObjectFit(cw, ch, iw, ih, px, py);

    default:
      return applyFillObjectFit(cw, ch, px, py);
  }
};

var _default = resolveObjectFit;
exports.default = _default;