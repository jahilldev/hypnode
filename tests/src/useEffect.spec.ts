/* -----------------------------------
 *
 * Mocks
 *
 * -------------------------------- */

const mockUnmount = jest.fn();
const mockMount = jest.fn().mockImplementation(() => mockUnmount);

/* -----------------------------------
 *
 * Subject
 *
 * -------------------------------- */

import { h, render, useEffect, useState } from '../../src/index';

/* -----------------------------------
 *
 * Component
 *
 * -------------------------------- */

function Component() {
  const [, setState] = useState(false);

  useEffect(mockMount);

  return h('a', { onClick: () => setState(true) });
}

/* -----------------------------------
 *
 * Effect
 *
 * -------------------------------- */

describe('Core:useEffect', () => {
  jest.useFakeTimers();

  afterEach(() => jest.clearAllMocks());

  it('correctly calls and assigns effect', () => {
    const result = render(h(Component));
    const root = render(h('div'));

    root.appendChild(result);

    const event = new Event('click');

    expect(mockMount).toBeCalled();

    result.dispatchEvent(event);

    expect(mockUnmount).toBeCalled();
  });
});
