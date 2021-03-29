import { without } from "lodash";
import { ComponentConstructorMap } from "../types/ComponentConstructorMap";
import { ComponentDefinition } from "../types/ComponentDefinition";
import { NativeComponents } from "../types/NativeComponents";
import { defineComponent } from "./defineComponent";

/**
 * Defines and/or removes component constructors
 */
export const commitComponents = (
  definitions: ComponentDefinition[],
  nativeComponents: NativeComponents,
  componentMap: ComponentConstructorMap
) => {
  const definedIds = Array.from(componentMap.keys());
  const currentIds = definitions.map((d) => d.id);
  const removedIds = without(definedIds, ...currentIds);
  for (const id of removedIds) {
    if (componentMap.has(id)) {
      componentMap.delete(id);
    }
  }
  for (const definition of definitions) {
    componentMap.set(
      definition.id,
      defineComponent(definition, nativeComponents)
    );
  }
};
