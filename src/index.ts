import { IAttrs } from './attributes';
import { Tag, Child, INode, applyNodeProperties } from './internal';
import { State, useState, setElement, setIndex } from './useState';
import { virtualDom } from './virtualDom';

/* -----------------------------------
 *
 * JSX
 *
 * -------------------------------- */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [element: string]: IAttrs;
    }
  }
}

/* -----------------------------------
 *
 * Hypnode
 *
 * -------------------------------- */

function h(tag: Tag, attrs?: IAttrs, ...nested: any[]): HTMLElement {
  const { document = null } = typeof window !== 'undefined' ? window : {};
  const children: Child[] = [].concat.apply([], nested);

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

  if (children.length > 0) {
    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        element.appendChild(child);

        return;
      }

      if (typeof child === 'string' || typeof child === 'number') {
        element.appendChild(document.createTextNode(child.toString()));
      }
    });
  }

  return element;
}

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

function render(root: HTMLElement | null, output: HTMLElement) {
  if (!root) {
    throw new Error('hypnode -> render(): Missing root element');
  }

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

export { Child, State, INode, h, useState, render };
