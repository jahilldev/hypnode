import { IAttrs } from './attributes';
import { html } from './elements';
import { h } from './index';
import { Effect } from './useEffect';

/* -----------------------------------
 *
 * Types
 *
 * -------------------------------- */

type Hypnode = (tag: Tag, attrs?: IAttrs, ...children: any[]) => HTMLElement;
type Tag = string | ((attrs?: IAttrs) => INode);
type Node = INode | string | number | boolean | null;

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
    effect?: () => void;
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
 * Index
 *
 * -------------------------------- */

function getIndex() {
  return callIndex;
}

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function setIndex(tag: Tag, attrs: IAttrs) {
  const target = tag === nodeMap[callRender]?.tag;

  if (target) {
    return getRender();
  }

  setRender(null);

  callIndex += 1;

  const index = getIndex();

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
 * Element
 *
 * -------------------------------- */

function setElement(node: HTMLElement | Text, index: number) {
  nodeMap[index].node = node;

  return node;
}

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

function render(node: INode, root?: HTMLElement | null | undefined): HTMLElement {
  const output = html(node, root);

  if (!root) {
    return output as HTMLElement;
  }

  if (!root.firstElementChild) {
    root.appendChild(output);
  } else {
    root.replaceChild(output, root.firstElementChild);
  }

  return output as HTMLElement;
}

/* -----------------------------------
 *
 * Resolve
 *
 * -------------------------------- */

function resolve() {
  const nodeKeys = Object.keys(nodeMap).map((key) => parseInt(key, 10));

  nodeKeys.forEach((key) => {
    const { node, effect } = nodeMap[key];

    if (!document.body.contains(node)) {
      if (effect) {
        effect();
      }

      delete nodeMap[key];
    }
  });
}

/* -----------------------------------
 *
 * Update
 *
 * -------------------------------- */

function update(index: number) {
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

    resolve();
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
  Node,
  INode,
  IMap,
  nodeMap,
  setElement,
  getIndex,
  setIndex,
  getRender,
  setRender,
  update,
  render,
};
