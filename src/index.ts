/* -----------------------------------
 *
 * IAttrs
 *
 * -------------------------------- */

interface IAttrs {
   [index: string]: any;
}

/* -----------------------------------
 *
 * Hypertext
 *
 * -------------------------------- */

function h(tag: string, attrs: IAttrs, ...children: any[]): HTMLElement {
   const { document } = window || {};

   if (!document) {
      throw new Error('Hypnode Error: "window" is undefined');
   }

   const element = document.createElement(tag);

   for (const key of Object.keys(attrs)) {
      const value = attrs[key];

      if (addEventListener(element, key, value)) {
         continue;
      }

      if (addElementReference(element, key, value)) {
         continue;
      }

      addAttributes(element, key, value);
   }

   if (children.length === 0) {
      return element;
   }

   children.forEach(child => {
      if (child instanceof Node) {
         element.appendChild(child);

         return;
      }

      element.appendChild(document.createTextNode(child));
   });

   return element;
}

/* -----------------------------------
 *
 * Event
 *
 * -------------------------------- */

function addEventListener(
   element: HTMLElement,
   key: string,
   handler: EventListener
) {
   if (key.slice(0, 2) !== 'on') {
      return false;
   }

   const eventName = key.slice(2).toLowerCase();

   element.addEventListener(eventName, handler, false);

   return true;
}

/* -----------------------------------
 *
 * Event
 *
 * -------------------------------- */

function addElementReference(
   element: HTMLElement,
   key: string,
   handler: (el: Element) => void
) {
   if (key !== 'ref') {
      return false;
   }

   handler(element);

   return true;
}

/* -----------------------------------
 *
 * Attributes
 *
 * -------------------------------- */

function addAttributes(element: HTMLElement, key: string, value: string) {
   if (['disabled', 'autocomplete', 'selected', 'checked'].indexOf(key) > -1) {
      element.setAttribute(key, key);

      return;
   }

   if (value === null) {
      return;
   }

   element.setAttribute(key, value);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { h };
