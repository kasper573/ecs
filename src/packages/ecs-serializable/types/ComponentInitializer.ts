import { ComponentDefinitionId } from "./ComponentDefinition";
import { ComponentPropertiesDefinition } from "./ComponentPropertiesDefinition";

export type ComponentInitializerId = Nominal<string, "ComponentInitializerId">;

export type ComponentInitializer = {
  /**
   * Locally unique id.
   * Almost universally unique, but is reused across entity instances.
   * Example: Two EntityInitializers referencing the same
   * EntityDefinition will have ComponentInitializers that share ids.
   */
  id: ComponentInitializerId;
  /**
   * The definition this initializer should reference
   */
  definitionId: ComponentDefinitionId;
  /**
   * The properties to override with
   * (should be empty object to fall back to definition properties)
   */
  properties: ComponentPropertiesDefinition;
};
