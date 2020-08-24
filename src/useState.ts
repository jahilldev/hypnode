import {
  nodeMap,
  setElement,
  getIndex,
  setIndex,
  getRender,
  reRender,
  setRender,
} from './internal';

/* -----------------------------------
 *
 * IState
 *
 * -------------------------------- */

type State<T> = [T, (value: T) => void];

/* -----------------------------------
 *
 * Set
 *
 * -------------------------------- */

function setValue(index: number) {
  return (value: any) => {
    nodeMap[index].state = value;

    reRender(index);
  };
}

/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */

function useState<T>(initial: T): State<T> {
  const render = getRender();

  let index = getIndex();
  let state = initial;

  if (render !== null) {
    index = render;
    state = nodeMap[index].state;
  }

  setRender(null);

  return [state, setValue(index)];
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { State, useState, setIndex, setElement };
