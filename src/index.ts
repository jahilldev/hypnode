import { IAttrs } from './attributes';
import { Tag, INode, render } from './internal';
import { State, useState } from './useState';
import { useEffect } from './useEffect';

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

export { Tag, State, INode, h, render, useState, useEffect };
