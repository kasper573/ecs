import { NativeComponents } from "./NativeComponents";

export type ComponentDefinitionId = Nominal<string, "ComponentDefinitionId">;

export type ComponentDefinition<
  AvailableComponents extends NativeComponents = {},
  NativeComponentName extends keyof AvailableComponents = keyof AvailableComponents
> = {
  /**
   * Automatically generated id (unique within parent System).
   */
  id: ComponentDefinitionId;
  /**
   * User specified name (duplicates allowed).
   * Purely presentational.
   */
  name: string;
  /**
   * The native component that will be used
   */
  nativeComponent: NativeComponentName;
};
