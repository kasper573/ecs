import { ComponentDefinitionId } from "./ComponentDefinition";
import { ComponentPropertiesDefinition } from "./ComponentPropertiesDefinition";

export type ComponentInitializerId = Nominal<string, "ComponentInitializerId">;

export type ComponentInitializer = {
  /**
   * Automatically generated id (unique within parent System).
   */
  id: ComponentInitializerId;
  definitionId: ComponentDefinitionId;
  properties: ComponentPropertiesDefinition;
};
