"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/* eslint-disable no-param-reassign */
var getDocumentProp = function getDocumentProp(target) {
  return function (or, prop) {
    return R.pathOr(or, ['props', prop], target);
  };
};

var setPDFMetadata = function setPDFMetadata(target) {
  return function (key, value) {
    if (value) target.info[key] = value;
  };
};
/**
 * Set document instance metadata
 *
 * @param {Object} ctx document instance
 * @param {Object} doc document root
 */


var addMetadata = function addMetadata(ctx, doc) {
  var getProp = getDocumentProp(doc);
  var setProp = setPDFMetadata(ctx);
  var title = getProp(null, 'title');
  var author = getProp(null, 'author');
  var subject = getProp(null, 'subject');
  var keywords = getProp(null, 'keywords');
  var creator = getProp('react-pdf', 'creator');
  var producer = getProp('react-pdf', 'producer');
  setProp('Title', title);
  setProp('Author', author);
  setProp('Subject', subject);
  setProp('Keywords', keywords);
  setProp('Creator', creator);
  setProp('Producer', producer);
  return doc;
};

var _default = R.curryN(2, addMetadata);

exports.default = _default;