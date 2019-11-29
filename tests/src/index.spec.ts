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
const mockEventHandler = jest.fn();
const mockRefCallback = jest.fn();

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
      const result = h('a', { onClick: mockEventHandler }, testText);
      const event = new Event('click');

      result.dispatchEvent(event);

      expect(mockEventHandler).toBeCalled();
   });

   it('defines element references correctly', () => {
      h('a', { ref: mockRefCallback }, testText);

      expect(mockRefCallback).toBeCalledWith(expect.any(HTMLAnchorElement));
   });

   it('returns a single dom node if no children are present', () => {
      const sample = '<br>';
      const result = h('br');

      expect(result.outerHTML).toEqual(sample);
   });

   it('appends child to parent if index is already a node', () => {
      const sample = '<div><b></b></div>';
      const result = h('div', {}, document.createElement('b'));

      expect(result.outerHTML).toEqual(sample);
   });

   it('adds html attributes with repeated values correctly', () => {
      const sample = '<input disabled="disabled">';
      const result = h('input', { disabled: true });

      expect(result.outerHTML).toEqual(sample);
   });

   it('does not apply attributes provided without a value', () => {
      const sample = `<div>${testText}</div>`;
      const result = h('div', { title: '', id: null, style: false }, testText);

      expect(result.outerHTML).toEqual(sample);
   });
});
