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
   callIndex += 1;
   callState = initial;

   const { state } = (context[callIndex] = {
      state: initial,
   });

   return [state, setValue(callIndex)];
}

/* -----------------------------------
 *
 * Set
 *
 * -------------------------------- */

function setValue(index: number) {
   const reference = context[index];

   return (value: any) => {
      reference.state = value;
   };
}

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function setIndex(tag: Component, attrs: IAttrs, node: HTMLElement) {
   if (!callState) {
      return;
   }

   context[callIndex] = {
      tag,
      attrs,
      node,
      state: callState,
   };

   callState = null;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { useState, setIndex };
