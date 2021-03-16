import { SystemDefinition } from "../types/SystemDefinition";

export const createSystemDefinition = (
  props: PartialFor<SystemDefinition, "scenes" | "library">
): SystemDefinition => ({
  scenes: [],
  library: [],
  ...props,
});
