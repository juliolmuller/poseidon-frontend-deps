"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.resolvePageDimensions = exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yoga = _interopRequireDefault(require("@react-pdf/yoga"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _getMargin = _interopRequireDefault(require("../node/getMargin"));

var _getPadding = _interopRequireDefault(require("../node/getPadding"));

var _getPosition = _interopRequireDefault(require("../node/getPosition"));

var _getDimension = _interopRequireDefault(require("../node/getDimension"));

var _getBorderWidth = _interopRequireDefault(require("../node/getBorderWidth"));

var _setDisplay = _interopRequireDefault(require("../node/setDisplay"));

var _setOverflow = _interopRequireDefault(require("../node/setOverflow"));

var _setFlexWrap = _interopRequireDefault(require("../node/setFlexWrap"));

var _setFlexGrow = _interopRequireDefault(require("../node/setFlexGrow"));

var _setFlexBasis = _interopRequireDefault(require("../node/setFlexBasis"));

var _setAlignSelf = _interopRequireDefault(require("../node/setAlignSelf"));

var _setAlignItems = _interopRequireDefault(require("../node/setAlignItems"));

var _setFlexShrink = _interopRequireDefault(require("../node/setFlexShrink"));

var _setAspectRatio = _interopRequireDefault(require("../node/setAspectRatio"));

var _setAlignContent = _interopRequireDefault(require("../node/setAlignContent"));

var _setPositionType = _interopRequireDefault(require("../node/setPositionType"));

var _setFlexDirection = _interopRequireDefault(require("../node/setFlexDirection"));

var _setJustifyContent = _interopRequireDefault(require("../node/setJustifyContent"));

var _setMargin = require("../node/setMargin");

var _setPadding = require("../node/setPadding");

var _setBorderWidth = require("../node/setBorderWidth");

var _setPosition = require("../node/setPosition");

var _setDimension = require("../node/setDimension");

var _measureSvg = _interopRequireDefault(require("../svg/measureSvg"));

var _measureText = _interopRequireDefault(require("../text/measureText"));

var _measureImage = _interopRequireDefault(require("../image/measureImage"));

var _measureCanvas = _interopRequireDefault(require("../canvas/measureCanvas"));

var YOGA_NODE = '_yogaNode';

var YOGA_CONFIG = _yoga.default.Config.create();

YOGA_CONFIG.setPointScaleFactor(0);
var isType = R.propEq('type');
var isSvg = isType(P.Svg);
var isText = isType(P.Text);
var isNote = isType(P.Note);
var isPage = isType(P.Page);
var isImage = isType(P.Image);
var isCanvas = isType(P.Canvas);
var isTextInstance = isType(P.TextInstance);

var setNodeHeight = function setNodeHeight(node) {
  var value = isPage(node) ? node.box.height : node.style.height;
  return (0, _setDimension.setHeight)(value);
};
/**
 * Set styles valeus into yoga node before layout calculation
 *
 * @param {Object} node
 * @returns {Object} node
 */


var setYogaValues = R.tap(function (node) {
  R.compose(setNodeHeight(node), (0, _setDimension.setWidth)(node.style.width), (0, _setDimension.setMinWidth)(node.style.minWidth), (0, _setDimension.setMaxWidth)(node.style.maxWidth), (0, _setDimension.setMinHeight)(node.style.minHeight), (0, _setDimension.setMaxHeight)(node.style.maxHeight), (0, _setMargin.setMarginTop)(node.style.marginTop), (0, _setMargin.setMarginRight)(node.style.marginRight), (0, _setMargin.setMarginBottom)(node.style.marginBottom), (0, _setMargin.setMarginLeft)(node.style.marginLeft), (0, _setPadding.setPaddingTop)(node.style.paddingTop), (0, _setPadding.setPaddingRight)(node.style.paddingRight), (0, _setPadding.setPaddingBottom)(node.style.paddingBottom), (0, _setPadding.setPaddingLeft)(node.style.paddingLeft), (0, _setPositionType.default)(node.style.position), (0, _setPosition.setPositionTop)(node.style.top), (0, _setPosition.setPositionRight)(node.style.right), (0, _setPosition.setPositionBottom)(node.style.bottom), (0, _setPosition.setPositionLeft)(node.style.left), (0, _setBorderWidth.setBorderTop)(node.style.borderTopWidth), (0, _setBorderWidth.setBorderRight)(node.style.borderRightWidth), (0, _setBorderWidth.setBorderBottom)(node.style.borderBottomWidth), (0, _setBorderWidth.setBorderLeft)(node.style.borderLeftWidth), (0, _setDisplay.default)(node.style.display), (0, _setFlexDirection.default)(node.style.flexDirection), (0, _setAlignSelf.default)(node.style.alignSelf), (0, _setAlignContent.default)(node.style.alignContent), (0, _setAlignItems.default)(node.style.alignItems), (0, _setJustifyContent.default)(node.style.justifyContent), (0, _setFlexWrap.default)(node.style.flexWrap), (0, _setOverflow.default)(node.style.overflow), (0, _setAspectRatio.default)(node.style.aspectRatio), (0, _setFlexBasis.default)(node.style.flexBasis), (0, _setFlexGrow.default)(node.style.flexGrow), (0, _setFlexShrink.default)(node.style.flexShrink))(node);
});
/**
 * Inserts child into parent' yoga node
 *
 * @param {Object} parent
 * @param {Object} node
 * @param {Object} node
 */

