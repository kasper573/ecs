import { useCallback, useEffect, useRef } from "react";
import { System } from "../../../ecs/src/System";

export const useSystemReaction = <Selection>(
  system: System,
  selector: (system: System) => Selection,
  reaction: (selection: Selection) => unknown,
  equalityFn: (a: Selection | undefined, b: Selection) => boolean = refEq
) => {
  const ref = useRef<Selection>();
  const poll = useCallback(() => {
    const newSelection = selector(system);
    if (!equalityFn(ref.current, newSelection)) {
      ref.current = newSelection;
      reaction(newSelection);
    }
  }, [ref, system, selector, reaction, equalityFn]);

  useEffect(() => {
    system.events.on("update", poll);
    return () => {
      system.events.off("update", poll);
    };
  }, [system, poll]);
};

export const refEq = <T>(a: T, b: T) => a === b;
