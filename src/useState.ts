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

  return node;
}

/* -----------------------------------
 *
 * Target
 *
 * -------------------------------- */

function getTarget(node: HTMLElement, index: number): Element {
  const stack = [];
  let result;
  let ii;

  stack.push(node);

  console.log(`getTarget(${index})`, node);

  while (stack.length > 0) {
    result = stack.pop();

    console.log(
      `getTarget(${index}) -> result / mapIndex vs index`,
      result,
      (result as any).nodeIndex,
      index
    );

    if ((result as any).nodeIndex === index) {
      return result;
    }

    if (result.children && result.children.length) {
      for (ii = 0; ii < result.children.length; ii += 1) {
        stack.push(result.children[ii]);
      }
    }
  }

  return null;
}

/* -----------------------------------
 *
 * Root
 *
 * -------------------------------- */

function getRoot(node: HTMLElement, index: number) {
  const indexes = Object.keys(nodeMap).map((item) => parseInt(item, 10));

  let root = node;

  if (document.body.contains(node)) {
    return node;
  }

  for (let i = indexes.length - 1; i >= 0; i--) {
    const item = nodeMap[i].node;

    console.log(`getRoot(${index}) i / item`, i, item);

    if (document.body.contains(item)) {
      root = item;

      break;
    }
  }

  console.log('getRoot() root:', root);

  return getTarget(root, index);
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

  console.log(`reRender(${index}) -> root / result`, root, result);
  console.log(`reRender(${index}) -> context`, nodeMap);
  console.log(
    `reRender(${index}) -> index (old/new)`,
    (node as any).nodeIndex,
    (result as any).nodeIndex
  );

  /*
  if (!document.body.contains(node)) {
    root = nodeMap[index + 1].node.parentElement;

    console.log(`reRender(${index}) -> bump index (${index + 1})`, root);
  }
  */

  // console.log(`reRender(${index}) -> root / parent`, root, root.parentNode);

  callRender = null;

  if (node instanceof HTMLElement) {
    const target = getRoot(root, index);

    console.log(`reRender(${index}) -> target`, target);

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
    console.log(`setIndex(${callRender})`);

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
