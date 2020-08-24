import { IAttrs } from './attributes';
import { h } from './index';

/* -----------------------------------
 *
 * Types
 *
 * -------------------------------- */

type Hypnode = (tag: Tag, attrs?: IAttrs, ...children: any[]) => HTMLElement;
type Tag = string | ((attrs?: IAttrs) => INode);
type Child = HTMLElement | string | number | boolean | null;

/* -----------------------------------
 *
 * INode
 *
 * -------------------------------- */

interface INode {
  tag: Tag;
  attrs: IAttrs;
  children: any[];
}

/* -----------------------------------
 *
 * IMap
 *
 * -------------------------------- */

interface IMap {
  [id: number]: {
    tag: Tag;
    attrs: IAttrs;
    node: HTMLElement | Text;
    state: any;
  };
}

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

let callIndex = -1;
let callRender: number = null;

/* -----------------------------------
 *
 * Map
 *
 * -------------------------------- */

const nodeMap: IMap = {};

/* -----------------------------------
 *
 * Element
 *
 * -------------------------------- */

function setElement(node: HTMLElement | Text, index: number) {
  nodeMap[index].node = node;

  return node;
}

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function setIndex(tag: Tag, attrs: IAttrs) {
  const target = tag === nodeMap[callRender]?.tag;

  if (target) {
    return callRender;
  }

  callRender = null;
  callIndex += 1;

  const index = callIndex;

  nodeMap[index] = {
    tag,
    attrs,
    node: null,
    state: null,
  };

  return index;
}

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function getIndex() {
  return callIndex;
}

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

function getRender() {
  return callRender;
}

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

function setRender(index: number) {
  callRender = index;
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
 * HTML
 *
 * -------------------------------- */

function html(node: INode | string | number, root?: HTMLElement): HTMLElement | Text {
  if (typeof node === 'string' || typeof node === 'number') {
    return document.createTextNode(node.toString());
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
 * Render
 *
 * -------------------------------- */

function render(node: INode, root?: HTMLElement | null | undefined): HTMLElement | Text {
  const output = html(node, root);

  if (!root) {
    return output;
  }

  if (!root.firstElementChild) {
    root.appendChild(output);
  } else {
    root.replaceChild(output, root.firstElementChild);
  }

  return output;
}

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

function reRender(index: number) {
  const {
    tag,
    attrs: { children, ...attrs },
    node,
  } = nodeMap[index];

  if (typeof tag !== 'function') {
    return;
  }

  setRender(index);

  const result = html(h(tag, attrs, ...children));

  setRender(null);

  if (node instanceof HTMLElement) {
    node.parentNode.replaceChild(result, node);
  }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export {
  Hypnode,
  Tag,
  Child,
  INode,
  IMap,
  nodeMap,
  setElement,
  getIndex,
  setIndex,
  getRender,
  setRender,
  reRender,
  render,
  html,
};
