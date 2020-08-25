import { nodeMap, getIndex, getRender } from './internal';

/* -----------------------------------
 *
 * Types
 *
 * -------------------------------- */

type Effect = () => () => void;

/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */

function useEffect(callback: Effect) {
  const index = getRender() || getIndex();
  const { effect } = nodeMap[index];

  if (effect) {
    effect();
  }

  nodeMap[index].effect = callback();
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Effect, useEffect };
