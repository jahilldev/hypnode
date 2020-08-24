import { IAttrs } from './attributes';
import { Tag, INode, render } from './internal';
import { State, useState } from './useState';

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

function h(tag: Tag, attrs?: IAttrs, ...nested: any[]): INode {
  const children = nested.length ? [].concat(...nested) : [];

  return { tag, attrs: attrs || {}, children };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { State, INode, h, useState, render };
