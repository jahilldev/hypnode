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
      attrs,
      children,
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IVNode, virtualDom };
