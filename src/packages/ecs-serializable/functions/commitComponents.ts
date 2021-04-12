import { without } from "lodash";
import { ComponentDefinition } from "../definition/ComponentDefinition";
import { NativeComponents } from "../types/NativeComponents";
import { DeserializationMemory } from "../DeserializationMemory";
import { defineComponent } from "./defineComponent";

/**
 * Defines and/or removes component constructors
 */
export const commitComponents = (
  definitions: ComponentDefinition[],
  nativeComponents: NativeComponents,
  memory: DeserializationMemory
) => {
  const definedIds = Array.from(memory.componentConstructors.keys());
  const currentIds = definitions.map((d) => d.id);
  const removedIds = without(definedIds, ...currentIds);
  for (const id of removedIds) {
    if (memory.componentConstructors.has(id)) {
      memory.componentConstructors.delete(id);
    }
  }
  for (const definition of definitions) {
    memory.componentConstructors.set(
      definition.id,
      defineComponent(definition, nativeComponents)
    );
  }
};
