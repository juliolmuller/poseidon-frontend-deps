import * as primitives from '@react-pdf/primitives';
export * from '@react-pdf/primitives';
import fs from 'fs';
import BlobStream from 'blob-stream';
import FontStore from '@react-pdf/font';
import renderPDF from '@react-pdf/render';
import PDFDocument from '@react-pdf/pdfkit';
import layoutDocument from '@react-pdf/layout';
import ReactFiberReconciler from 'react-reconciler';
import { unstable_scheduleCallback, unstable_cancelCallback } from 'scheduler';

/* eslint-disable no-continue */

/**
 * Checks if two sets of props are equal (recursively)
 *
 * @param {Object} props A
 * @param {Object} props B
 * @returns {Boolean} props equals?
 *
 */
const propsEqual = (a, b) => {
  const oldPropsKeys = Object.keys(a);
  const newPropsKeys = Object.keys(b);

  if (oldPropsKeys.length !== newPropsKeys.length) {
    return false;
  }

  for (let i = 0; i < oldPropsKeys.length; i += 1) {
    const propName = oldPropsKeys[i];

    if (propName === 'render' && !a[propName] !== !b[propName]) {
      return false;
    }

    if (propName !== 'children' && a[propName] !== b[propName]) {
      if (typeof a[propName] === 'object' && typeof b[propName] === 'object' && propsEqual(a[propName], b[propName])) {
        continue;
      }

      return false;
    }

    if (propName === 'children' && (typeof a[propName] === 'string' || typeof b[propName] === 'string')) {
      return a[propName] === b[propName];
    }
  }

  return true;
};

/* eslint-disable no-unused-vars */
const emptyObject = {};

const createRenderer = ({
  onChange = () => {}
}) => {
  return ReactFiberReconciler({
    schedulePassiveEffects: unstable_scheduleCallback,
    cancelPassiveEffects: unstable_cancelCallback,
    supportsMutation: true,
    isPrimaryRenderer: false,
    warnsIfNotActing: false,

    appendInitialChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    createInstance(type, {
      style,
      children,
      ...props
    }) {
      return {
        type,
        box: {},
        style: style || {},
        props: props || {},
        children: []
      };
    },

    createTextInstance(text, rootContainerInstance) {
      return {
        type: 'TEXT_INSTANCE',
        value: text
      };
    },

    finalizeInitialChildren(element, type, props) {
      return false;
    },

    getPublicInstance(instance) {
      return instance;
    },

    prepareForCommit() {// Noop
    },

    clearContainer() {// Noop
    },

    prepareUpdate(element, type, oldProps, newProps) {
      return !propsEqual(oldProps, newProps);
    },

    resetAfterCommit: onChange,

    resetTextContent(element) {// Noop
    },

    getRootHostContext() {
      return emptyObject;
    },

    getChildHostContext() {
      return emptyObject;
    },

    shouldSetTextContent(type, props) {
      return false;
    },

    now: Date.now,
    useSyncScheduling: true,

    appendChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.type === 'ROOT') {
        parentInstance.document = child;
      } else {
        parentInstance.children.push(child);
      }
    },

    insertBefore(parentInstance, child, beforeChild) {
      var _parentInstance$child;

      const index = (_parentInstance$child = parentInstance.children) === null || _parentInstance$child === void 0 ? void 0 : _parentInstance$child.indexOf(beforeChild);
      if (index === undefined) return;
      if (index !== -1 && child) parentInstance.children.splice(index, 0, child);
    },

    removeChild(parentInstance, child) {
      var _parentInstance$child2;

      const index = (_parentInstance$child2 = parentInstance.children) === null || _parentInstance$child2 === void 0 ? void 0 : _parentInstance$child2.indexOf(child);
      if (index === undefined) return;
      if (index !== -1) parentInstance.children.splice(index, 1);
    },

    removeChildFromContainer(parentInstance, child) {
      var _parentInstance$child3;

      const index = (_parentInstance$child3 = parentInstance.children) === null || _parentInstance$child3 === void 0 ? void 0 : _parentInstance$child3.indexOf(child);
      if (index === undefined) return;
      if (index !== -1) parentInstance.children.splice(index, 1);
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.value = newText;
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      const {
        style,
        ...props
      } = newProps;
      instance.props = props;
      instance.style = style;
    }

  });
};

