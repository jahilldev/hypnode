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
let callState: object = null;
let callRender: number = null;

/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */

function useState(initial: any) {
   let index = (callIndex += 1);
   let state = initial;

   if (callRender !== null) {
      index = callRender;
      state = context[index].state;
   }

   callState = initial;

   return [state, setValue(index)];
}

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function setIndex(tag: Component, attrs: IAttrs, node: HTMLElement) {
   const state = callState;

   if (state === null || callRender !== null) {
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

   node.parentNode.replaceChild(result, node);

   context[index].node = result;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { useState, setIndex };
