import { NativeComponents } from "../types/NativeComponents";
import { SystemDefinition } from "../types/SystemDefinition";
import { createComponentDefinitions } from "./createComponentDefinitions";

export const createSystemDefinition = <
  AvailableComponents extends NativeComponents
>(
  props: PartialFor<
    SystemDefinition<AvailableComponents>,
    "scenes" | "library"
  >,
  availableComponents: AvailableComponents
): SystemDefinition<AvailableComponents> => ({
  scenes: [],
  library: {
    entities: props.library?.entities ?? [],
    components: createComponentDefinitions(availableComponents),
  },
  ...props,
});
