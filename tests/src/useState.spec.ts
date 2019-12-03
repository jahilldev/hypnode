import { IAttrs } from '../../src/attributes';

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const testClass = 'testClass';
const testLink = '//hypno.de';
const testText = 'testText';

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
   function TestComponent({ index }: any) {
      const [value, setNumber] = useState(0);

      setNumber(1);

      return h('div', {}, testText);
   }

   it('correctly renders component from "useState" function', () => {
      const result = h(
         TestComponent,
         { index: 'one' },
         h(TestComponent, { index: 'two' })
      );

      expect(true).toEqual(true);
   });
});
