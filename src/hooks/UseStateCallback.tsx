import {useCallback, useEffect, useRef, useState} from 'react';

function useStateCallback<T>(initialState: T) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<((state: T) => void) | undefined>(undefined);
  const setStateCallback = useCallback((state: T, cb?: (state: T) => void) => {
    setState(state);
    cbRef.current = cb;
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = undefined;
    }
  }, [state]);

  return [state, setStateCallback] as const;
}

export default useStateCallback;
