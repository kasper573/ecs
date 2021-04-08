import { useState } from "react";
import { System } from "../../ecs/System";
import { useSystemReaction } from "./useSystemReaction";

export const useSystemSelector = <Selection>(
  system: System,
  selector: (system: System) => Selection,
  equalityFn?: (a: Selection | undefined, b: Selection) => boolean
) => {
  const [selection, setSelection] = useState<Selection>(() => selector(system));
  useSystemReaction(system, selector, setSelection, equalityFn);
  return selection;
};
