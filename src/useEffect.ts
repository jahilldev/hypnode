import { nodeMap, getIndex, getRender } from './internal';

/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */

function useEffect(callback: any) {
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

export { useEffect };
