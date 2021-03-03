import { NativeComponents } from "../types/NativeComponents";
import { SystemDefinition } from "../types/SystemDefinition";
import { LibraryNodeId } from "../types/LibraryNode";
import { createComponentDefinitions } from "./createComponentDefinitions";

export const createSystemDefinition = (
  props: PartialFor<SystemDefinition, "scenes" | "library">,
  nativeComponents: NativeComponents
): SystemDefinition => ({
  scenes: [],
  library: createComponentDefinitions(nativeComponents).map((definition) => ({
    id: (definition.id as string) as LibraryNodeId,
    type: "component",
    component: definition,
  })),
  ...props,
});
