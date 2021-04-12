import { useEffect, useRef } from "react";

/**
 * Creates a ref that always contain the most recent specified value
 */
export const useAsRef = <T>(value: T) => {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
};
