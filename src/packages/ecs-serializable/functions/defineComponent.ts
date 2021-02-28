import { ComponentDefinition } from "../types/ComponentDefinition";
import { NativeComponents } from "../types/NativeComponents";
import { ComponentConstructor } from "../types/ComponentConstructorMap";

/**
 * Returns a Component class representing the specified ComponentDefinition.
 */
export const defineComponent = <
  AvailableComponents extends NativeComponents,
  NativeComponentName extends keyof AvailableComponents
>(
  definition: ComponentDefinition<AvailableComponents, NativeComponentName>,
  availableComponents: AvailableComponents
): ComponentConstructor => availableComponents[definition.nativeComponent];
