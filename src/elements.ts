import { IAttrs } from './attributes';
import { Node, setIndex, setElement } from './internal';

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
 * HTML
 *
 * -------------------------------- */

function html(node: Node, root?: HTMLElement): HTMLElement | Text {
  if (typeof node === 'string' || typeof node === 'number') {
    return document.createTextNode(node.toString());
  }

  if (typeof node === 'boolean') {
    return document.createTextNode('');
  }

  const { tag, attrs, children } = node;

  if (tag instanceof Function) {
    const props = { ...attrs, children };
    const index = setIndex(tag, props);

    return setElement(html(tag(props), root), index);
  }

  const element = document.createElement(tag);

  applyNodeProperties(element, attrs);

  children.forEach((item) => {
    const child = html(item, element);

    element.appendChild(child);
  });

  return element;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { html };
