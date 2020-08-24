import { IAttrs } from './attributes';
import { Tag, Child, INode, render } from './internal';
import { State, useState, setElement, setIndex } from './useState';
import { virtualDom } from './virtualDom';

/* -----------------------------------
 *
 * JSX
 *
 * -------------------------------- */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [element: string]: IAttrs;
    }
  }
}

/* -----------------------------------
 *
 * Event
 *
 * -------------------------------- */

function addEventListener(element: HTMLElement, key: string, handler: EventListener) {
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

function addElementReference(
  element: HTMLElement,
  key: string,
  handler: (el: Element) => void
) {
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

function addStyleProperies(
  element: HTMLElement,
  key: string,
  value: { [index: string]: string }
) {
  if (key !== 'style') {
    return false;
  }

  const items = Object.keys(value);

  const result = items.reduce((style, item) => {
    const name = item.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    style += `${name}:${value[item]};`;

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

function addAttributes(element: HTMLElement, key: string, value: string) {
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

/* -----------------------------------
 *
 * Properties
 *
 * -------------------------------- */

function applyNodeProperties(element: HTMLElement, attrs?: IAttrs) {
  const keys = Object.keys(attrs || {});

  if (!keys.length) {
    return;
  }

  for (const key of keys) {
    const value = attrs[key];

    if (addEventListener(element, key, value)) {
      return;
    }

    if (addElementReference(element, key, value)) {
      return;
    }

    if (addStyleProperies(element, key, value)) {
      return;
    }

    addAttributes(element, key, value);
  }
}

/* -----------------------------------
 *
 * Hypnode
 *
 * -------------------------------- */

function h(tag: Tag, attrs?: IAttrs, ...nested: any[]): HTMLElement {
  const { document = null } = typeof window !== 'undefined' ? window : {};
  const children: Child[] = [].concat.apply([], nested);

  if (tag instanceof Function) {
    const props = { ...attrs, children };
    const index = setIndex(tag, props);

    return setElement(tag(props), index);
  }

  if (!document) {
    return virtualDom(tag, attrs, children);
  }

  const element = document.createElement(tag);

  applyNodeProperties(element, attrs);

  if (children.length > 0) {
    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        element.appendChild(child);

        return;
      }

      if (typeof child === 'string' || typeof child === 'number') {
        element.appendChild(document.createTextNode(child.toString()));
      }
    });
  }

  return element;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Child, State, INode, h, useState, render };
