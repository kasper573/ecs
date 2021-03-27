import { ComponentDefinitionId } from "./ComponentDefinition";
import { ComponentPropertiesDefinition } from "./ComponentPropertiesDefinition";

export type ComponentInitializerId = Nominal<string, "ComponentInitializerId">;

export type ComponentInitializer = {
  /**
   * uuid
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
