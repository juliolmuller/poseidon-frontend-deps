import { useEffect, useRef } from 'react';
import { isBrowser, off, on } from './misc/util';
export function getClosestBody(el) {
    if (!el) {
        return null;
    }
    else if (el.tagName === 'BODY') {
        return el;
    }
    else if (el.tagName === 'IFRAME') {
        var document_1 = el.contentDocument;
        return document_1 ? document_1.body : null;
    }
    else if (!el.offsetParent) {
        return null;
    }
    return getClosestBody(el.offsetParent);
}
function preventDefault(rawEvent) {
    var e = rawEvent || window.event;
    // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
    if (e.touches.length > 1)
        return true;
    if (e.preventDefault)
        e.preventDefault();
    return false;
}
var isIosDevice = isBrowser &&
    window.navigator &&
    window.navigator.platform &&
    /iP(ad|hone|od)/.test(window.navigator.platform);
var bodies = new Map();
var doc = typeof document === 'object' ? document : undefined;
var documentListenerAdded = false;
export default !doc
    ? function useLockBodyMock(_locked, _elementRef) {
        if (_locked === void 0) { _locked = true; }
    }
    : function useLockBody(locked, elementRef) {
        if (locked === void 0) { locked = true; }
        var bodyRef = useRef(doc.body);
        elementRef = elementRef || bodyRef;
        var lock = function (body) {
            var bodyInfo = bodies.get(body);
            if (!bodyInfo) {
                bodies.set(body, { counter: 1, initialOverflow: body.style.overflow });
                if (isIosDevice) {
                    if (!documentListenerAdded) {
                        on(document, 'touchmove', preventDefault, { passive: false });
                        documentListenerAdded = true;
                    }
                }
                else {
                    body.style.overflow = 'hidden';
                }
            }
            else {
                bodies.set(body, {
                    counter: bodyInfo.counter + 1,
                    initialOverflow: bodyInfo.initialOverflow,
                });
            }
        };
        var unlock = function (body) {
            var bodyInfo = bodies.get(body);
            if (bodyInfo) {
                if (bodyInfo.counter === 1) {
                    bodies.delete(body);
                    if (isIosDevice) {
                        body.ontouchmove = null;
                        if (documentListenerAdded) {
                            off(document, 'touchmove', preventDefault);
                            documentListenerAdded = false;
                        }
                    }
                    else {
                        body.style.overflow = bodyInfo.initialOverflow;
                    }
                }
                else {
                    bodies.set(body, {
                        counter: bodyInfo.counter - 1,
                        initialOverflow: bodyInfo.initialOverflow,
                    });
                }
            }
        };
        useEffect(function () {
            var body = getClosestBody(elementRef.current);
            if (!body) {
                return;
            }
            if (locked) {
                lock(body);
            }
            else {
                unlock(body);
            }
        }, [locked, elementRef.current]);
        // clean up, on un-mount
        useEffect(function () {
            var body = getClosestBody(elementRef.current);
            if (!body) {
                return;
            }
            return function () {
                unlock(body);
            };
        }, []);
    };
