import { ComponentConstructorMap } from "../types/ComponentConstructorMap";
import { ComponentDefinition } from "../types/ComponentDefinition";
import { NativeComponents } from "../types/NativeComponents";
import { defineComponent } from "./defineComponent";

/**
 * Returns a ComponentConstructorMap representing the
 * specified ComponentDefinitions, mapped by definition id.
 */
export const defineComponents = (
  definitions: ComponentDefinition[],
  nativeComponents: NativeComponents
) =>
  definitions.reduce((map: ComponentConstructorMap, definition) => {
    if (map.has(definition.id)) {
      throw new Error(
        `Component constructor with id "${definition.id}" already exists`
      );
    }
    return map.set(
      definition.id,
      defineComponent(definition, nativeComponents)
    );
  }, new Map());
