import { IAttrs } from './attributes';
import { Tag } from './index';

/* -----------------------------------
 *
 * IContext
 *
 * -------------------------------- */

interface IContext {
  [id: number]: {
    tag?: Tag;
    attrs?: IAttrs;
    node?: HTMLElement;
    state: any;
  };
}

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

const context: IContext = {};
let callIndex = -1;
let callRender: number = null;

/* -----------------------------------
 *
 * Element
 *
 * -------------------------------- */

function setElement(node: HTMLElement, index: number) {
  context[index].node = node;

  return node;
}

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

function reRender(index: number) {
  const { tag, attrs, node } = context[index];

  let root = node;

  if (typeof tag !== 'function') {
    return;
  }

  callRender = index;

  const result = setElement(tag(attrs), index);

  if (!document.body.contains(node)) {
    root = context[index + 1].node;
  }

  callRender = null;

  if (node instanceof HTMLElement) {
    setTimeout(() => root.parentNode.replaceChild(result, root), 0);
  }
}

/* -----------------------------------
 *
 * Set
 *
 * -------------------------------- */

function setValue(index: number) {
  return (value: any) => {
    context[index].state = value;

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
    state = context[index].state;
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

  context[index] = {
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
