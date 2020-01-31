import { IAttrs } from './attributes';
import { State, useState, setElement, setIndex } from './useState';
import { IVNode, virtualDom } from './virtualDom';

/* -----------------------------------
 *
 * JSX
 *
 * -------------------------------- */

declare global {
  namespace JSX {
    /* tslint:disable:interface-name */
    interface IntrinsicElements {
      [element: string]: IAttrs;
    }
  }
}

/* -----------------------------------
 *
 * Types
 *
 * -------------------------------- */

type Hypnode = (tag: Tag, attrs?: IAttrs, ...children: any[]) => HTMLElement;
type Tag = string | ((attrs?: IAttrs) => HTMLElement);

/* -----------------------------------
 *
 * Hypnode
 *
 * -------------------------------- */

function h(tag: Tag, attrs?: IAttrs, ...children: any[]): HTMLElement {
  const { document = null } = typeof window !== 'undefined' ? window : {};

  children = [].concat.apply([], children);

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

/* -----------------------------------
 *
 * Properties
 *
 * -------------------------------- */

function applyNodeProperties(element: HTMLElement, attrs?: IAttrs) {
  const keys = Object.keys(attrs || {});

  for (const key of keys) {
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
}

/* -----------------------------------
 *
 * Event
 *
 * -------------------------------- */

function addEventListener(
  element: HTMLElement,
  key: string,
  handler: EventListener
) {
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

  const result = items.reduce((style: string, key, index) => {
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
 * Render
 *
 * -------------------------------- */

function render(root: HTMLElement, output: HTMLElement) {
  if (!root.firstElementChild) {
    root.appendChild(output);

    return;
  }

  root.replaceChild(output, root.firstElementChild);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Hypnode, Tag, State, IVNode, h, useState, render };
