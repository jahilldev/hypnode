import { IAttrs } from './attributes';

/* -----------------------------------
 *
 * Types
 *
 * -------------------------------- */

type Component = (attrs?: IAttrs) => HTMLElement;

/* -----------------------------------
 *
 * IContext
 *
 * -------------------------------- */

interface IContext {
   [id: number]: {
      tag?: Component;
      attrs?: IAttrs;
      node?: HTMLElement;
      state: any;
   };
}

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const context: IContext = {};
let callIndex = -1;
let callRender: number = null;

/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */

function useState(initial: any) {
   let index = callIndex;
   let state = initial;

   if (callRender !== null) {
      index = callRender;
      state = context[index].state;
   }

   return [state, setValue(index)];
}

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function setIndex(tag: Component, attrs: IAttrs) {
   const index = (callIndex += 1);

   if (callRender !== null) {
      return;
   }

   context[index] = {
      tag,
      attrs,
      node: null,
      state: null,
   };

   return index;
}

/* -----------------------------------
 *
 * Element
 *
 * -------------------------------- */

function setElement(node: HTMLElement, index: number) {
   if (callRender !== null) {
      return;
   }

   context[index].node = node;

   return node;
}

/* -----------------------------------
 *
 * Set
 *
 * -------------------------------- */

function setValue(index: number) {
   return (value: any) => {
      context[index].state = value;

      reRender(index);
   };
}

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

function reRender(index: number) {
   const { tag, attrs, node } = context[index];

   callRender = index;

   const result = tag(attrs);

   callRender = null;

   setTimeout(() => node.parentNode.replaceChild(result, node), 0);

   context[index].node = result;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { useState, setIndex, setElement };
