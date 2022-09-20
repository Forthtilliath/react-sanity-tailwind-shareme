import { useEffect, useRef } from 'react';

function useEffectOnce(callback, deps) {
  const secondRender = useRef(false);

  useEffect(() => {
    if (secondRender.current) {
      callback();
    }
    secondRender.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useEffectOnce;
