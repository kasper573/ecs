import { useEffect, useRef } from "react";

export const useOnFocusedAndKeyPressed = <T extends HTMLElement>(
  key: string,
  callback?: (...args: any[]) => any
) => {
  const ref = useRef<T>();
  useEffect(() => {
    let handleKey: (e: KeyboardEvent) => void;
    if (callback) {
      handleKey = (e: KeyboardEvent) => {
        const isFocused = document.activeElement === ref.current;
        const isCorrectKey = e.key === key;
        if (isFocused && isCorrectKey) {
          callback();
        }
      };
      window.addEventListener("keyup", handleKey);
    }
    // Remove event listeners on cleanup
    return () => {
      if (handleKey) {
        window.removeEventListener("keyup", handleKey);
      }
    };
  }, [callback, key]);
  return ref;
};
