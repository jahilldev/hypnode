import { IAttrs } from '../../src/attributes';

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const testValue = 0;

/* -----------------------------------
 *
 * Subject
 *
 * -------------------------------- */

import { h, useState } from '../../src/index';

/* -----------------------------------
 *
 * State
 *
 * -------------------------------- */

describe('Core:useState', () => {
   beforeEach(() => jest.clearAllMocks());

   it('correctly renders component from "useState" function', () => {
      const sample = `<a>${testValue + 1}</a>`;
      const result = h(Component, { state: testValue });
      const root = h('div', {}, result);

      root.appendChild(result);

      const event = new Event('click');

      result.dispatchEvent(event);

      setTimeout(() => expect(root.innerHTML).toEqual(sample), 0);
   });
});

/* -----------------------------------
 *
 * Component
 *
 * -------------------------------- */

function Component({ state }: IAttrs) {
   const [value, setNumber] = useState(state);

   return h('a', { onClick: () => setNumber(value + 1) }, value);
}
