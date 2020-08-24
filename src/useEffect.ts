import { nodeMap, getRender, setRender, getIndex } from './internal';

/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */

function useEffect(callback: any) {
  const render = getRender();

  let index = getIndex();

  if (render !== null) {
    index = render;
  }

  setRender(null);

  nodeMap[index].effect = callback();
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { useEffect };
