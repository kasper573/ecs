import { NativeComponents } from "../types/NativeComponents";
import { SystemDefinition } from "../types/SystemDefinition";
import { createComponentDefinitions } from "./createComponentDefinitions";

export const createSystemDefinition = (
  props: PartialFor<SystemDefinition, "scenes" | "library">,
  nativeComponents: NativeComponents
): SystemDefinition => ({
  scenes: [],
  library: {
    entities: props.library?.entities ?? [],
    components: createComponentDefinitions(nativeComponents),
  },
  ...props,
});
