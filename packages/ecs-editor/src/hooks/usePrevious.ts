import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T[]>([]);
  useEffect(() => {
    if (ref.current.length > 1) {
      ref.current.shift();
    }
    ref.current.push(value);
  }, [value]);
  return ref.current[ref.current.length - 1];
};