var insertYogaNodes = function insertYogaNodes(parent) {
  return R.tap(function (child) {
    return parent.insertChild(child[YOGA_NODE], parent.getChildCount());
  });
};

var setMeasureFunc = function setMeasureFunc(page, fontStore) {
  return function (node) {
    var yogaNode = node[YOGA_NODE];

    if (isText(node)) {
      yogaNode.setMeasureFunc((0, _measureText.default)(page, node, fontStore));
    }

    if (isImage(node)) {
      yogaNode.setMeasureFunc((0, _measureImage.default)(page, node));
    }

    if (isCanvas(node)) {
      yogaNode.setMeasureFunc((0, _measureCanvas.default)(page, node));
    }

    if (isSvg(node)) {
      yogaNode.setMeasureFunc((0, _measureSvg.default)(page, node));
    }

    return node;
  };
};

var isNotText = R.complement(isText);
var isNotNote = R.complement(isNote);
var isNotSvg = R.complement(isSvg);
var isNotTextInstance = R.complement(isTextInstance);
var isLayoutElement = R.allPass([isNotText, isNotNote, isNotSvg]);
/**
 * Creates and add yoga node to document tree
 * Handles measure function for text and image nodes
 *
 * @param {Object} node
 * @returns {Object} node with appended yoga node
 */

var createYogaNodes = function createYogaNodes(page, fontStore) {
  return function (node) {
    var yogaNode = _yoga.default.Node.createWithConfig(YOGA_CONFIG);

    return R.compose(setMeasureFunc(page, fontStore), R.when(isLayoutElement, R.evolve({
      children: R.map(R.compose(insertYogaNodes(yogaNode), createYogaNodes(page, fontStore)))
    })), setYogaValues, R.assoc(YOGA_NODE, yogaNode))(node);
  };
};
/**
 * Performs yoga calculation
 *
 * @param {Object} node
 * @returns {Object} node
 */


var calculateLayout = function calculateLayout(page) {
  page[YOGA_NODE].calculateLayout();
  return page;
};
/**
 * Saves Yoga layout result into 'box' attribute of node
 *
 * @param {Object} node
 * @returns {Object} node with box data
 */


var persistDimensions = function persistDimensions(node) {
  return R.evolve({
    children: R.map(R.when(isNotTextInstance, persistDimensions)),
    box: R.always(R.mergeAll([(0, _getPadding.default)(node), (0, _getMargin.default)(node), (0, _getBorderWidth.default)(node), (0, _getPosition.default)(node), (0, _getDimension.default)(node)]))
  })(node);
};
/**
 * Removes yoga node from document tree
 *
 * @param {Object} node
 * @returns {Object} node without yoga node
 */


var destroyYogaNodes = function destroyYogaNodes(node) {
  return R.compose(R.dissoc(YOGA_NODE), R.evolve({
    children: R.map(destroyYogaNodes)
  }))(node);
};
/**
 * Free yoga node from document tree
 *
 * @param {Object} node
 * @returns {Object} node without yoga node
 */


var freeYogaNodes = function freeYogaNodes(node) {
  if (node[YOGA_NODE]) node[YOGA_NODE].freeRecursive();
  return node;
};
/**
 * Calculates page object layout using Yoga.
 * Takes node values from 'box' and 'style' attributes, and persist them back into 'box'
 * Destroy yoga values at the end.
 *
 * @param {Object} page object
 * @returns {Object} page object with correct 'box' layout attributes
 */


var resolvePageDimensions = function resolvePageDimensions(page, fontStore) {
  return R.ifElse(R.isNil, R.always(null), R.compose(destroyYogaNodes, freeYogaNodes, persistDimensions, calculateLayout, createYogaNodes(page, fontStore)))(page);
};
/**
 * Calculates root object layout using Yoga.
 *
 * @param {Object} root object
 * @returns {Object} root object with correct 'box' layout attributes
 */


exports.resolvePageDimensions = resolvePageDimensions;

var resolveDimensions = function resolveDimensions(node, fontStore) {
  var mapChild = function mapChild(child) {
    return resolvePageDimensions(child, fontStore);
  };

  return R.evolve({
    children: R.map(mapChild)
  })(node);
};

var _default = resolveDimensions;
exports.default = _default;