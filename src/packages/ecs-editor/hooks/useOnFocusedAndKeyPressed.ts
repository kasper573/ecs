import { MutableRefObject, useEffect } from "react";

export const useOnFocusedAndKeyPressed = <T extends Element>(
  key: string,
  ref: MutableRefObject<T | undefined>,
  callback?: (...args: any[]) => any
) => {
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
  }, [callback, key, ref]);
};
