import { IAttrs } from '../../src/attributes';
import { IVNode } from '../../src/virtualDom';

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const testTitle = 'testTitle';
const testValue = 'testValue';

/* -----------------------------------
 *
 * Mocks
 *
 * -------------------------------- */

jest.spyOn(window, 'document', 'get').mockImplementation(() => undefined);

/* -----------------------------------
 *
 * Subject
 *
 * -------------------------------- */

import { h } from '../../src/index';

/* -----------------------------------
 *
 * State
 *
 * -------------------------------- */

describe('Core:virtualDom', () => {
   beforeEach(() => jest.clearAllMocks());

   it('builds a virtual representation of a provided DOM structure', () => {
      const itemArray = ['a', 'b', 'c', 'd', 'e', 'f'];

      const sample = {
         nodeName: 'ul',
         attrs: { title: testTitle },
         children: itemArray.map(item => ({
            nodeName: 'li',
            attrs: { id: item },
            children: [`${testValue} ${item}`],
         })),
      };

      const result = h(
         'ul',
         { title: testTitle },
         itemArray.map(item =>
            h(Component, { id: item }, `${testValue} ${item}`)
         )
      );

      expect(result).toEqual(sample);
   });

   it('filters non HTML attributes from virtual nodes', () => {
      const sample: IVNode = {
         nodeName: 'div',
         attrs: { title: testTitle },
         children: [],
      };

      const result = h('div', {
         title: testTitle,
         onClick: ev => console.log(ev),
         ref: (el: HTMLElement) => console.log(el),
      });

      expect(result).toEqual(sample);
   });
});

/* -----------------------------------
 *
 * Component
 *
 * -------------------------------- */

function Component({ children, ...attrs }: IAttrs) {
   return h('li', attrs, children);
}
