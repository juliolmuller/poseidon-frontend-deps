"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _isFixed = _interopRequireDefault(require("../node/isFixed"));

var _splitText = _interopRequireDefault(require("../text/splitText"));

var _splitNode2 = _interopRequireDefault(require("../node/splitNode"));

var _getWrap = _interopRequireDefault(require("../node/getWrap"));

var _getWrapArea = _interopRequireDefault(require("../page/getWrapArea"));

var _getContentArea = _interopRequireDefault(require("../page/getContentArea"));

var _createInstance = _interopRequireDefault(require("../node/createInstance"));

var _shouldBreak = _interopRequireDefault(require("../node/shouldBreak"));

var _resolveTextLayout = _interopRequireDefault(require("./resolveTextLayout"));

var _resolveInheritance = _interopRequireDefault(require("./resolveInheritance"));

var _resolveDimensions = require("./resolveDimensions");

/* eslint-disable no-continue */

/* eslint-disable prefer-destructuring */
var isText = R.propEq('type', P.Text); // Prevent splitting elements by low decimal numbers

var SAFTY_THRESHOLD = 0.001;
var assingChildren = R.assoc('children');
var getTop = R.pathOr(0, ['box', 'top']);
var getHeight = R.path(['box', 'height']);
var getChildren = R.propOr([], 'children');
var isElementOutside = R.useWith(R.lte, [R.identity, getTop]);
var allFixed = R.all(_isFixed.default);
var isDynamic = R.hasPath(['props', 'render']);

var compose = function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (value) {
    var result = value;
    var reversedFns = R.reverse(fns);

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    for (var i = 0; i < reversedFns.length; i += 1) {
      var fn = reversedFns[i];
      result = fn.apply(void 0, [result].concat(args));
    }

    return result;
  };
};

var relayoutPage = compose(_resolveTextLayout.default, _resolveInheritance.default, _resolveDimensions.resolvePageDimensions);

var warnUnavailableSpace = function warnUnavailableSpace(node) {
  console.warn("Node of type " + node.type + " can't wrap between pages and it's bigger than available page height");
};

var splitNodes = function splitNodes(height, contentArea, nodes) {
  var currentChildren = [];
  var nextChildren = [];

  for (var i = 0; i < nodes.length; i += 1) {
    var child = nodes[i];
    var futureNodes = nodes.slice(i + 1);
    var futureFixedNodes = R.filter(_isFixed.default, futureNodes);
    var nodeTop = getTop(child);
    var nodeHeight = getHeight(child);
    var isOutside = isElementOutside(height, child);
    var shouldBreak = (0, _shouldBreak.default)(child, futureNodes, height);
    var shouldSplit = height + SAFTY_THRESHOLD < nodeTop + nodeHeight;
    var canWrap = (0, _getWrap.default)(child);
    var fitsInsidePage = nodeHeight <= contentArea;

    if ((0, _isFixed.default)(child)) {
      nextChildren.push(child);
      currentChildren.push(child);
      continue;
    }

    if (isOutside) {
      var next = R.evolve({
        box: {
          top: R.subtract(R.__, height)
        }
      })(child);
      nextChildren.push(next);
      continue;
    }

    if (!fitsInsidePage && !canWrap) {
      currentChildren.push(child);
      nextChildren.push.apply(nextChildren, futureNodes);
      warnUnavailableSpace(child);
      break;
    }

    if (shouldBreak) {
      var _next = R.evolve({
        box: {
          top: R.subtract(R.__, height)
        },
        props: R.evolve({
          wrap: R.always(true),
          break: R.always(false)
        })
      })(child);

      currentChildren.push.apply(currentChildren, futureFixedNodes);
      nextChildren.push.apply(nextChildren, [_next].concat(futureNodes));
      break;
    }

    if (shouldSplit) {
      var _split = split(child, height, contentArea),
          currentChild = _split[0],
          nextChild = _split[1];

      if (currentChild) currentChildren.push(currentChild);
      if (nextChild) nextChildren.push(nextChild);
      continue;
    }

    currentChildren.push(child);
  }

  return [currentChildren, nextChildren];
};

var splitChildren = function splitChildren(height, contentArea, node) {
  var children = getChildren(node);
  var availableHeight = height - getTop(node);
  return splitNodes(availableHeight, contentArea, children);
};

var splitView = function splitView(node, height, contentArea) {
  var _splitNode = (0, _splitNode2.default)(node, height),
      currentNode = _splitNode[0],
      nextNode = _splitNode[1];

  var _splitChildren = splitChildren(height, contentArea, node),
      currentChilds = _splitChildren[0],
      nextChildren = _splitChildren[1];

  return [assingChildren(currentChilds)(currentNode), assingChildren(nextChildren)(nextNode)];
};

