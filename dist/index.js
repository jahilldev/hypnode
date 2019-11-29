"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* -----------------------------------
 *
 * Hypertext
 *
 * -------------------------------- */
function h(tag, attrs, ...children) {
    const { document } = window || {};
    const element = document.createElement(tag);
    for (const key of Object.keys(attrs || {})) {
        const value = attrs[key];
        if (addEventListener(element, key, value)) {
            continue;
        }
        if (addElementReference(element, key, value)) {
            continue;
        }
        addAttributes(element, key, value);
    }
    if (children.length === 0) {
        return element;
    }
    children.forEach(child => {
        if (child instanceof Node) {
            element.appendChild(child);
            return;
        }
        element.appendChild(document.createTextNode(child));
    });
    return element;
}
exports.h = h;
/* -----------------------------------
 *
 * Event
 *
 * -------------------------------- */
function addEventListener(element, key, handler) {
    if (key.slice(0, 2) !== 'on') {
        return false;
    }
    const eventName = key.slice(2).toLowerCase();
    element.addEventListener(eventName, handler, false);
    return true;
}
/* -----------------------------------
 *
 * Event
 *
 * -------------------------------- */
function addElementReference(element, key, handler) {
    if (key !== 'ref') {
        return false;
    }
    handler(element);
    return true;
}
/* -----------------------------------
 *
 * Attributes
 *
 * -------------------------------- */
function addAttributes(element, key, value) {
    if (['disabled', 'autocomplete', 'selected', 'checked'].indexOf(key) > -1) {
        element.setAttribute(key, key);
        return;
    }
    if (!value) {
        return;
    }
    element.setAttribute(key, value);
}
//# sourceMappingURL=index.js.map