"use strict";

exports.__esModule = true;
exports.default = void 0;

/* eslint-disable no-param-reassign */

/* eslint-disable max-classes-per-file */
var Node = /*#__PURE__*/function () {
  function Node(data) {
    this.prev = null;
    this.next = null;
    this.data = data;
  }

  var _proto = Node.prototype;

  _proto.toString = function toString() {
    return this.data.toString();
  };

  return Node;
}();

var LinkedList = /*#__PURE__*/function () {
  function LinkedList() {
    this.head = null;
    this.tail = null;
    this.listSize = 0;
  }

  var _proto2 = LinkedList.prototype;

  _proto2.isLinked = function isLinked(node) {
    return !(node && node.prev === null && node.next === null && this.tail !== node && this.head !== node || this.isEmpty());
  };

  _proto2.size = function size() {
    return this.listSize;
  };

  _proto2.isEmpty = function isEmpty() {
    return this.listSize === 0;
  };

  _proto2.first = function first() {
    return this.head;
  };

  _proto2.last = function last() {
    return this.last;
  };

  _proto2.toString = function toString() {
    return this.toArray().toString();
  };

  _proto2.toArray = function toArray() {
    var node = this.head;
    var result = [];

    while (node !== null) {
      result.push(node);
      node = node.next;
    }

    return result;
  };

  _proto2.forEach = function forEach(fun) {
    var node = this.head;

    while (node !== null) {
      fun(node);
      node = node.next;
    }
  };

  _proto2.contains = function contains(n) {
    var node = this.head;

    if (!this.isLinked(n)) {
      return false;
    }

    while (node !== null) {
      if (node === n) {
        return true;
      }

      node = node.next;
    }

    return false;
  };

  _proto2.at = function at(i) {
    var node = this.head;
    var index = 0;

    if (i >= this.listLength || i < 0) {
      return null;
    }

    while (node !== null) {
      if (i === index) {
        return node;
      }

      node = node.next;
      index += 1;
    }

    return null;
  };

  _proto2.insertAfter = function insertAfter(node, newNode) {
    if (!this.isLinked(node)) {
      return this;
    }

    newNode.prev = node;
    newNode.next = node.next;

    if (node.next === null) {
      this.tail = newNode;
    } else {
      node.next.prev = newNode;
    }

    node.next = newNode;
    this.listSize += 1;
    return this;
  };

  _proto2.insertBefore = function insertBefore(node, newNode) {
    if (!this.isLinked(node)) {
      return this;
    }

    newNode.prev = node.prev;
    newNode.next = node;

    if (node.prev === null) {
      this.head = newNode;
    } else {
      node.prev.next = newNode;
    }

    node.prev = newNode;
    this.listSize += 1;
    return this;
  };

  _proto2.push = function push(node) {
    if (this.head === null) {
      this.unshift(node);
    } else {
      this.insertAfter(this.tail, node);
    }

    return this;
  };

  _proto2.unshift = function unshift(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      node.prev = null;
      node.next = null;
      this.listSize += 1;
    } else {
      this.insertBefore(this.head, node);
    }

    return this;
  };

  _proto2.remove = function remove(node) {
    if (!this.isLinked(node)) {
      return this;
    }

    if (node.prev === null) {
      this.head = node.next;
    } else {
      node.prev.next = node.next;
    }

    if (node.next === null) {
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
    }

    this.listSize -= 1;
    return this;
  };

  _proto2.pop = function pop() {
    var node = this.tail;
    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    this.listSize -= 1;
    node.prev = null;
    node.next = null;
    return node;
  };

  _proto2.shift = function shift() {
    var node = this.head;
    this.head.next.prev = null;
    this.head = this.head.next;
    this.listSize -= 1;
    node.prev = null;
    node.next = null;
    return node;
  };

  return LinkedList;
}();

LinkedList.Node = Node;
var _default = LinkedList;
exports.default = _default;