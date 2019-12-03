"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* -----------------------------------
 *
 * Hypnode
 *
 * -------------------------------- */
function h(tag, attrs, ...children) {
    const { document } = window || {};
    children = [].concat.apply([], children);
    if (tag instanceof Function) {
        return tag(Object.assign(Object.assign({}, attrs), { children }));
    }
    const element = document.createElement(tag);
    for (const key of Object.keys(attrs || {})) {
        const value = attrs[key];
        if (addEventListener(element, key, value)) {
            continue;
        }
        if (addElementReference(element, key, value)) {
            continue;
        }
        if (addStyleProperies(element, key, value)) {
            continue;
        }
        addAttributes(element, key, value);
    }
    if (children.length === 0) {
        return element;
    }
    children.forEach(child => {
        if (child instanceof HTMLElement) {
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
 * Styles
 *
 * -------------------------------- */
function addStyleProperies(element, key, value) {
    if (key !== 'style') {
        return false;
    }
    const items = Object.keys(value);
    const result = items.reduce((style, key, index) => {
        const name = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        style += `${name}:${value[key]};`;
        return style;
    }, '');
    element.setAttribute('style', result);
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
    if (key === 'className') {
        key = 'class';
    }
    element.setAttribute(key, value);
}
//# sourceMappingURL=index.js.map