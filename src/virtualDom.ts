import { IAttrs } from './attributes';
import { Tag } from './index';

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

export { virtualDom };
