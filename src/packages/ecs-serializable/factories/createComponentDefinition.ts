import { NativeComponents } from "../types/NativeComponents";
import { ComponentDefinition } from "../types/ComponentDefinition";

export const createComponentDefinition = <
  AvailableComponents extends NativeComponents,
  NativeComponentName extends keyof AvailableComponents
>(
  props: ComponentDefinition<AvailableComponents, NativeComponentName>
): ComponentDefinition<AvailableComponents, NativeComponentName> => ({
  ...props,
});