var version = "2.3.0";

const fontStore = new FontStore(); // We must keep a single renderer instance, otherwise React will complain

let renderer; // The pdf instance acts as an event emitter for DOM usage.
// We only want to trigger an update when PDF content changes

const events = {};

const pdf = initialValue => {
  const onChange = () => {
    var _events$change;

    const listeners = ((_events$change = events.change) === null || _events$change === void 0 ? void 0 : _events$change.slice()) || [];

    for (let i = 0; i < listeners.length; i += 1) listeners[i]();
  };

  const container = {
    type: 'ROOT',
    document: null
  };
  renderer = renderer || createRenderer({
    onChange
  });
  const mountNode = renderer.createContainer(container);

  const updateContainer = doc => {
    renderer.updateContainer(doc, mountNode, null);
  };

  if (initialValue) updateContainer(initialValue);

  const render = async (compress = true) => {
    const props = container.document.props || {};
    const {
      pdfVersion,
      language,
      pageLayout,
      pageMode
    } = props;
    const ctx = new PDFDocument({
      compress,
      pdfVersion,
      lang: language,
      displayTitle: true,
      autoFirstPage: false,
      pageLayout,
      pageMode
    });
    const layout = await layoutDocument(container.document, fontStore);
    return renderPDF(ctx, layout);
  };

  const callOnRender = (params = {}) => {
    if (container.document.props.onRender) {
      container.document.props.onRender(params);
    }
  };

  const toBlob = async () => {
    const instance = await render();
    const stream = instance.pipe(BlobStream());
    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        try {
          const blob = stream.toBlob('application/pdf');
          callOnRender({
            blob
          });
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      });
      stream.on('error', reject);
    });
  };

  const toBuffer = async () => {
    callOnRender();
    return render();
  };

  const toString = async () => {
    let result = '';
    const instance = await render(false); // For some reason, when rendering to string if compress=true the document is blank

    return new Promise((resolve, reject) => {
      try {
        instance.on('data', buffer => {
          result += buffer;
        });
        instance.on('end', () => {
          callOnRender();
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  const on = (event, listener) => {
    if (!events[event]) events[event] = [];
    events[event].push(listener);
  };

  const removeListener = (event, listener) => {
    if (!events[event]) return;
    const idx = events[event].indexOf(listener);
    if (idx > -1) events[event].splice(idx, 1);
  };

  return {
    on,
    container,
    toBlob,
    toBuffer,
    toString,
    removeListener,
    updateContainer
  };
};

const Font = fontStore;
const StyleSheet = {
  create: s => s
};

const renderToFile = async (element, filePath, callback) => {
  const instance = pdf(element);
  const output = await instance.toBuffer();
  const stream = fs.createWriteStream(filePath);
  output.pipe(stream);
  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      if (callback) callback(output, filePath);
      resolve(output);
    });
    stream.on('error', reject);
  });
};

const renderToStream = async element => {
  const instance = pdf(element);
  const buffer = await instance.toBuffer();
  return buffer;
};

const renderToString = element => {
  const instance = pdf(element);
  return instance.toString();
};

const throwEnvironmentError = name => {
  throw new Error(`${name} is a web specific API. You're either using this component on Node, or your bundler is not loading react-pdf from the appropriate web build.`);
};

const usePDF = () => {
  throwEnvironmentError('usePDF');
};
const PDFViewer = () => {
  throwEnvironmentError('PDFViewer');
};
const PDFDownloadLink = () => {
  throwEnvironmentError('PDFDownloadLink');
};
const BlobProvider = () => {
  throwEnvironmentError('BlobProvider');
};
const render = renderToFile;
var index = {
  pdf,
  Font,
  version,
  StyleSheet,
  usePDF,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
  renderToStream,
  renderToString,
  renderToFile,
  render,
  ...primitives
};

export { BlobProvider, Font, PDFDownloadLink, PDFViewer, StyleSheet, createRenderer, index as default, pdf, render, renderToFile, renderToStream, renderToString, usePDF, version };
//# sourceMappingURL=react-pdf.es.js.map
