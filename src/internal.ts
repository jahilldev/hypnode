import { IAttrs } from './attributes';

/* -----------------------------------
 *
 * Types
 *
 * -------------------------------- */

type Hypnode = (tag: Tag, attrs?: IAttrs, ...children: any[]) => HTMLElement;
type Tag = string | ((attrs?: IAttrs) => HTMLElement);
type Child = HTMLElement | string | number | boolean | null;

/* -----------------------------------
 *
 * INode
 *
 * -------------------------------- */

interface INode {
  nodeName: Tag;
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
    node: HTMLElement;
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

function setElement(node: HTMLElement, index: number) {
  node.hypnodeIndex = index;
  nodeMap[index].node = node;

  return node;
}

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function setIndex(tag: Tag, attrs: IAttrs) {
  if (callRender !== null) {
    return callRender;
  }

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
  const [rootKey] = Object.keys(nodeMap).map((key) => parseInt(key, 10));

  if (document.body.contains(node)) {
    return node;
  }

  let result;

  const stack: Element[] = [nodeMap[rootKey].node];

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
 * Render
 *
 * -------------------------------- */

function reRender(index: number) {
  const { tag, attrs, node, effect } = nodeMap[index];

  if (typeof tag !== 'function') {
    return;
  }

  setRender(index);

  if (effect) {
    effect();
  }

  const result = tag(attrs);

  setRender(null);

  if (node instanceof HTMLElement) {
    const target = getTarget(node, index);

    target.parentNode.replaceChild(result, target);

    setElement(result, index);
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
};
