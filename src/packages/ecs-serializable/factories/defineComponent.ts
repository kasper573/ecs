import { ComponentDefinition } from "../types/ComponentDefinition";
import { NativeComponents } from "../types/NativeComponents";
import { ComponentConstructor } from "../types/ComponentConstructorMap";

/**
 * Returns a Component class representing the specified ComponentDefinition.
 */
export const defineComponent = (
  definition: ComponentDefinition,
  nativeComponents: NativeComponents
): ComponentConstructor => {
  const constructor = nativeComponents[definition.nativeComponent];
  if (!constructor) {
    throw new Error(
      `Native component not available: ${definition.nativeComponent}`
    );
  }
  return constructor;
};
