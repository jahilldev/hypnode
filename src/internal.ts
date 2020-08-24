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
    effect?: any;
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

  console.log(`setElement(${index}) -> node`, node);

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
    effect: null,
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
 * Target
 *
 * -------------------------------- */

function getTarget(node: HTMLElement, index: number) {
  const stack: Element[] = [document.body];

  if (document.body.contains(node)) {
    return node;
  }

  console.log(`getTarget(${index})`);

  let result;

  while (stack.length > 0) {
    result = stack.pop();

    if (result.hypnodeIndex === index) {
      return result;
    }

    const { children } = result;

    if (children && children.length) {
      for (let item = 0; item < children.length; item += 1) {
        stack.push(children[item]);
      }
    }
  }

  return null;
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

  console.log('html() -> node', node);

  if (tag instanceof Function) {
    const props = { ...attrs, children };

    const index = setIndex(tag, props);

    return setElement(html(tag(props), root), index);
  }

  console.log('html() -> createElement', tag);

  const element = document.createElement(tag);

  applyNodeProperties(element, attrs);

  console.log(`html() -> element`, element);
  console.log(`html() -> children`, children);

  children.forEach((item) => {
    const child = html(item, element);

    console.log(`html() -> child`, child);

    element.appendChild(child);
  });

  return element;
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

  console.log('###################');
  console.log(`reRender(${index}) -> node / children`, node, children);
  console.log(`reRender(${index}) -> nodeMap`, nodeMap);

  setRender(index);

  const result = html(h(tag, attrs, ...children));

  setRender(null);

  if (node instanceof HTMLElement) {
    const target = getTarget(node, index);

    target.parentNode.replaceChild(result, target);
  }
}

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

function render(root: HTMLElement | null, node: INode) {
  if (!root) {
    throw new Error('hypnode -> render(): Missing root element');
  }

  const output = html(node, root);

  console.log('render() -> node', node);
  console.log('render() -> output', output);

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
