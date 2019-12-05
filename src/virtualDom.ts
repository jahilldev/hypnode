import { IAttrs } from './attributes';
import { Tag } from './index';

/* -----------------------------------
 *
 * IVNode
 *
 * -------------------------------- */

interface IVNode {
   nodeName: Tag;
   attrs: IAttrs;
   children: any[];
}

/* -----------------------------------
 *
 * Virtual
 *
 * -------------------------------- */

function virtualDom(tag: Tag, attrs: IAttrs, children: any[]): any {
   return {
      nodeName: tag,
      attrs: filterValidAttributes(attrs),
      children,
   };
}

/* -----------------------------------
 *
 * Filter
 *
 * -------------------------------- */

function filterValidAttributes(attrs: IAttrs) {
   const keys = Object.keys(attrs);
   const valid = keys.filter(key => key.slice(0, 2) !== 'on' && key !== 'ref');

   return valid.reduce((result: IAttrs, key) => {
      result[key] = attrs[key];

      return result;
   }, {});
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IVNode, virtualDom };
