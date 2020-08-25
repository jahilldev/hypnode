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

import { h, render, useState } from '../../src/index';

/* -----------------------------------
 *
 * Component
 *
 * -------------------------------- */

function Component({ state }: IAttrs) {
  const [value, setNumber] = useState(state);

  return h('a', { onClick: () => setNumber(value + 1) }, value);
}

/* -----------------------------------
 *
 * State
 *
 * -------------------------------- */

describe('Core:useState', () => {
  jest.useFakeTimers();

  afterEach(() => jest.clearAllMocks());

  it('correctly renders component from "useState" function', () => {
    const sample = `<a>${testValue + 1}</a>`;
    const result = render(h(Component, { state: testValue }));
    const root = render(h('div', {}));

    root.appendChild(result);

    const event = new Event('click');

    result.dispatchEvent(event);

    setTimeout(() => expect(root.innerHTML).toEqual(sample), 0);
  });
});