var split = R.ifElse(isText, _splitText.default, splitView);

var shouldResolveDynamicNodes = function shouldResolveDynamicNodes(node) {
  var children = node.children || [];
  return isDynamic(node) || children.some(shouldResolveDynamicNodes);
};

var resolveDynamicNodes = function resolveDynamicNodes(props, node) {
  var isNodeDynamic = isDynamic(node); // Call render prop on dynamic nodes and append result to children

  var resolveChildren = function resolveChildren(children) {
    if (children === void 0) {
      children = [];
    }

    if (isNodeDynamic) {
      var res = node.props.render(props);
      return [(0, _createInstance.default)(res)].filter(Boolean);
    }

    return children.map(function (c) {
      return resolveDynamicNodes(props, c);
    });
  }; // We reset dynamic text box so it can be computed again later on


  var resolveBox = function resolveBox(box) {
    return isNodeDynamic && isText(node) ? (0, _extends2.default)({}, box, {
      height: 0
    }) : box;
  };

  return R.evolve({
    box: resolveBox,
    children: resolveChildren,
    lines: function lines(prev) {
      return isNodeDynamic ? null : prev;
    }
  }, node);
};

var resolveDynamicPage = function resolveDynamicPage(props, page, fontStore) {
  if (shouldResolveDynamicNodes(page)) {
    var resolvedPage = resolveDynamicNodes(props, page);
    return relayoutPage(resolvedPage, fontStore);
  }

  return page;
};

var splitPage = function splitPage(page, pageNumber, fontStore) {
  var wrapArea = (0, _getWrapArea.default)(page);
  var contentArea = (0, _getContentArea.default)(page);
  var height = R.path(['style', 'height'], page);
  var dynamicPage = resolveDynamicPage({
    pageNumber: pageNumber
  }, page, fontStore);

  var _splitNodes = splitNodes(wrapArea, contentArea, dynamicPage.children),
      currentChilds = _splitNodes[0],
      nextChilds = _splitNodes[1];

  var relayout = function relayout(node) {
    return relayoutPage(node, fontStore);
  };

  var currentPage = R.compose(relayout, assingChildren(currentChilds), R.assocPath(['box', 'height'], height))(page);
  if (R.isEmpty(nextChilds) || allFixed(nextChilds)) return [currentPage, null];
  var nextPage = R.compose(relayout, assingChildren(nextChilds), R.dissocPath(['box', 'height']))(page);
  return [currentPage, nextPage];
};

var resolvePageIndices = function resolvePageIndices(fontStore) {
  return function (page, pageNumber, pages) {
    var totalPages = pages.length;
    var props = {
      totalPages: totalPages,
      pageNumber: pageNumber + 1,
      subPageNumber: page.subPageNumber + 1,
      subPageTotalPages: page.subPageTotalPages
    };
    return resolveDynamicPage(props, page, fontStore);
  };
};

var assocSubPageData = function assocSubPageData(subpages) {
  return subpages.map(function (page, i) {
    return (0, _extends2.default)({}, page, {
      subPageNumber: i,
      subPageTotalPages: subpages.length
    });
  });
};

var dissocSubPageData = function dissocSubPageData(page) {
  return R.compose(R.dissoc('subPageNumber'), R.dissoc('subPageTotalPages'))(page);
};

var paginate = function paginate(page, pageNumber, fontStore) {
  if (!page) return [];
  var splittedPage = splitPage(page, pageNumber, fontStore);
  var pages = [splittedPage[0]];
  var nextPage = splittedPage[1];

  while (nextPage !== null) {
    splittedPage = splitPage(nextPage, pageNumber + pages.length, fontStore);
    pages.push(splittedPage[0]);
    nextPage = splittedPage[1];
  }

  return pages;
};
/**
 * Performs pagination. This is the step responsible of breaking the whole document
 * into pages following pagiation rules, such as `fixed`, `break` and dynamic nodes.
 *
 * @param {Object} node
 * @param {Object} fontStore font store
 * @returns {Object} layout node
 */


var resolvePagination = function resolvePagination(doc, fontStore) {
  var pages = [];
  var pageNumber = 1;

  for (var i = 0; i < doc.children.length; i += 1) {
    var page = doc.children[i];
    var subpages = paginate(page, pageNumber, fontStore);
    subpages = assocSubPageData(subpages);
    pageNumber += subpages.length;
    pages = pages.concat(subpages);
  }

  pages = pages.map(R.compose(dissocSubPageData, resolvePageIndices(fontStore)));
  return assingChildren(pages, doc);
};

var _default = resolvePagination;
exports.default = _default;