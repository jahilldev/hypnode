import { IAttrs } from './attributes';
import { Tag } from './internal';

/* -----------------------------------
 *
 * Filter
 *
 * -------------------------------- */

function filterAttributes(attrs: IAttrs) {
  const keys = Object.keys(attrs);
  const valid = keys.filter((key) => key.slice(0, 2) !== 'on' && key !== 'ref');

  return valid.reduce((result: IAttrs, key) => {
    result[key] = attrs[key];

    return result;
  }, {});
}

/* -----------------------------------
 *
 * Virtual
 *
 * -------------------------------- */

function virtualDom(tag: Tag, attrs: IAttrs, children: any[]): any {
  return {
    nodeName: tag,
    attrs: filterAttributes(attrs),
    children,
  };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { virtualDom };
