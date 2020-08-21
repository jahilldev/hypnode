import { IAttrs } from './attributes';
import { Tag, nodeMap } from './internal';

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
  node.hypnodeIndex = index;
  nodeMap[index].node = node;

  return node;
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
  const { tag, attrs, node } = nodeMap[index];

  if (typeof tag !== 'function') {
    return;
  }

  callRender = index;

  const result = tag(attrs);

  callRender = null;

  if (node instanceof HTMLElement) {
    const target = getTarget(node, index);

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
