import { IAttrs } from './attributes';
import { Tag } from './index';
import { nodeMap } from './internal';

/* -----------------------------------
 *
 * IState
 *
 * -------------------------------- */

type State<T> = [T, (value: T) => void];

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

let callIndex = -1;
let callRender: number = null;

/* -----------------------------------
 *
 * Element
 *
 * -------------------------------- */

function setElement(node: HTMLElement, index: number) {
  nodeMap[index].node = node;

  (node as any).nodeIndex = index;

  return node;
}

/* -----------------------------------
 *
 * Target
 *
 * -------------------------------- */

function getTarget(node: HTMLElement, index: number) {
  const indexes = Object.keys(nodeMap).map((item) => parseInt(item, 10));

  let root = node;

  if (document.body.contains(node)) {
    return node;
  }

  for (let i = indexes.length - 1; i >= 0; i--) {
    const item = nodeMap[i].node;

    if (document.body.contains(item)) {
      root = item;

      break;
    }
  }

  const stack = [root];
  let result;

  while (stack.length > 0) {
    result = stack.pop();

    if ((result as any).nodeIndex === index) {
      return result;
    }

    if (result.children && result.children.length) {
      for (let item = 0; item < result.children.length; item += 1) {
        stack.push(result.children[item] as any);
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
  const { tag, attrs, node } = nodeMap[index];

  const root = node;

  if (typeof tag !== 'function') {
    return;
  }

  callRender = index;

  const result = tag(attrs);

  console.log(`reRender(${index})`, nodeMap, result);

  callRender = null;

  if (node instanceof HTMLElement) {
    const target = getTarget(root, index);

    target.parentNode.replaceChild(result, target);

    setElement(result, index);
  }
}

/* -----------------------------------
 *
 * Set
 *
 * -------------------------------- */

function setValue(index: number) {
  return (value: any) => {
    nodeMap[index].state = value;

    reRender(index);
  };
}

/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */

function useState<T>(initial: T): State<T> {
  let index = callIndex;
  let state = initial;

  if (callRender !== null) {
    index = callRender;
    state = nodeMap[index].state;
  }

  return [state, setValue(index)];
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
  };

  return index;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { State, useState, setIndex, setElement };
