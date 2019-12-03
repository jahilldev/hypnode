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
let callState: any = null;

/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */

function useState(initial: any) {
   const index = (callIndex += 1);

   callState = initial;

   const { state } = (context[index] = {
      state: initial,
   });

   return [state, setValue(index)];
}

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function setIndex(tag: Component, attrs: IAttrs, node: HTMLElement) {
   const state = callState;

   if (state === null) {
      return;
   }

   context[callIndex] = {
      tag,
      attrs,
      node,
      state,
   };

   callState = null;
}

/* -----------------------------------
 *
 * Set
 *
 * -------------------------------- */

function setValue(index: number) {
   return (value: any) => {
      context[index].state = value;

      reRender(context[index]);
   };
}

/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */

function reRender(reference: IContext) {
   console.log('reRender', reference);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { useState, setIndex };
