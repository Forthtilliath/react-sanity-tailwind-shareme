import { useCallback, useState } from 'react';

// declare module './useToggle' {
//   export function useToggle(defaultValue?: boolean): {
//     value: boolean;
//     setValue: React.Dispatch<React.SetStateAction<boolean>>;
//     setTrue: () => void;
//     setFalse: () => void;
//     toggle: () => void;
//   };
//   export function useBoolean(defaultValue?: boolean): {
//     loading: boolean;
//     startLoading: () => void;
//     stopLoading: () => void;
// };
// }

export function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return { value, setValue, setTrue, setFalse, toggle };
}

export function useLoading(defaultValue = false) {
  const {
    value: loading,
    setTrue: startLoading,
    setFalse: stopLoading,
  } = useToggle(defaultValue);

  return { loading, startLoading, stopLoading };
}
