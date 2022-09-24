import { useEffect, useRef } from 'react';

function useEffectOnce(callback, deps) {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      callback();
    }
    firstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useEffectOnce;
