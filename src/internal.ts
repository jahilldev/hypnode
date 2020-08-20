import { IAttrs } from './attributes';
import { Tag } from './index';

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

export { IMap, nodeMap };
