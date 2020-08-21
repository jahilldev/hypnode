import { nodeMap, getRender, getIndex } from './internal';

/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */

function useEffect(effect: any) {
  const index = getRender() || getIndex();
  const { node } = nodeMap[index];

  console.log(`useEffect(${index})`, nodeMap[index]);

  if (node) {
    nodeMap[index].effect = effect();
  }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { useEffect };
