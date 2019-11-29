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
 * Mocks
 *
 * -------------------------------- */

const spyCreateElement = jest.spyOn(document, 'createElement');
const mockHandler = jest.fn();

/* -----------------------------------
 *
 * Subject
 *
 * -------------------------------- */

import { h } from '../../src/index';

/* -----------------------------------
 *
 * Hypertext
 *
 * -------------------------------- */

describe('Core:HyperText', () => {
   beforeEach(() => jest.clearAllMocks());

   it('creates elements in tree based on "tag" argument', () => {
      h('div', { class: testClass }, [h('a', { href: testLink }, 'link')]);

      expect(spyCreateElement).toBeCalledTimes(2);
      expect(spyCreateElement).toBeCalledWith('div');
      expect(spyCreateElement).toBeCalledWith('a');

      expect(true).toEqual(true);
   });

   it('returns a properly formatted element tree', () => {
      const sample = `<h1 class="${testClass}">${testText}</h1>`;
      const result = h('h1', { class: testClass }, testText);

      expect(result.outerHTML).toEqual(sample);
   });

   it('applies event listeners correctly', () => {
      const result = h('a', { onClick: mockHandler }, testText);
      const event = new Event('click');

      result.dispatchEvent(event);

      expect(mockHandler).toBeCalled();
   });
});
