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
    tag?: Tag;
    attrs?: IAttrs;
    node?: HTMLElement;
    state: any;
  };
}

/* -----------------------------------
 *
 * Map
 *
 * -------------------------------- */

const nodeMap: IMap = {};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Hypnode, Tag, Child, INode, IMap, nodeMap };
