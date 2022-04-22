"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var isType = R.propEq('type');
var isLink = isType(P.Link);
var isText = isType(P.Text);
var isTextInstance = isType(P.TextInstance);
/**
 * Checks if node has render prop
 *
 * @param {Object} node
 * @returns {Boolean} has render prop?
 */

var hasRenderProp = R.hasPath(['props', 'render']);
/**
 * Checks if node is text type (Text or TextInstance)
 *
 * @param {Object} node
 * @returns {Boolean} are all children text instances?
 */

var isTextType = R.either(isText, isTextInstance);
/**
 * Checks if is tet link that needs to be wrapped in Text
 *
 * @param {Object} node
 * @returns {Boolean} are all children text instances?
 */

var isTextLink = function isTextLink(node) {
  var children = node.children || []; // Text string inside a Link

  if (children.every(isTextInstance)) return true; // Text node inside a Link

  if (children.every(isText)) return false;
  return children.every(isTextType);
};
/**
 * Wraps node children inside Text node
 *
 * @param {Object} node
 * @returns {Boolean} node with intermediate Text child
 */


var wrapText = function wrapText(node) {
  var textElement = {
    type: P.Text,
    props: {},
    style: {},
    box: {},
    children: node.children
  };
  return R.assoc('children', [textElement], node);
};

var transformLink = function transformLink(node) {
  if (!isLink(node)) return node; // If has render prop substitute the instance by a Text, that will
  // ultimately render the inline Link via the textkit PDF renderer.

  if (hasRenderProp(node)) return R.assoc('type', P.Text, node); // If is a text link (either contains Text or TextInstalce), wrap it
  // inside a Text element so styles are applied correctly

  if (isTextLink(node)) return wrapText(node);
  return node;
};
/**
 * Transforms Link layout to correctly render text and dynamic rendered links
 *
 * @param {Object} node
 * @returns {Object} node with link substitution
 */


var resolveLinkSubstitution = function resolveLinkSubstitution(node) {
  var resolveChild = R.compose(transformLink, resolveLinkSubstitution);
  return R.evolve({
    children: R.map(resolveChild)
  })(node);
};

var _default = resolveLinkSubstitution;
exports.default = _default;